const container = document.querySelector('.container');
const chaosButton = document.getElementById('chaosButton');
const CHAOS_STATE_KEY = 'chaosState';
let appliedEffects = new Set();

const peaceMessage = document.createElement('div');
peaceMessage.id = 'peaceMessage';
peaceMessage.innerHTML = '<h1>You\'ve found peace</h1>';
peaceMessage.classList.add('hidden');
document.body.appendChild(peaceMessage);

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const allChaosEffects = [
    { id: 'rotate', apply: () => { 
        container.classList.add('chaos-rotate');
    }, description: 'Container is tilted!' },
    { id: 'scale', apply: () => { 
        container.classList.add('chaos-scale');
    }, description: 'Container is too big!' },
    { id: 'invert', apply: () => { 
        container.classList.add('chaos-invert');
    }, description: 'Colors are inverted!' },
    { id: 'blur', apply: () => { 
        container.classList.add('chaos-blur');
    }, description: 'Container is blurry!' },
    { id: 'grayscale', apply: () => { 
        container.classList.add('chaos-grayscale');
    }, description: 'Container is black and white!' },
    { id: 'comic-sans', apply: () => { 
        container.style.fontFamily = "'Comic Sans MS', cursive";
    }, description: 'Comic Sans everywhere!' },
    { id: 'random-colors', apply: () => {
        container.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }, description: 'Random text colors!' },
    { id: 'random-sizes', apply: () => {
        container.style.fontSize = `${Math.random() * 2 + 0.8}em`;
    }, description: 'Random text sizes!' },
    { id: 'absolute-mess', apply: () => {
        container.style.position = 'absolute';
        container.style.left = `${Math.random() * 80}%`;
        container.style.top = `${Math.random() * 80}%`;
    }, description: 'Random positioning!' },
    { id: 'grid-chaos', apply: () => {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
        container.style.gap = '20px';
    }, description: 'Grid layout chaos!' },
    { id: 'flex-chaos', apply: () => {
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '10px';
    }, description: 'Flex layout chaos!' },
    { id: 'random-box', apply: () => {
        const box = document.createElement('div');
        box.classList.add('chaos-random-element');
        box.style.position = 'fixed';
        box.style.width = '100px';
        box.style.height = '100px';
        box.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        box.style.top = `${Math.random() * 80}%`;
        box.style.left = `${Math.random() * 80}%`;
        box.style.zIndex = '9999';
        box.textContent = 'Random Box!';
        document.body.appendChild(box);
    }, description: 'A random box appeared!' },
    { id: 'floating-text', apply: () => {
        const text = document.createElement('div');
        text.classList.add('chaos-random-element');
        text.style.position = 'fixed';
        text.style.padding = '10px';
        text.style.background = 'rgba(0,0,0,0.8)';
        text.style.color = 'white';
        text.style.borderRadius = '5px';
        text.style.top = `${Math.random() * 80}%`;
        text.style.left = `${Math.random() * 80}%`;
        text.style.zIndex = '9999';
        text.textContent = 'Hello there!';
        document.body.appendChild(text);
    }, description: 'Random floating text!' },
    { id: 'error-message', apply: () => {
        const error = document.createElement('div');
        error.classList.add('chaos-random-element');
        error.style.position = 'fixed';
        error.style.padding = '10px';
        error.style.background = 'rgba(255, 0, 0, 0.8)';
        error.style.color = 'white';
        error.style.borderRadius = '5px';
        error.style.top = `${Math.random() * 80}%`;
        error.style.left = `${Math.random() * 80}%`;
        error.style.zIndex = '9999';
        error.textContent = 'Uncaught TypeError: Cannot read property of undefined';
        document.body.appendChild(error);
    }, description: 'An error message appeared!' },
    { id: 'bg-red', apply: () => { 
        container.classList.add('chaos-bg-red');
    }, description: 'Red background!' },
    { id: 'bg-blue', apply: () => { 
        container.classList.add('chaos-bg-blue');
    }, description: 'Blue background!' },
    { id: 'bg-green', apply: () => { 
        container.classList.add('chaos-bg-green');
    }, description: 'Green background!' },
    { id: 'bg-purple', apply: () => { 
        container.classList.add('chaos-bg-purple');
    }, description: 'Purple background!' },
    { id: 'bg-rainbow', apply: () => { 
        container.classList.add('chaos-bg-rainbow');
    }, description: 'Rainbow background!' },
    { id: 'create-header', apply: () => {
        const newHeader = document.createElement('header');
        newHeader.classList.add('chaos-header');
        newHeader.innerHTML = `
            <div class="header-content">
                <h1>${['Chaos Header', 'Random Header', 'New Header', 'Extra Header', 'Bonus Header'][Math.floor(Math.random() * 5)]}</h1>
                <div class="header-stats">
                    <span>Chaos: ${Math.floor(Math.random() * 100)}</span>
                </div>
            </div>
        `;
        newHeader.style.position = 'fixed';
        newHeader.style.top = `${Math.random() * 80}%`;
        newHeader.style.left = `${Math.random() * 80}%`;
        newHeader.style.zIndex = '9999';
        newHeader.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
        document.body.appendChild(newHeader);
    }, description: 'A new header appeared!' }
];

function addChaosEffect() {
    const randomEffect = allChaosEffects[Math.floor(Math.random() * allChaosEffects.length)];
    randomEffect.apply();
    appliedEffects.add(randomEffect.id);
    
    saveState();
}

function saveState() {
    localStorage.setItem(CHAOS_STATE_KEY, JSON.stringify({
        appliedEffects: Array.from(appliedEffects)
    }));
}

function loadState() {
    const savedState = localStorage.getItem(CHAOS_STATE_KEY);
    if (savedState) {
        const { appliedEffects: savedEffects } = JSON.parse(savedState);
        appliedEffects = new Set(savedEffects);
        
        savedEffects.forEach(effectId => {
            const effect = allChaosEffects.find(e => e.id === effectId);
            if (effect) {
                effect.apply();
            }
        });
    }
}

function clearAllChaosEffectsAndSetToInitialState() {
    document.body.style.background = '#1a1a1a';
    document.body.style.color = '#f0f0f0';
    
    container.classList.remove('chaos-rotate', 'chaos-scale', 'chaos-invert', 'chaos-blur', 'chaos-grayscale');
    container.classList.remove('chaos-bg-red', 'chaos-bg-blue', 'chaos-bg-green', 'chaos-bg-purple', 'chaos-bg-rainbow');
    container.style = '';
    container.style.background = '#2c2c2c';
    
    document.querySelectorAll('.chaos-random-element, .chaos-header').forEach(el => el.remove());
    
    document.querySelectorAll('*').forEach(el => {
        if (el !== document.body && el !== container) {
            el.style = '';
        }
    });
    
    appliedEffects.clear();
    
    saveState();
}

function activatePeaceMode() {
    container.style.display = 'none';
    document.querySelectorAll('.chaos-random-element, .chaos-header').forEach(el => el.remove());
    
    peaceMessage.classList.remove('hidden');
    peaceMessage.style.opacity = '1';
    document.body.classList.add('peace-mode');
    
    localStorage.removeItem(CHAOS_STATE_KEY);
}

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            console.log('%cYou\'ve found peace', 'font-size: 5em; color: red; font-weight: bold; background: #333; padding: 10px; border-radius: 5px;');
            activatePeaceMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

chaosButton.addEventListener('click', addChaosEffect);

loadState();

console.log('%cUse Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)', 'font-size: 2em; color: red; font-weight: bold;');
