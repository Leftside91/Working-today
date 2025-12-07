// album-inventory.js
export function initializeAlbum() {
    console.log("Album module initialized");
    
    // Load game state
    loadGameState();
    
    // Render album if element exists
    renderAlbum();
}

function loadGameState() {
    // Initialize or load stickers
    if (!localStorage.getItem('stickers')) {
        const stickers = [];
        for (let i = 1; i <= 20; i++) { // Reduced for testing
            stickers.push({
                id: i,
                number: i,
                collected: false,
                duplicates: 0
            });
        }
        localStorage.setItem('stickers', JSON.stringify(stickers));
    }
    
    // Initialize coins if not exists
    if (!localStorage.getItem('coins')) {
        localStorage.setItem('coins', '100');
    }
}

function renderAlbum() {
    const albumGrid = document.querySelector('.album-grid');
    if (!albumGrid) {
        console.log("No album grid found");
        return;
    }
    
    // Clear existing content
    albumGrid.innerHTML = '';
    
    // Get stickers from localStorage
    const stickers = JSON.parse(localStorage.getItem('stickers')) || [];
    
    // Create sticker elements
    stickers.forEach(sticker => {
        const stickerElement = document.createElement('div');
        stickerElement.className = 'sticker';
        stickerElement.innerHTML = `
            <div class="sticker-number">${sticker.number}</div>
            <div class="sticker-image">${sticker.collected ? '✅' : '?'}</div>
        `;
        
        albumGrid.appendChild(stickerElement);
    });
    
    // Update coin display
    updateCoinDisplay();
}

function updateCoinDisplay() {
    const coins = localStorage.getItem('coins') || '100';
    const coinElements = document.querySelectorAll('.coin-count');
    
    coinElements.forEach(element => {
        element.textContent = coins;
    });
}

// Export functions that might be needed elsewhere
export { updateCoinDisplay };