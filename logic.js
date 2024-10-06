// Background script functionality
chrome.runtime.onInstalled.addListener(() => {
    console.log("Site Usage Timer Extension Installed");
  });
  
  // Content script functionality
  let startTime = Date.now();
  
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  
  function updateTime() {
    let currentTime = Date.now();
    let timeSpent = Math.floor((currentTime - startTime) / 1000); // time in seconds
    let formattedTime = formatTime(timeSpent);
  
    chrome.storage.local.set({ 'formattedTime': formattedTime }, () => {
      console.log(`Time spent on this site: ${formattedTime}`);
    });
  }
  
  setInterval(updateTime, 1000); // Update every second
  
  // Popup script functionality
  document.addEventListener('DOMContentLoaded', () => {
    function updatePopupTime() {
      chrome.storage.local.get(['formattedTime'], (result) => {
        let formattedTime = result.formattedTime || '00:00:00';
        document.getElementById('timeOutput').textContent = formattedTime;
      });
    }
  
    updatePopupTime(); // Initial call to update the time
  
    setInterval(updatePopupTime, 1000); // Update the time every second
  });
  