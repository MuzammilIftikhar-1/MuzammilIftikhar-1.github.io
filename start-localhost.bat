@echo off
title Muzammil Portfolio Localhost
cd /d "%~dp0"
set "PORT=5173"
set "PYTHON_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "LAN_IP="

for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
  if not defined LAN_IP set "LAN_IP=%%A"
)

if defined LAN_IP set "LAN_IP=%LAN_IP: =%"

echo.
echo Starting Muzammil portfolio website...
echo Keep this window open while you view the website.
echo.
echo PC URL: http://127.0.0.1:%PORT%/
if defined LAN_IP echo Share URL for PC and Phone: http://%LAN_IP%:%PORT%/
echo.
echo Use the Share URL on both your PC and your phone.
echo Your phone and PC must be on the same Wi-Fi.
echo If the Share URL does not open, allow Python through Windows Firewall.
echo.
start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:%PORT%/'"
if exist "%PYTHON_EXE%" (
  "%PYTHON_EXE%" -m http.server %PORT% --bind 0.0.0.0
) else (
  py -m http.server %PORT% --bind 0.0.0.0
)
echo.
echo Server stopped. Press any key to close this window.
pause
