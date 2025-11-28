# How to Configure Your Device for X-DNS Guardian+

To start filtering content, you need to point your device's DNS settings to the machine running X-DNS Guardian+.

## Step 1: Find Your Local IP Address
1.  Open Command Prompt (cmd.exe).
2.  Type `ipconfig` and press Enter.
3.  Look for "IPv4 Address" (e.g., `192.168.1.105`).

## Step 2: Configure Windows DNS
1.  Open **Settings** > **Network & Internet**.
2.  Click on **Wi-Fi** (or Ethernet).
3.  Click on **Hardware properties**.
4.  Click **Edit** next to "DNS server assignment".
5.  Select **Manual**.
6.  Turn on **IPv4**.
7.  In **Preferred DNS**, enter your IP address from Step 1 (e.g., `192.168.1.105`) or `127.0.0.1` if testing on the same machine.
8.  Click **Save**.

## Step 3: Verify Protection
1.  Open your browser.
2.  Try to visit a blocked domain: `malware.badsite.xyz`.
3.  The site should fail to load.
4.  Check the **DNS Monitor** tab in the X-DNS Dashboard to see the blocked query.

## Troubleshooting
- **Port 53 Error**: If the server fails to bind to port 53, it will try port 5353. You may need to run `python demo_launcher.py` as Administrator.
- **Firewall**: Ensure Windows Firewall allows Python to accept incoming connections.
