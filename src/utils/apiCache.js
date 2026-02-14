const CACHE_KEY = 'portfolio_api_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export const fetchWithCache = async (url, options = {}) => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const now = Date.now();

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_DURATION && !options.fresh) {
            return data;
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: now
        }));

        return data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
};
