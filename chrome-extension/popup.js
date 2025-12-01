document.addEventListener('DOMContentLoaded', () => {
    // Tabs Logic
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');

            if (tab.dataset.tab === 'ai') {
                analyzeCurrentTab();
            }
        });
    });

    // Connection Logic
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const dohUrlDisplay = document.getElementById('dohUrl');
    const toggleBtn = document.getElementById('toggleBtn');

    function updateUI(state) {
        if (state.status === 'CONNECTED') {
            statusIndicator.classList.add('connected');
            statusText.textContent = 'Protected';
            statusText.style.color = '#00E676';
            dohUrlDisplay.textContent = state.dohUrl || 'Active';
            toggleBtn.textContent = 'Disconnect';
            toggleBtn.className = 'toggle-btn btn-disconnect';
        } else {
            statusIndicator.classList.remove('connected');
            statusText.textContent = 'Disconnected';
            statusText.style.color = '#FFFFFF';
            dohUrlDisplay.textContent = 'Not Connected';
            toggleBtn.textContent = 'Connect';
            toggleBtn.className = 'toggle-btn btn-connect';
        }
    }

    // Initial State Fetch
    chrome.runtime.sendMessage({ action: 'GET_STATE' }, (response) => {
        if (response) updateUI(response);
    });

    // Toggle Button
    toggleBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'TOGGLE_CONNECTION' }, (response) => {
            if (response && response.success) {
                updateUI(response.state);
            } else if (response && response.error) {
                alert(response.error);
            }
        });
    });

    // AI Analysis Logic
    function analyzeCurrentTab() {
        const aiLoading = document.getElementById('aiLoading');
        const aiResults = document.getElementById('aiResults');

        aiLoading.style.display = 'block';
        aiResults.style.display = 'none';

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url) {
                chrome.runtime.sendMessage({ action: 'ANALYZE_URL', url: tabs[0].url }, (result) => {
                    renderAIResults(result);
                });
            } else {
                aiLoading.textContent = "Cannot analyze this page.";
            }
        });
    }

    function renderAIResults(result) {
        const aiLoading = document.getElementById('aiLoading');
        const aiResults = document.getElementById('aiResults');
        const scoreCircle = document.getElementById('scoreCircle');
        const scoreValue = document.getElementById('scoreValue');
        const riskLevel = document.getElementById('riskLevel');
        const threatList = document.getElementById('threatList');
        const noThreatsMsg = document.getElementById('noThreatsMsg');

        aiLoading.style.display = 'none';
        aiResults.style.display = 'block';

        scoreValue.textContent = result.score;
        riskLevel.textContent = result.riskLevel;

        // Reset classes
        scoreCircle.className = 'score-circle';
        if (result.riskLevel === 'SAFE') scoreCircle.classList.add('risk-safe');
        else if (result.riskLevel === 'SUSPICIOUS') scoreCircle.classList.add('risk-suspicious');
        else scoreCircle.classList.add('risk-dangerous');

        // Threats
        threatList.innerHTML = '';
        if (result.threats && result.threats.length > 0) {
            noThreatsMsg.style.display = 'none';
            result.threats.forEach(threat => {
                const li = document.createElement('li');
                li.className = 'threat-item';
                li.innerHTML = `<span class="threat-icon">⚠️</span> ${threat}`;
                threatList.appendChild(li);
            });
        } else {
            noThreatsMsg.style.display = 'block';
        }
    }
});
