/**
 * ParticleSystem
 *
 * 
 * Creates simple floating particles with random positioning and timing.
 *


 */

import { ComponentBase } from '../core/ComponentBase.js';
import { SELECTORS } from '../config/constants.js';

export class ParticleSystem extends ComponentBase {
    constructor(options = {}) {
        super('ParticleSystem', options);
        
        this.particlesContainer = null;
    }

    /**
     * Get default configuration options
     */
    getDefaultOptions() {
        return {
            debug: false,
            particleCount: 35
        };
    }

    /**
     * Initialize DOM element references
     */
    async initElements() {
        this.particlesContainer = this.$(SELECTORS.PARTICLES);
        
        if (!this.particlesContainer) {
            throw new Error('Particles container not found');
        }
    }

    /**
     * Initialize component state - 
     */
    async initState() {
        this.createParticles();
    }

    /**
     * Create particles - 
     */
    createParticles() {
        const particleCount = this.options.particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            const duration = 12 + Math.random() * 8; // 12-20s range
            const delay = Math.random() * 20; // Longer stagger
            
            // Alternate between two animation types for variety
            const animationName = Math.random() > 0.5 ? 'particle-float' : 'particle-float-alt';
            particle.style.animation = `${animationName} ${duration}s ease-out infinite`;
            particle.style.animationDelay = `${delay}s`;
            
            this.particlesContainer.appendChild(particle);
        }
        
        this.log(`Created ${particleCount} particles`);
    }

    /**
     * No events needed - particles are pure CSS animations
     */
    async initEvents() {
        // No events needed for particles
    }

    /**
     * Clean up particles
     */
    cleanupState() {
        if (this.particlesContainer) {
            this.particlesContainer.innerHTML = '';
        }
        
        this.log('Particles cleaned up');
    }
}