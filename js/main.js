/**
 * Main Application Entry Point
 *
 * Initializes and coordinates all portfolio components.
 */

import { eventBus } from './core/EventBus.js';
import { MusicController } from './components/MusicController.js';
import { VideoController } from './components/VideoController.js';
import { ProjectCarousel } from './components/ProjectCarousel.js';
import { ParticleSystem } from './components/ParticleSystem.js';
import { NavigationManager } from './components/NavigationManager.js';
import { HeroController } from './components/HeroController.js';
import { TimelineController } from './components/TimelineController.js';
import { populateProjectsOnLoad } from './utils/projectRenderer.js';

/**
 * Portfolio Application
 * Main application class that manages all components
 */
class PortfolioApp {
    constructor() {
        this.components = new Map();
        this.isInitialized = false;
        this.initPromise = null;
        
        // Bind methods
        this.handleError = this.handleError.bind(this);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = this.performInit();
        return this.initPromise;
    }

    /**
     * Perform application initialization
     */
    async performInit() {
        try {
            this.setupErrorHandling();
            this.setupGlobalEvents();
            await this.initializeComponents();
            this.setupComponentCommunication();
            this.setupFooterFunctionality();
            this.handleInitialState();
            
            this.isInitialized = true;
            eventBus.emit('app:ready');
            
        } catch (error) {
            throw error;
        }
    }

    /**
     * Initialize all application components
     */
    async initializeComponents() {
        // Populate projects from configuration before component initialization
        populateProjectsOnLoad();
        
        const componentConfigs = [
            {
                name: 'navigationManager',
                Component: NavigationManager,
                options: { debug: false }
            },
            {
                name: 'heroController',
                Component: HeroController,
                options: { debug: false, mewSpeed: 0.5 }
            },
            {
                name: 'timelineController',
                Component: TimelineController,
                options: { debug: false, staggerDelay: 200 }
            },
            {
                name: 'musicController',
                Component: MusicController,
                options: { debug: false }
            },
            {
                name: 'videoController',
                Component: VideoController,
                options: { debug: false }
            },
            {
                name: 'projectCarousel',
                Component: ProjectCarousel,
                options: { debug: false }
            },
            {
                name: 'particleSystem',
                Component: ParticleSystem,
                options: { debug: false, particleCount: 20 }
            }
        ];

        for (const config of componentConfigs) {
            try {
                const component = new config.Component(config.options);
                await component.init();
                this.components.set(config.name, component);
                
            } catch (error) {
                throw error;
            }
        }
    }

    /**
     * Setup communication between components
     */
    setupComponentCommunication() {
        // Music and notification coordination
        eventBus.on('music:started', (data) => {
            // Music tracking for analytics if needed
        });

        eventBus.on('music:stopped', () => {
            // Music tracking for analytics if needed
        });

        // Video and layout coordination
        eventBus.on('fullscreen:entered', () => {
            // Pause particles when in fullscreen for performance
            const particles = this.getComponent('particleSystem');
            if (particles) {
                particles.pause();
            }
        });

        eventBus.on('fullscreen:exited', () => {
            // Resume particles when exiting fullscreen
            const particles = this.getComponent('particleSystem');
            if (particles) {
                particles.resume();
            }
        });

        // Layout changes affecting multiple components
        eventBus.on('layout:resize', (data) => {
            // Coordinate responsive behavior across components
            if (data.isMobile) {
                eventBus.emit('layout:modeChange', { mode: 'mobile' });
            } else {
                eventBus.emit('layout:modeChange', { mode: 'desktop' });
            }
        });

    }

    /**
     * Setup global error handling
     */
    setupErrorHandling() {
        // Component error handling
        window.addEventListener('componentError', this.handleError);
        
        // Global error handling
        window.addEventListener('error', (event) => {
            // Error logging could be added here
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            // Error logging could be added here
        });
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEvents() {
        // Page visibility for performance optimization
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                eventBus.emit('app:hidden');
            } else {
                eventBus.emit('app:visible');
            }
        });

        // Before unload cleanup
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        // Intersection observer for fade-in animations
        this.setupFadeInAnimations();
    }

    /**
     * Setup fade-in animations using Intersection Observer
     */
    setupFadeInAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(element => observer.observe(element));

    }

    /**
     * Handle initial page state (e.g., hash navigation)
     */
    handleInitialState() {
        // Handle initial hash in URL
        const hash = window.location.hash;
        if (hash) {
            const navigationManager = this.getComponent('navigationManager');
            if (navigationManager) {
                const sectionId = hash.substring(1);
                setTimeout(() => {
                    navigationManager.scrollToSection(sectionId);
                }, 500);
            }
        }

        // Remove loader
        this.removeLoader();
    }

    /**
     * Remove page loader
     */
    removeLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    /**
     * Handle component errors
     */
    handleError(event) {
        const { component, message, error } = event.detail;
        eventBus.emit('app:error', { component, message, error });
    }

    /**
     * Handle page unload
     */
    handleBeforeUnload() {
        this.cleanup();
    }

    /**
     * Get component instance
     */
    getComponent(name) {
        return this.components.get(name);
    }

    /**
     * Get all component instances
     */
    getComponents() {
        return Array.from(this.components.values());
    }

    /**
     * Get application state
     */
    getState() {
        const componentStates = {};
        
        for (const [name, component] of this.components) {
            if (typeof component.getState === 'function') {
                componentStates[name] = component.getState();
            }
        }

        return {
            isInitialized: this.isInitialized,
            components: componentStates,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Cleanup application resources
     */
    cleanup() {
        // Cleanup all components
        for (const [name, component] of this.components) {
            try {
                if (typeof component.destroy === 'function') {
                    component.destroy();
                }
            } catch (error) {
                // Component cleanup failed
            }
        }

        // Clear components
        this.components.clear();

        // Remove global event listeners
        window.removeEventListener('componentError', this.handleError);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);

        this.isInitialized = false;
    }

    /**
     * Setup footer return to top functionality
     */
    setupFooterFunctionality() {
        const returnToTopBtn = document.getElementById('returnToTop');
        if (!returnToTopBtn) return;

        returnToTopBtn.addEventListener('click', () => {
            // Smooth scroll to top with rocket launch animation
            returnToTopBtn.style.transform = 'translateY(-50px) scale(0.8)';
            returnToTopBtn.style.opacity = '0.7';
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset button after animation
            setTimeout(() => {
                returnToTopBtn.style.transform = '';
                returnToTopBtn.style.opacity = '';
            }, 600);
            
            // Emit event for analytics/tracking if needed
            eventBus.emit('footer:returnToTop');
        });
    }
}

// Create global app instance
const app = new PortfolioApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init().catch(console.error);
    });
} else {
    app.init().catch(console.error);
}

// Export for debugging and testing
window.portfolioApp = app;

// Export app for module usage
export default app;