# NIRA-XT Guardian Chrome Extension Architecture

## Overview
The NIRA-XT Guardian Chrome Extension acts as a "Connect Agent" that bridges the web dashboard with the user's browser network settings. It enables secure DNS routing and provides real-time AI-powered safety analysis of visited websites.

## Architecture

### 1. Manifest V3
The extension is built on **Manifest V3**, ensuring better security, privacy, and performance.
- **Permissions**: `proxy` (for traffic routing), `storage` (for state persistence), `scripting` (for AI analysis).
- **Service Worker**: `background.js` handles the core logic, replacing persistent background pages.

### 2. Core Components

#### Background Service Worker (`background.js`)
- **Event Listener**: Listens for external messages from the web dashboard (`CONNECT`, `DISCONNECT`).
- **Proxy Management**: Uses `chrome.proxy.settings` to inject a PAC (Proxy Auto-Config) script.
  - *Note*: Since Chrome Extensions cannot directly set a DoH server via API, we simulate this by configuring a PAC script that can route traffic through a secure proxy or handle DNS resolution logic.
- **State Management**: Persists connection status in `chrome.storage.local`.

#### Guardian AI Module (`ai-guard.js`)
- **Purpose**: Real-time safety analysis of web pages.
- **Logic**:
  - **Heuristics**: Analyzes URL length, entropy, TLD reputation, and suspicious keywords.
  - **Scoring**: Generates a safety score (0-100) and risk level (SAFE, SUSPICIOUS, DANGEROUS).
  - **Integration**: Can be expanded to call a backend API for deep learning-based threat detection.

#### UI (`popup.html` & `popup.js`)
- **Connection Tab**: Shows current status and allows manual toggle.
- **Guardian AI Tab**: Displays the safety score of the current tab and lists detected threats.

### 3. Communication Flow

1.  **Web App -> Extension**:
    - The web app sends a message (`CONNECT`) with the user's unique DoH URL.
    - `externally_connectable` in `manifest.json` ensures only authorized domains can trigger this.

2.  **Extension -> Browser**:
    - The extension configures the browser's proxy settings to route traffic.

3.  **Extension -> User**:
    - Updates the browser action badge (Green "ON" / Grey "OFF").
    - Shows detailed status in the Popup.

## Build & Installation Process

### Prerequisites
- Google Chrome Browser
- The `chrome-extension` directory from this repository.

### Installation Steps
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked**.
4.  Select the `chrome-extension` directory.
5.  Copy the generated **Extension ID**.

### Integration with Web App
1.  Open `client-side-snippet.js`.
2.  Replace `YOUR_EXTENSION_ID_HERE` with the ID from step 5.
3.  Include this script in your web dashboard.
4.  Call `GuardianConnect.connect(dohUrl)` when the user clicks "Connect".

## AI Features
The **Guardian AI** module runs locally within the extension to protect user privacy. It analyzes:
- **URL Structure**: Detects obfuscation attempts.
- **TLD Reputation**: Flags high-risk top-level domains.
- **Keyword Matching**: Identifies potential phishing attempts (e.g., "secure-login-update").

## Future Improvements
- **Remote AI API**: Connect to a backend model for more accurate threat detection.
- **Blocklist Integration**: Automatically block known malicious domains using the `declarativeNetRequest` API.
