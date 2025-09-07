/**
 * ComponentBase
 *
 * Abstract base class for all portfolio components.
 */

export class ComponentBase {
    /**
     * Creates a new component instance
     * @param {string} name - Component name for debugging
     * @param {Object} options - Component configuration options
     */
    constructor(name, options = {}) {
        this.name = name;
        this.options = { ...this.getDefaultOptions(), ...options };
        this.isInitialized = false;
        this.isDestroyed = false;
        this.eventListeners = new Map();
        
        // Bind methods to maintain context
        this.destroy = this.destroy.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    /**
     * Initialize the component
     * Template method that calls lifecycle hooks
     */
    async init() {
        if (this.isInitialized) {
            this.warn('Component already initialized');
            return;
        }

        try {
            await this.beforeInit();
            await this.initElements();
            await this.initState();
            await this.initEvents();
            await this.afterInit();
            
            this.isInitialized = true;
            
        } catch (error) {
            this.handleError('Failed to initialize component', error);
            throw error;
        }
    }

    /**
     * Destroy the component and clean up resources
     */
    destroy() {
        if (this.isDestroyed) {
            return;
        }

        try {
            this.beforeDestroy();
            this.removeAllEventListeners();
            this.cleanupState();
            this.afterDestroy();
            
            this.isDestroyed = true;
            this.isInitialized = false;
            
        } catch (error) {
            this.handleError('Failed to destroy component', error);
        }
    }

    // =============================================================================
    // Lifecycle Hooks (Override in subclasses)
    // =============================================================================

    /**
     * Called before component initialization
     * Override to perform pre-initialization setup
     */
    async beforeInit() {
        // Override in subclasses
    }

    /**
     * Initialize DOM elements and references
     * Override to cache DOM elements
     */
    async initElements() {
        // Override in subclasses
    }

    /**
     * Initialize component state
     * Override to set up initial state
     */
    async initState() {
        // Override in subclasses
    }

    /**
     * Initialize event listeners
     * Override to set up event handling
     */
    async initEvents() {
        // Override in subclasses
    }

    /**
     * Called after successful initialization
     * Override to perform post-initialization setup
     */
    async afterInit() {
        // Override in subclasses
    }

    /**
     * Called before component destruction
     * Override to perform pre-cleanup tasks
     */
    beforeDestroy() {
        // Override in subclasses
    }

    /**
     * Clean up component state
     * Override to clean up custom state
     */
    cleanupState() {
        // Override in subclasses
    }

    /**
     * Called after component destruction
     * Override to perform final cleanup
     */
    afterDestroy() {
        // Override in subclasses
    }

    /**
     * Get default options for the component
     * Override to provide component-specific defaults
     */
    getDefaultOptions() {
        return {};
    }

    // =============================================================================
    // Event Management
    // =============================================================================

    /**
     * Add an event listener and track it for cleanup
     * @param {Element} element - DOM element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    addEventListener(element, event, handler, options = {}) {
        if (!element || typeof handler !== 'function') {
            this.warn('Invalid arguments for addEventListener');
            return;
        }

        element.addEventListener(event, handler, options);
        
        // Track for cleanup
        const key = `${element.tagName || 'UNKNOWN'}_${event}_${Date.now()}`;
        this.eventListeners.set(key, {
            element,
            event,
            handler,
            options
        });
    }

    /**
     * Remove all tracked event listeners
     */
    removeAllEventListeners() {
        for (const [key, { element, event, handler, options }] of this.eventListeners) {
            try {
                element.removeEventListener(event, handler, options);
            } catch (error) {
                this.warn(`Failed to remove event listener: ${key}`, error);
            }
        }
        this.eventListeners.clear();
    }

    // =============================================================================
    // Utility Methods
    // =============================================================================

    /**
     * Safe DOM query selector
     * @param {string} selector - CSS selector
     * @param {Element} context - Search context (default: document)
     * @returns {Element|null}
     */
    $(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            this.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    }

    /**
     * Safe DOM query selector all
     * @param {string} selector - CSS selector
     * @param {Element} context - Search context (default: document)
     * @returns {NodeList}
     */
    $$(selector, context = document) {
        try {
            return context.querySelectorAll(selector);
        } catch (error) {
            this.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    }

    /**
     * Wait for a specified duration
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise}
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Debounce a function call
     * @param {Function} func - Function to debounce
     * @param {number} delay - Delay in milliseconds
     * @returns {Function}
     */
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Throttle a function call
     * @param {Function} func - Function to throttle
     * @param {number} delay - Delay in milliseconds
     * @returns {Function}
     */
    throttle(func, delay) {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    // =============================================================================
    // Logging and Error Handling
    // =============================================================================

    /**
     * Log a message with component context
     */
    log(message, ...args) {
        // Disabled for production
    }

    /**
     * Log a warning with component context
     */
    warn(message, ...args) {
        // Could implement user-facing error handling here
    }

    /**
     * Handle component errors
     */
    handleError(message, error) {
        // Emit error event for global error handling
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('componentError', {
                detail: {
                    component: this.name,
                    message,
                    error
                }
            }));
        }
    }

    // =============================================================================
    // State Management
    // =============================================================================

    /**
     * Check if component is ready for operations
     * @returns {boolean}
     */
    isReady() {
        return this.isInitialized && !this.isDestroyed;
    }

    /**
     * Ensure component is ready before executing a function
     * @param {Function} func - Function to execute
     * @returns {*}
     */
    whenReady(func) {
        if (this.isReady()) {
            return func();
        } else {
            this.warn('Component not ready for operation');
            return null;
        }
    }
}