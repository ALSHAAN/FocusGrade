// Helper functions for FocusGuard

/**
 * Saves data to localStorage
 * @param {string} key 
 * @param {any} value 
 */
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves data from localStorage
 * @param {string} key 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

/**
 * Formats seconds into HH:MM:SS
 * @param {number} totalSeconds 
 * @returns {string} Formatted time string
 */
export function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}
