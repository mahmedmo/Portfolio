/**
 * Application Constants
 *
 * Central configuration for the portfolio website.
 * Contains all magic numbers, timing values, and configuration options.
 *


 */

// DOM Element Selectors
export const SELECTORS = {
    // Music System
    SOUND_CONTROL: '#soundControl',
    MUSIC_NOTIFICATION: '#musicNotification',
    NOTIFICATION_TITLE: '.notification-title',
    NOTIFICATION_TEXT: '.notification-text',

    // Video System
    FULLSCREEN_OVERLAY: '#fullscreenOverlay',
    FULLSCREEN_VIDEO: '#fullscreenVideo',
    CUSTOM_VIDEO_CONTROLS: '#customVideoControls',
    PROJECT_CARDS: '.project-card',

    // Navigation
    NAVBAR: '#navbar',
    NAV_LINKS: '.nav-links a',

    // Sections
    HERO: '#home',
    ABOUT: '#about',
    EXPERIENCE: '#experience',
    PROJECTS: '#projects',
    CONTACT: '#contact',

    // Carousel
    PROJECTS_GRID: '.projects-grid',
    VIEW_MORE_BTN: '#viewMoreBtn',
    MOBILE_CAROUSEL: '.mobile-project-carousel',
    MOBILE_INDICATORS: '.mobile-indicators',

    // Particles
    PARTICLES: '#particles',
    
    // Hero Mew Animation
    MEW_WRAPPER: '#mew-wrapper',
    MEW_FLOATER: '#mew-floater',
    
    // Timeline
    TIMELINE: '.timeline'
};

// Timing Constants
export const TIMING = {
    // Animation Durations
    FADE_DURATION: 300,
    NOTIFICATION_DISPLAY: 4000,
    UP_NEXT_DISPLAY: 3000,
    COOLDOWN_PERIOD: 4000,
    
    // Intervals
    PARTICLE_UPDATE: 16,
    SCROLL_THROTTLE: 10,
    RESIZE_DEBOUNCE: 250,
    
    // Delays
    LOADER_FADE: 500,
    SMOOTH_SCROLL: 800,
    HOVER_DELAY: 150
};

// Responsive Breakpoints
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1000,
    DESKTOP: 1200,
    LARGE_DESKTOP: 1300,
    NARROW_DESKTOP_MIN: 1000,
    NARROW_DESKTOP_MAX: 1172
};

// Video Configuration
export const VIDEO_CONFIG = {
    SCRUB_STEP: 0.5,
    SCRUB_INTERVAL: 100,
    TRANSITION_DELAY: 100,
    READY_STATE_THRESHOLD: 3,
    SWIPE_THRESHOLD: 25,
    SWIPE_VERTICAL_THRESHOLD: 5
};

// Layout Constants
export const LAYOUT = {
    SCROLLBAR_WIDTH: 17,
    CARD_HEIGHT: 650,
    VIEW_MORE_POSITIONS: {
        CLOSE: '20px',
        NARROW_DESKTOP: '180px',
        WIDE_DESKTOP: '80px'
    }
};

// CSS Classes
export const CSS_CLASSES = {
    // State Classes
    SCROLL_LOCKED: 'scroll-locked',
    FULLSCREEN_ACTIVE: 'fullscreen-active',
    PLAYING: 'playing',
    SHOW: 'show',
    FADE_IN: 'fade-in',
    
    // Component Classes
    CENTER_IN_TABLET: 'center-in-tablet',
    PARTICLE: 'particle',
    GRADIENT_ORB: 'gradient-orb'
};

// Asset Paths
export const ASSETS = {
    MUSIC: './assets/music.mp3',
    MEW_SPRITE: 'https://img.pokemondb.net/sprites/black-white/anim/shiny/tympole.gif',
    ICONS: {
        FAVICON: './assets/favicon2.png'
    }
};

// Default Notification Content
export const NOTIFICATIONS = {
    DEFAULT: {
        TITLE: 'Sound On?',
        TEXT: 'A little music makes scrolling better. Click to play.'
    },
    NOW_PLAYING: {
        TITLE: 'Now Playing ♪'
    },
    UP_NEXT: {
        TITLE: 'Up Next ♫'
    }
};