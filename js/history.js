// Simple SPA History Manager
class HistoryManager {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.hasHistory = false;
    }

    // Register a route with its handler
    register(path, handler) {
        this.routes[path] = handler;
        return this;
    }

    // Initialize router and listen for navigation events
    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    // Navigate to a new route
    navigate(path) {
        const url = new URL("#" + path, window.location.origin + window.location.pathname);
        if (url.hash !== window.location.hash) {
            window.history.pushState({}, '', url);
            this.hasHistory = true;
            this.handleRoute();
        }
    }


    // Handle current route
    handleRoute() {
        const hash = window.location.hash.slice(1) || "/";
        const [path, data] = hash.split('?');
        const displayFunc = this.routes[path] || this.routes['*'];
        
        if (displayFunc) {
            this.currentRoute = path;
            displayFunc({ path, params: this.getParams(data) });
        }
    }

    // Get URL parameters
    getParams(query) {
        return Object.fromEntries(new URLSearchParams(query));
    }

    // Programmatically go back
    back() {
        if (this.hasHistory) {
            window.history.back();
        } else {
            this.navigate("/");
        }
    }

    // Programmatically go forward
    forward() {
        window.history.forward();
    }
}
