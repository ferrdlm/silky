

function updateTime() {
    const timeElement = document.getElementById('timeElement');
    if (!timeElement) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

function setDefaultBattery() {
    const batteryLevelEl = document.getElementById('batteryLevel');
    const batteryFillEl = document.getElementById('batteryFill');
    if (batteryLevelEl) batteryLevelEl.textContent = `100%`;
    if (batteryFillEl) batteryFillEl.setAttribute('width', '12');
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            const rawLevel = (battery.level !== undefined && !isNaN(battery.level)) ? battery.level : 1;
            const level = Math.round(rawLevel * 100);
            
            const batteryLevelEl = document.getElementById('batteryLevel');
            const batteryFillEl = document.getElementById('batteryFill');

            if (batteryLevelEl) batteryLevelEl.textContent = `${level}%`;
            if (batteryFillEl) {
                const fillWidth = (level / 100) * 12; 
                batteryFillEl.setAttribute('width', fillWidth.toString());
            }
        }

        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
    }).catch(() => setDefaultBattery());
} else {
    setDefaultBattery();
}


const activeAppNameEl = document.getElementById('activeAppName');

function setActiveApp(name) {
    if (activeAppNameEl) {
        activeAppNameEl.textContent = name;
    }
}


const welcomeWin = document.getElementById('window');
const musicWin = document.getElementById('musicWindow');
const notesWin = document.getElementById('notesWindow');

const dockWelcome = document.getElementById('dockWelcome');
const dockMusic = document.getElementById('dockMusic');
const dockNotes = document.getElementById('dockNotes');

if (dockWelcome) {
    dockWelcome.addEventListener('click', () => {
        welcomeWin?.classList.remove('hidden');
        bringToFront(welcomeWin);
        setActiveApp('Welcome');
    });
}

if (dockMusic) {
    dockMusic.addEventListener('click', () => {
        musicWin?.classList.remove('hidden');
        bringToFront(musicWin);
        setActiveApp('Music');
    });
}

if (dockNotes) {
    dockNotes.addEventListener('click', () => {
        notesWin?.classList.remove('hidden');
        bringToFront(notesWin);
        setActiveApp('Notes');
    });
}

document.getElementById('windowclose')?.addEventListener('click', () => {
    welcomeWin?.classList.add('hidden');
    setActiveApp('Finder');
});
document.getElementById('musicClose')?.addEventListener('click', () => {
    musicWin?.classList.add('hidden');
    setActiveApp('Finder');
});
document.getElementById('notesClose')?.addEventListener('click', () => {
    notesWin?.classList.add('hidden');
    setActiveApp('Finder');
});

function bringToFront(windowEl) {
    if (!windowEl) return;
    document.querySelectorAll('.window').forEach(w => w.style.zIndex = '10');
    windowEl.style.zIndex = '100';
}

welcomeWin?.addEventListener('mousedown', () => {
    bringToFront(welcomeWin);
    setActiveApp('Welcome');
});
musicWin?.addEventListener('mousedown', () => {
    bringToFront(musicWin);
    setActiveApp('Music');
});
notesWin?.addEventListener('mousedown', () => {
    bringToFront(notesWin);
    setActiveApp('Notes');
});


