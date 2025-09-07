/**
 * TimelineController
 *
 * Handles timeline section animations with staggered reveal effects.
 * .
 *


 */

import { ComponentBase } from '../core/ComponentBase.js';
import { SELECTORS } from '../config/constants.js';

export class TimelineController extends ComponentBase {
    constructor(options = {}) {
        super('TimelineController', options);
        
        this.timeline = null;
        this.timelineItems = [];
        this.observer = null;
    }

    /**
     * Get default configuration options
     */
    getDefaultOptions() {
        return {
            debug: false,
            staggerDelay: 200, // ms delay between each item
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
    }

    /**
     * Initialize DOM element references
     */
    async initElements() {
        this.timeline = this.$(SELECTORS.TIMELINE);
        
        if (!this.timeline) {
            throw new Error('Timeline element not found');
        }
        
        this.timelineItems = this.$$('.timeline-item', this.timeline);
        
        this.log(`Found ${this.timelineItems.length} timeline items`);
    }

    /**
     * Initialize component state
     */
    async initState() {
        // Timeline items start hidden (handled by CSS)
        this.log('Timeline items initialized as hidden');
    }

    /**
     * Initialize event listeners and intersection observer
     */
    async initEvents() {
        this.setupTimelineObserver();
    }

    /**
     * Setup timeline intersection observer - 
     */
    setupTimelineObserver() {
        const observerOptions = {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        };

        // Timeline animation with enhanced stagger - 
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll(".timeline-item");
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("visible");
                        }, index * this.options.staggerDelay);
                    });
                    
                    this.log(`Animated ${items.length} timeline items with stagger`);
                }
            });
        }, observerOptions);

        // Observe the timeline container
        this.observer.observe(this.timeline);
        
        this.log('Timeline intersection observer initialized');
    }

    /**
     * Clean up component state
     */
    cleanupState() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.log('Timeline observer disconnected');
    }
}