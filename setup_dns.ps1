# Check for Administrator privileges
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "Requesting Administrator privileges..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   NIRA-XT Guardian - Network Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Get Active Network Adapter
$adapter = Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object -First 1

if ($null -eq $adapter) {
    Write-Host "Error: No active network connection found." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "Found Active Adapter: " -NoNewline
Write-Host $adapter.Name -ForegroundColor Green
Write-Host ""

# Backup current DNS (Simple echo, in a real app we'd save to file)
$currentDNS = Get-DnsClientServerAddress -InterfaceAlias $adapter.Name
Write-Host "Current DNS Settings: $($currentDNS.ServerAddresses)" -ForegroundColor Gray

# Set DNS to Localhost (127.0.0.1)
Write-Host "Configuring DNS to NIRA-XT Server (127.0.0.1)..." -ForegroundColor Yellow
try {
    Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses ("127.0.0.1") -ErrorAction Stop
    Write-Host "Success! DNS set to 127.0.0.1" -ForegroundColor Green
} catch {
    Write-Host "Failed to set DNS: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Flush DNS Cache
Write-Host "Flushing DNS Cache..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Setup Complete!" -ForegroundColor Cyan
Write-Host "   Your traffic is now routed through NIRA-XT." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to close"