function makeDraggable(windowEl, headerEl) {
    if (!windowEl || !headerEl) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    headerEl.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        windowEl.style.top = (windowEl.offsetTop - pos2) + "px";
        windowEl.style.left = (windowEl.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

makeDraggable(welcomeWin, document.getElementById('windowheader'));
makeDraggable(musicWin, document.getElementById('musicHeader'));
makeDraggable(notesWin, document.getElementById('notesHeader'));

const settingsWin = document.getElementById('settingsWindow');
const terminalWin = document.getElementById('terminalWindow');
const calcWin = document.getElementById('calcWindow');

document.getElementById('dockSettings')?.addEventListener('click', () => {
    settingsWin?.classList.remove('hidden');
    bringToFront(settingsWin);
    setActiveApp('Settings');
});

document.getElementById('dockTerminal')?.addEventListener('click', () => {
    terminalWin?.classList.remove('hidden');
    bringToFront(terminalWin);
    setActiveApp('Terminal');
});

document.getElementById('dockCalc')?.addEventListener('click', () => {
    calcWin?.classList.remove('hidden');
    bringToFront(calcWin);
    setActiveApp('Calculator');
});

document.getElementById('settingsClose')?.addEventListener('click', () => {
    settingsWin?.classList.add('hidden');
    setActiveApp('Finder');
});
document.getElementById('terminalClose')?.addEventListener('click', () => {
    terminalWin?.classList.add('hidden');
    setActiveApp('Finder');
});
document.getElementById('calcClose')?.addEventListener('click', () => {
    calcWin?.classList.add('hidden');
    setActiveApp('Finder');
});

settingsWin?.addEventListener('mousedown', () => { bringToFront(settingsWin); setActiveApp('Settings'); });
terminalWin?.addEventListener('mousedown', () => { bringToFront(terminalWin); setActiveApp('Terminal'); });
calcWin?.addEventListener('mousedown', () => { bringToFront(calcWin); setActiveApp('Calculator'); });

makeDraggable(settingsWin, document.getElementById('settingsHeader'));
makeDraggable(terminalWin, document.getElementById('terminalHeader'));
makeDraggable(calcWin, document.getElementById('calcHeader'));

function changeBg(bgValue) {
    if (bgValue.includes('.')) {
        document.body.style.backgroundImage = `url('${bgValue}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
        document.body.style.backgroundImage = bgValue;
    }
}

const cliInput = document.getElementById('cliInput');
const cliOutput = document.getElementById('cliOutput');

cliInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';
        let res = '';
        
        if (cmd === '/help') {
            res = 'Available commands: /help, /clear, /open [app], /date';
        } else if (cmd === '/clear') {
            cliOutput.innerHTML = '';
            return;
        } else if (cmd === '/date') {
            res = new Date().toLocaleString();
        } else if (cmd.startsWith('/open ')) {
            const app = cmd.replace('/open ', '');
            if (app === 'welcome') welcomeWin?.classList.remove('hidden');
            else if (app === 'music') musicWin?.classList.remove('hidden');
            else if (app === 'notes') notesWin?.classList.remove('hidden');
            else if (app === 'settings') settingsWin?.classList.remove('hidden');
            else if (app === 'calc') calcWin?.classList.remove('hidden');
            res = `Opening ${app}...`;
        } else {
            res = `Command not recognized: ${cmd}`;
        }

        cliOutput.innerHTML += `<div>> ${cmd}</div><div>${res}</div>`;
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }
});

let calcDisplay = document.getElementById('calcDisplay');

function calcAppend(val) {
    if (!calcDisplay) return;
    if (calcDisplay.value === '0' || calcDisplay.value === 'Error') {
        calcDisplay.value = val;
    } else {
        calcDisplay.value += val;
    }
}

function calcClear() {
    if (calcDisplay) calcDisplay.value = '0';
}

function calcCalculate() {
    if (!calcDisplay) return;
    try {
        calcDisplay.value = eval(calcDisplay.value);
    } catch (e) {
        calcDisplay.value = 'Error';
    }
}


function switchSettingsTab(tabName) {

    document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.add('hidden'));
    

    document.querySelectorAll('.settings-tab').forEach(btn => btn.classList.remove('active-tab'));

    if (tabName === 'wallpaper') {
        document.getElementById('tabWallpaper')?.classList.remove('hidden');
        document.getElementById('tabBtnWallpaper')?.classList.add('active-tab');
    } else if (tabName === 'about') {
        document.getElementById('tabAbout')?.classList.remove('hidden');
        document.getElementById('tabBtnAbout')?.classList.add('active-tab');
    } else if (tabName === 'appearance') {
        document.getElementById('tabAppearance')?.classList.remove('hidden');
        document.getElementById('tabBtnAppearance')?.classList.add('active-tab');
    }
}


function toggleGlassEffect(checkbox) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        if (checkbox.checked) {
            win.style.backdropFilter = 'blur(10px)';
        } else {
            win.style.backdropFilter = 'none';
        }
    });
}