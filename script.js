import { startTimer, stopTimer, getCurrentTime, resetTimer } from './modules/tracker.js';
import { fetchBlockedSites, isSiteBlocked } from './modules/blocker.js';
import { formatTime } from './modules/utils.js';

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

const urlInput = document.getElementById('url-input');
const browseBtn = document.getElementById('browse-btn');
const browserContent = document.getElementById('browser-content');

// State
let blockedSites = [];

// Initialize application
async function init() {
    // Load blocked sites
    blockedSites = await fetchBlockedSites();
    
    // Initialize display with stored time
    updateTimeDisplay(getCurrentTime());
    
    // Set up event listeners
    startBtn.addEventListener('click', handleStart);
    stopBtn.addEventListener('click', handleStop);
    resetBtn.addEventListener('click', handleReset);
    browseBtn.addEventListener('click', handleBrowse);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBrowse();
    });
}

function updateTimeDisplay(seconds) {
    timeDisplay.textContent = formatTime(seconds);
}

function handleStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    startTimer(
        (newTime) => {
            updateTimeDisplay(newTime);
        },
        () => {
            alert('Time limit exceeded! Take a break.');
        }
    );
}

function handleStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    stopTimer();
}

function handleReset() {
    if(confirm('Are you sure you want to reset your daily time?')) {
        resetTimer();
        updateTimeDisplay(0);
        handleStop(); // Reset UI state as well
    }
}

function handleBrowse() {
    const url = urlInput.value.trim();
    if (!url) return;
    
    if (isSiteBlocked(url, blockedSites)) {
        // Show blocked message
        browserContent.innerHTML = `
            <div class="blocked-message">
                <h2>Blocked for Productivity</h2>
                <p>This site is on your blocklist. Get back to work!</p>
            </div>
        `;
        browserContent.className = 'browser-content blocked';
    } else {
        // Show fake allowed page
        browserContent.innerHTML = `
            <div class="allowed-message">
                <h2>Visiting: ${url}</h2>
                <p>This site is allowed. Content would render here.</p>
            </div>
        `;
        browserContent.className = 'browser-content allowed';
    }
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
