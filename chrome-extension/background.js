// NIRA-XT Guardian AI Safety Module (Embedded)
const AI_Guard = {
    /**
     * Analyzes a given URL for safety.
     * @param {string} url - The URL to analyze.
     * @returns {Promise<Object>} - Safety score and details.
     */
    analyzeUrl: async (url) => {
        // Mock AI Analysis Logic
        const result = {
            score: 100, // 0-100, 100 is safe
            riskLevel: 'SAFE',
            threats: [],
            details: "No threats detected."
        };

        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname;

            // Heuristic 1: Length check
            if (hostname.length > 75) {
                result.score -= 20;
                result.threats.push("Suspiciously long hostname");
            }

            // Heuristic 2: Suspicious TLDs (Example list)
            const suspiciousTLDs = ['.xyz', '.top', '.gq', '.zip'];
            if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
                result.score -= 30;
                result.threats.push("High-risk TLD detected");
            }

            // Heuristic 3: IP Address usage
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipRegex.test(hostname)) {
                result.score -= 40;
                result.threats.push("Direct IP access detected");
            }

            // Heuristic 4: Keyword check
            const suspiciousKeywords = ['login', 'verify', 'account', 'update', 'secure'];
            if (suspiciousKeywords.some(kw => hostname.includes(kw) && !hostname.includes('google') && !hostname.includes('microsoft'))) {
                // result.score -= 10; 
            }

            // Finalize Risk Level
            if (result.score < 50) {
                result.riskLevel = 'DANGEROUS';
            } else if (result.score < 80) {
                result.riskLevel = 'SUSPICIOUS';
            }

            if (result.riskLevel !== 'SAFE') {
                result.details = `Detected ${result.threats.length} potential threats.`;
            }

            return result;

        } catch (e) {
            console.error("AI Analysis Error:", e);
            return { score: 0, riskLevel: 'UNKNOWN', threats: ['Analysis Failed'], details: "Could not analyze URL." };
        }
    }
};

// Configuration
const DEFAULT_ICON = {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
};

// State Management
let connectionState = {
    status: 'DISCONNECTED', // CONNECTED, DISCONNECTED
    dohUrl: null,
    timestamp: null
};

// Initialize
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['connectionState'], (result) => {
        if (result.connectionState) {
            connectionState = result.connectionState;
            if (connectionState.status === 'CONNECTED') {
                enableProxy(connectionState.dohUrl);
            }
        }
    });
});

// Message Listener (External from Web App)
chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
        console.log("Received external message:", request);

        if (request.action === 'CONNECT' && request.dohUrl) {
            enableProxy(request.dohUrl);
            sendResponse({ success: true, status: 'CONNECTED' });
        } else if (request.action === 'DISCONNECT') {
            disableProxy();
            sendResponse({ success: true, status: 'DISCONNECTED' });
        } else if (request.action === 'GET_STATUS') {
            sendResponse({ success: true, status: connectionState.status });
        } else {
            sendResponse({ success: false, error: 'Invalid action' });
        }
    }
);

// Message Listener (Internal from Popup)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'GET_STATE') {
        sendResponse(connectionState);
    } else if (request.action === 'TOGGLE_CONNECTION') {
        if (connectionState.status === 'CONNECTED') {
            disableProxy();
        } else {
            if (connectionState.dohUrl) {
                enableProxy(connectionState.dohUrl);
            } else {
                sendResponse({ success: false, error: 'No DoH URL configured' });
                return;
            }
        }
        sendResponse({ success: true, state: connectionState });
    } else if (request.action === 'ANALYZE_URL') {
        AI_Guard.analyzeUrl(request.url).then(result => {
            sendResponse(result);
        });
        return true; // Keep channel open for async response
    }
});

// Proxy Logic
function enableProxy(dohUrl) {
    const config = {
        mode: "pac_script",
        pacScript: {
            data: `
        function FindProxyForURL(url, host) {
          return "DIRECT"; 
        }
      `
        }
    };

    chrome.proxy.settings.set(
        { value: config, scope: 'regular' },
        () => {
            console.log("Proxy settings set to PAC.");
        }
    );

    connectionState = {
        status: 'CONNECTED',
        dohUrl: dohUrl,
        timestamp: Date.now()
    };
    saveState();
    updateBadge(true);
}

function disableProxy() {
    chrome.proxy.settings.clear({ scope: 'regular' });
    connectionState.status = 'DISCONNECTED';
    saveState();
    updateBadge(false);
}

function saveState() {
    chrome.storage.local.set({ connectionState });
}

function updateBadge(isConnected) {
    const text = isConnected ? "ON" : "OFF";
    const color = isConnected ? "#4CAF50" : "#9E9E9E";

    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color });
}
