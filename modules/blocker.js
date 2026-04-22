// Site blocking logic

/**
 * Fetches the list of blocked sites from the local JSON file.
 * @returns {Promise<string[]>} Array of blocked domains
 */
export async function fetchBlockedSites() {
    try {
        const response = await fetch('./data/sites.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blocked sites');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blocked sites:', error);
        return []; // Return empty array on failure
    }
}

/**
 * Checks if a given URL is in the blocked list.
 * @param {string} urlToCheck The user-provided URL
 * @param {string[]} blockedSites Array of blocked domains
 * @returns {boolean} True if blocked, false otherwise
 */
export function isSiteBlocked(urlToCheck, blockedSites) {
    // Basic domain extraction
    let domain = urlToCheck.toLowerCase();
    
    // Remove protocol if present
    if (domain.startsWith('http://')) {
        domain = domain.substring(7);
    } else if (domain.startsWith('https://')) {
        domain = domain.substring(8);
    }
    
    // Remove www. if present
    if (domain.startsWith('www.')) {
        domain = domain.substring(4);
    }

    // Remove paths
    domain = domain.split('/')[0];

    // Check if the domain matches any blocked site
    return blockedSites.some(site => domain.includes(site));
}
