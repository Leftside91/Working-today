// main.js - Entry point
console.log("Main.js loaded!");

// Import other modules
import { initializeAlbum } from './album-inventory.js';
import { initializeDailyTasks } from './daily-tasks.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded!");
    
    // Initialize modules
    initializeAlbum();
    initializeDailyTasks();
    
    // Setup games button
    const playGamesBtn = document.getElementById('playGamesBtn');
    if (playGamesBtn) {
        playGamesBtn.addEventListener('click', function() {
            // For now, show a message
            alert('Games page coming soon!');
            // Later: window.location.href = 'games.html';
        });
    }
    
    // Setup pack opening button (if exists)
    const openPackBtn = document.getElementById('openPackBtn');
    if (openPackBtn) {
        openPackBtn.addEventListener('click', function() {
            openPack();
        });
    }
});

// Simple pack opening function for now
function openPack() {
    console.log("Opening pack...");
    alert('Opening a pack!');
}