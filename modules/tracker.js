import { saveToStorage, getFromStorage } from './utils.js';

// Time tracking logic
const STORAGE_KEY = 'focusGuard_timeSpent';
const DAILY_LIMIT_SECONDS = 2 * 60 * 60; // Example: 2 hours

let timerInterval = null;
let timeSpent = getFromStorage(STORAGE_KEY, 0);

/**
 * Starts the productivity timer.
 * @param {Function} onTick Callback executed every second with the new time
 * @param {Function} onLimitExceeded Callback executed if daily limit is reached
 */
export function startTimer(onTick, onLimitExceeded) {
    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(() => {
        timeSpent++;
        saveToStorage(STORAGE_KEY, timeSpent);
        
        if (onTick) {
            onTick(timeSpent);
        }

        // Check if daily limit exceeded (simple alert logic)
        if (timeSpent === DAILY_LIMIT_SECONDS && onLimitExceeded) {
            onLimitExceeded();
        }
    }, 1000);
}

/**
 * Stops the productivity timer.
 */
export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * Gets the current time spent tracking.
 * @returns {number} Time spent in seconds
 */
export function getCurrentTime() {
    return timeSpent;
}

/**
 * Resets the timer.
 */
export function resetTimer() {
    stopTimer();
    timeSpent = 0;
    saveToStorage(STORAGE_KEY, timeSpent);
}
