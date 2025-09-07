/**
 * EventBus
 *
 * Simple event bus implementation for component communication.
 */

class EventBus {
    constructor() {
        this.events = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function
     * @param {Object} options - Subscription options
     * @returns {Function} Unsubscribe function
     */
    on(eventName, callback, options = {}) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const subscription = {
            callback,
            once: options.once || false,
            priority: options.priority || 0,
            context: options.context || null,
            id: this.generateId()
        };

        const subscribers = this.events.get(eventName);
        subscribers.push(subscription);

        // Sort by priority (higher first)
        subscribers.sort((a, b) => b.priority - a.priority);


        // Return unsubscribe function
        return () => this.off(eventName, subscription.id);
    }

    /**
     * Subscribe to an event once
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function
     * @param {Object} options - Subscription options
     * @returns {Function} Unsubscribe function
     */
    once(eventName, callback, options = {}) {
        return this.on(eventName, callback, { ...options, once: true });
    }

    /**
     * Unsubscribe from an event
     * @param {string} eventName - Name of the event
     * @param {string|Function} callbackOrId - Callback function or subscription ID
     */
    off(eventName, callbackOrId) {
        if (!this.events.has(eventName)) {
            return;
        }

        const subscribers = this.events.get(eventName);
        const index = subscribers.findIndex(sub => 
            sub.id === callbackOrId || sub.callback === callbackOrId
        );

        if (index !== -1) {
            subscribers.splice(index, 1);

            // Clean up empty event arrays
            if (subscribers.length === 0) {
                this.events.delete(eventName);
            }
        }
    }

    /**
     * Emit an event
     * @param {string} eventName - Name of the event
     * @param {*} data - Event data
     * @returns {boolean} Whether the event was handled
     */
    emit(eventName, data = null) {
        if (!this.events.has(eventName)) {
            return false;
        }

        const subscribers = this.events.get(eventName);
        const subscribersToRemove = [];
        let handled = false;

        for (const subscription of subscribers) {
            try {
                const { callback, context, once, id } = subscription;
                
                if (context) {
                    callback.call(context, data, eventName);
                } else {
                    callback(data, eventName);
                }

                handled = true;

                // Mark once subscriptions for removal
                if (once) {
                    subscribersToRemove.push(id);
                }

            } catch (error) {
                // Error in event handler - could implement error tracking here
            }
        }

        // Remove once subscriptions
        subscribersToRemove.forEach(id => this.off(eventName, id));

        return handled;
    }

    /**
     * Emit an event asynchronously
     * @param {string} eventName - Name of the event
     * @param {*} data - Event data
     * @returns {Promise<boolean>}
     */
    async emitAsync(eventName, data = null) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = this.emit(eventName, data);
                resolve(result);
            }, 0);
        });
    }

    /**
     * Remove all subscribers for an event
     * @param {string} eventName - Name of the event
     */
    clear(eventName) {
        if (eventName) {
            this.events.delete(eventName);
        } else {
            this.events.clear();
        }
    }

    /**
     * Get list of events with subscriber counts
     * @returns {Object}
     */
    getEvents() {
        const eventList = {};
        for (const [eventName, subscribers] of this.events) {
            eventList[eventName] = subscribers.length;
        }
        return eventList;
    }

    /**
     * Check if an event has subscribers
     * @param {string} eventName - Name of the event
     * @returns {boolean}
     */
    hasSubscribers(eventName) {
        return this.events.has(eventName) && this.events.get(eventName).length > 0;
    }

    /**
     * Generate a unique ID for subscriptions
     * @returns {string}
     */
    generateId() {
        return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Create and export singleton instance
export const eventBus = new EventBus();

// Export class for testing or multiple instances
export { EventBus };