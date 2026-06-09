param([int]$Port = 5173)

$root = $PSScriptRoot
$mimeTypes = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="text/javascript; charset=utf-8"
  ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
  ".wav"="audio/wav"; ".mp4"="video/mp4"; ".pdf"="application/pdf"; ".webm"="video/webm"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Server running at http://localhost:$Port"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
    if ($urlPath -eq "/") { $urlPath = "/index.html" }

    $filePath = Join-Path $root ($urlPath.TrimStart("/").Replace("/", "\"))
    $filePath = [System.IO.Path]::GetFullPath($filePath)

    if (-not $filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
      $res.StatusCode = 403; $res.Close(); continue
    }

    if (Test-Path -LiteralPath $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $ct = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
      $res.ContentType = $ct
      $res.AddHeader("Cache-Control", "no-store")

      $fs = [System.IO.File]::OpenRead($filePath)
      $res.ContentLength64 = $fs.Length
      $fs.CopyTo($res.OutputStream)
      $fs.Close()
    } else {
      $res.StatusCode = 404
      $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $res.ContentType = "text/plain"
      $res.OutputStream.Write($body, 0, $body.Length)
    }
    $res.Close()
  }
} finally {
  $listener.Stop()
}
