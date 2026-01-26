// LendWise Intro Animation with Three.js Shader
// Preserved gold/green ripple effect emanating from owl

function initShaderAnimation() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        skipIntro();
        return;
    }

    const container = document.getElementById('shader-container');
    if (!container) {
        console.error('Shader container not found');
        skipIntro();
        return;
    }
    console.log('Initializing shader animation...');

    // Vertex shader
    const vertexShader = `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Fragment shader - Gold/Green ripples from owl center
    const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        void main(void) {
            vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
            float t = time * 0.03;
            float lineWidth = 0.002;

            vec3 goldColor = vec3(1.0, 0.84, 0.0);  // Gold
            vec3 greenColor = vec3(0.0, 0.8, 0.2);  // Green

            float intensity = 0.0;

            // Owl radius offset - ripples start from owl edge
            float owlRadius = 0.13;

            for(int i=0; i < 5; i++){
                float rippleExpansion = fract(t + float(i)*0.01)*5.0;
                float adjustedLength = length(uv) - owlRadius;
                intensity += lineWidth*float(i*i) / abs(rippleExpansion - adjustedLength + mod(uv.x+uv.y, 0.2));
            }

            // Fade out inside owl area
            float fadeFactor = smoothstep(0.0, owlRadius, length(uv));
            intensity *= fadeFactor;

            // Mix gold and green based on position and time
            float mixFactor = sin(uv.x * 3.0 + time * 0.1) * 0.5 + 0.5;
            vec3 color = mix(goldColor, greenColor, mixFactor) * intensity;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    // Initialize Three.js scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance

    // Insert canvas as first child of container
    container.insertBefore(renderer.domElement, container.firstChild);

    // Handle window resize
    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
    }

    // Initial resize
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    let animationId;

    // Animation loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        uniforms.time.value += 0.02;
        renderer.render(scene, camera);
    }

    // Start animation
    animate();

    // Schedule transition after 3 seconds
    setTimeout(() => {
        transitionToMain(animationId, renderer);
    }, 3000);
}

// Skip intro for users who prefer reduced motion
function skipIntro() {
    const shaderContainer = document.getElementById('shader-container');
    const mainContent = document.querySelector('.main-content');

    if (shaderContainer) {
        shaderContainer.style.display = 'none';
    }
    if (mainContent) {
        mainContent.style.opacity = '1';
        initializeMainContent();
    }
}

// Transition from intro to main content
function transitionToMain(animationId, renderer) {
    const shaderContainer = document.getElementById('shader-container');
    const mainContent = document.querySelector('.main-content');

    // Fade out shader container
    if (shaderContainer) {
        shaderContainer.style.transition = 'opacity 0.5s ease-out';
        shaderContainer.style.opacity = '0';
        shaderContainer.classList.add('hidden');

        setTimeout(() => {
            // Stop animation and cleanup
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (renderer) {
                renderer.dispose();
            }
            shaderContainer.style.display = 'none';
            shaderContainer.remove();
        }, 500);
    }

    // Fade in main content
    if (mainContent) {
        mainContent.style.transition = 'opacity 0.5s ease-in';
        mainContent.style.opacity = '1';

        setTimeout(() => {
            initializeMainContent();
        }, 100);
    }
}

// Initialize main content components after intro
function initializeMainContent() {
    console.log('✅ Main content initialized');

    // Initialize scroll reveal animations
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }

    // Initialize navigation
    if (typeof initNavigation === 'function') {
        initNavigation();
    }

    // Initialize scroll effects
    if (typeof initScrollEffects === 'function') {
        initScrollEffects();
    }

    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('lendwise:ready'));
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        skipIntro();
    } else {
        initShaderAnimation();
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initShaderAnimation, skipIntro, transitionToMain };
}
