/**
 * NIRA-XT Guardian AI Safety Module
 * Analyzes URLs and content for potential threats.
 */

const AI_Guard = {
    /**
     * Analyzes a given URL for safety.
     * @param {string} url - The URL to analyze.
     * @returns {Promise<Object>} - Safety score and details.
     */
    analyzeUrl: async (url) => {
        // Mock AI Analysis Logic
        // In a real scenario, this would call a backend API or use a local TFLite model.

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
            // Simple check if keyword is in subdomain but not main domain (naive check)
            if (suspiciousKeywords.some(kw => hostname.includes(kw) && !hostname.includes('google') && !hostname.includes('microsoft'))) {
                // This is a very basic heuristic
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

// Export for use in other modules
export default AI_Guard;
