export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        LOGOUT: '/api/logout',
        FORGOT_PASSWORD: '/api/forgot-password',
        RESET_PASSWORD: '/api/reset-password'
    },
    NEWSLETTER: {
        SUBSCRIBE: '/api/newsletter/subscribe',
        UNSUBSCRIBE: '/api/unsubscribe'
    },
    EVENTS: {
        RECENT_EVENTS: "/api/recent-events",
        FILTERED_EVENTS: "/api/filtered-events"
    },
    USERS: {
        GET_ALL: "/api/users",
        NEW: "/api/register",
        DEACTIVATE: "/api/users",
        EDIT: "/api/users"
    },
    CONTACT: {
        NEW: "/api/contact/contact-us",
        GET_ALL: "/api/contact/contact-us"
    }
};