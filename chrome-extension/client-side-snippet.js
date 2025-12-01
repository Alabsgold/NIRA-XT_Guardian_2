/**
 * NIRA-XT Guardian Connect Snippet
 * Include this script on your dashboard to interact with the Chrome Extension.
 */

const EXTENSION_ID = "YOUR_EXTENSION_ID_HERE"; // Replace with the actual ID after installation

const GuardianConnect = {
    /**
     * Checks if the extension is installed and available.
     * @returns {Promise<boolean>}
     */
    checkAvailability: async () => {
        if (!window.chrome || !window.chrome.runtime) return false;
        try {
            return new Promise((resolve) => {
                chrome.runtime.sendMessage(EXTENSION_ID, { action: 'GET_STATUS' }, (response) => {
                    if (chrome.runtime.lastError) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            });
        } catch (e) {
            return false;
        }
    },

    /**
     * Connects to the Guardian DNS.
     * @param {string} dohUrl - The user's unique DoH URL.
     */
    connect: (dohUrl) => {
        if (!dohUrl) {
            console.error("DoH URL is required.");
            return;
        }

        chrome.runtime.sendMessage(EXTENSION_ID, { action: 'CONNECT', dohUrl }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Extension not found or error:", chrome.runtime.lastError);
                alert("Please install the NIRA-XT Guardian Extension first.");
                // Redirect to download page if needed
                // window.location.href = '/download-extension';
            } else {
                console.log("Connection response:", response);
                if (response.success) {
                    alert("Successfully connected to Guardian DNS!");
                    // Update UI to show connected state
                }
            }
        });
    },

    /**
     * Disconnects from the Guardian DNS.
     */
    disconnect: () => {
        chrome.runtime.sendMessage(EXTENSION_ID, { action: 'DISCONNECT' }, (response) => {
            if (response && response.success) {
                console.log("Disconnected.");
                alert("Disconnected from Guardian DNS.");
            }
        });
    }
};

// Example Usage:
// document.getElementById('connectBtn').addEventListener('click', () => {
//   GuardianConnect.connect('https://doh.nira-xt.com/user-123');
// });
