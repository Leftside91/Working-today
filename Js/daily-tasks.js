// daily-tasks.js
export function initializeDailyTasks() {
    console.log("Daily tasks module initialized");
    
    // Load or initialize tasks
    const tasks = loadTasks();
    
    // Render tasks
    renderTasks(tasks);
}

function loadTasks() {
    const defaultTasks = [
        {
            id: 1,
            name: "Open Your First Pack",
            description: "Open a sticker pack",
            progress: 0,
            target: 1,
            reward: 50,
            completed: false
        },
        {
            id: 2,
            name: "Collect 5 Stickers",
            description: "Add 5 stickers to your album",
            progress: 0,
            target: 5,
            reward: 100,
            completed: false
        },
        {
            id: 3,
            name: "Daily Login",
            description: "Visit the album today",
            progress: 1,
            target: 1,
            reward: 25,
            completed: false
        }
    ];
    
    // Try to load from localStorage
    const savedTasks = localStorage.getItem('dailyTasks');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    
    // Save default tasks
    localStorage.setItem('dailyTasks', JSON.stringify(defaultTasks));
    return defaultTasks;
}

function renderTasks(tasks) {
    const tasksContainer = document.getElementById('dailyTasks');
    if (!tasksContainer) {
        console.log("No daily tasks container found");
        return;
    }
    
    tasksContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.style.cssText = `
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            background: ${task.completed ? '#e8f5e9' : '#fff'};
        `;
        
        const progressPercent = (task.progress / task.target) * 100;
        
        taskElement.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">${task.name}</h3>
            <p style="margin: 0 0 10px 0; color: #666;">${task.description}</p>
            <div style="background: #eee; height: 10px; border-radius: 5px; margin: 10px 0;">
                <div style="background: #4CAF50; height: 100%; width: ${progressPercent}%; border-radius: 5px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${task.progress}/${task.target}</span>
                <span style="font-weight: bold; color: #ff9800;">Reward: ${task.reward} coins</span>
            </div>
            <button class="claim-btn" data-id="${task.id}" 
                style="margin-top: 10px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
                ${task.completed ? 'disabled style="opacity: 0.5;"' : ''}>
                ${task.completed ? 'Claimed' : 'Claim Reward'}
            </button>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
    
    // Add event listeners to claim buttons
    document.querySelectorAll('.claim-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = parseInt(this.dataset.id);
            claimTask(taskId);
        });
    });
}

function claimTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1 && !tasks[taskIndex].completed) {
        // Mark as completed
        tasks[taskIndex].completed = true;
        
        // Give reward
        const currentCoins = parseInt(localStorage.getItem('coins') || '100');
        const reward = tasks[taskIndex].reward;
        localStorage.setItem('coins', currentCoins + reward);
        
        // Save updated tasks
        localStorage.setItem('dailyTasks', JSON.stringify(tasks));
        
        // Update display
        renderTasks(tasks);
        updateCoinDisplay();
        
        alert(`You received ${reward} coins!`);
    }
}

function updateCoinDisplay() {
    const coins = localStorage.getItem('coins') || '100';
    const coinElements = document.querySelectorAll('.coin-count');
    
    coinElements.forEach(element => {
        element.textContent = coins;
    });
}