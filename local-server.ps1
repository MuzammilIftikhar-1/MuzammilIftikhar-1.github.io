param(
  [int]$Port = 5173,
  [string]$Root = $PSScriptRoot
)

$ErrorActionPreference = "Stop"
trap {
  $message = $_ | Out-String
  $errorPath = Join-Path $PSScriptRoot "local-server.error.log"
  Set-Content -LiteralPath $errorPath -Value $message
  Start-Sleep -Seconds 20
  break
}

$hostAddress = [System.Net.IPAddress]::Parse("0.0.0.0")
$listener = [System.Net.Sockets.TcpListener]::new($hostAddress, $Port)
$rootFull = [System.IO.Path]::GetFullPath($Root)

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "text/javascript; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".wav" = "audio/wav"
  ".mp4" = "video/mp4"
  ".pdf" = "application/pdf"
}

function Write-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [string]$ContentType,
    [byte[]]$Body
  )

  $header = "HTTP/1.1 $StatusCode $StatusText`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

function Resolve-SitePath {
  param([string]$RequestPath)

  $cleanPath = ($RequestPath -split "\?")[0]
  if ([string]::IsNullOrWhiteSpace($cleanPath) -or $cleanPath -eq "/") {
    $cleanPath = "/index.html"
  }

  $decodedPath = [System.Uri]::UnescapeDataString($cleanPath)
  $relativePath = $decodedPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
  $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootFull, $relativePath))
  $rootPrefix = if ($rootFull.EndsWith([System.IO.Path]::DirectorySeparatorChar)) { $rootFull } else { "$rootFull$([System.IO.Path]::DirectorySeparatorChar)" }

  if ($fullPath -ne $rootFull -and -not $fullPath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  return $fullPath
}

$listener.Start()

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()

      while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) {
          break
        }
      }

      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Bad request")
        Write-Response $stream 400 "Bad Request" "text/plain; charset=utf-8" $body
        continue
      }

      $sitePath = Resolve-SitePath $parts[1]
      if ($null -eq $sitePath) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        Write-Response $stream 403 "Forbidden" "text/plain; charset=utf-8" $body
        continue
      }

      if (-not [System.IO.File]::Exists($sitePath)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
        Write-Response $stream 404 "Not Found" "text/plain; charset=utf-8" $body
        continue
      }

      $extension = [System.IO.Path]::GetExtension($sitePath).ToLowerInvariant()
      $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
      $bodyBytes = [System.IO.File]::ReadAllBytes($sitePath)
      Write-Response $stream 200 "OK" $contentType $bodyBytes
    }
    finally {
      $client.Close()
    }
  }
}
finally {
  $listener.Stop()
}
