document.addEventListener('DOMContentLoaded', () => {
  const launchBtn = document.getElementById('launch-btn');
  const statusCard = document.getElementById('status-card');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.id) return;

    const isSupported = activeTab.url && (
      activeTab.url.includes('civitai.com') ||
      activeTab.url.includes('civitai.red') ||
      activeTab.url.includes('civitai.blue') ||
      activeTab.url.includes('civitai.green') ||
      activeTab.url.includes('decomfy.com') ||
      activeTab.url.includes('localhost') ||
      activeTab.url.includes('127.0.0.1')
    );

    if (!isSupported) {
      statusCard.textContent = 'Please navigate to Civitai or Decomfy to use Theater mode.';
      launchBtn.disabled = true;
      launchBtn.style.opacity = '0.5';
      launchBtn.style.cursor = 'not-allowed';
      return;
    }

    // Query active items count
    chrome.tabs.sendMessage(activeTab.id, { action: 'GET_COUNT' }, (response) => {
      if (chrome.runtime.lastError) {
        statusCard.textContent = 'Ready to launch. Click below or press Alt + S.';
        return;
      }
      if (response && typeof response.count === 'number') {
        if (response.count === 0) {
          statusCard.innerHTML = `No artworks visible on screen yet. Scroll down or click below.`;
        } else {
          statusCard.innerHTML = `Found <span class="status-highlight">${response.count}</span> artworks loaded on this page.`;
        }
      }
    });

    launchBtn.addEventListener('click', () => {
      chrome.tabs.sendMessage(activeTab.id, { action: 'LAUNCH_THEATER' }, () => {
        window.close();
      });
    });
  });
});
