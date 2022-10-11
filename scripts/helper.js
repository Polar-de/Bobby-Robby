// Alle wichtigen Funktionen

/* Setzt alles Wichtige für die jeweilige Welt oder das jeweililge Level */
function worldSetup() {
    switch (
        world // Aktuelle Welt
    ) {
        case 1: // world 1
            bgLayer1.src = './img/bg/world1/layer1.png';    // Setzt die src der Hintergrund Ebenen 
            bgLayer2.src = './img/bg/world1/layer2.png';    // Jede Welt hat 4 Hintergrund Ebenen
            bgLayer3.src = './img/bg/world1/layer3.png';    // Die sich mit unterschiedlichen Geschwindigkeiten bewegen
            bgLayer4.src = './img/bg/world1/layer4.png';    // Dadurch entsteht der Parallax Effekt
            bgTextLayer1.src = './img/bg/text/world1.png';  // Text der zeigt welche Welt gespielt wird
            tileset = document.getElementById('tileset');   // Das Tileset für die Welt
            bgMusic = new Audio('./audio/bgMusic/w1.mp3');  // Die Hintergrundmusik für die Welt
            video = document.getElementById('w1');          // Das Cutscene Video das nach dem beenden der Welt angezeigt wird.
            break;
        case 2: // world 2
            bgLayer1.src = './img/bg/world2/layer1.png';
            bgLayer2.src = './img/bg/world2/layer2.png';
            bgLayer3.src = './img/bg/world2/layer3.png';
            bgLayer4.src = './img/bg/world2/layer4.png';
            bgTextLayer1.src = './img/bg/text/world2.png';
            tileset = document.getElementById('tileset2');
            bgMusic = new Audio('./audio/bgMusic/w2.mp3');
            video = document.getElementById('w2');
            break;
        case 3: // world 3
            bgLayer1.src = './img/bg/world3/layer1.png';
            bgLayer2.src = './img/bg/world3/layer2.png';
            bgLayer3.src = './img/bg/world3/layer3.png';
            bgLayer4.src = './img/bg/world3/layer4.png';
            bgTextLayer1.src = './img/bg/text/world3.png';
            tileset = document.getElementById('tileset3');
            bgMusic = new Audio('./audio/bgMusic/w3.mp3');
            video = document.getElementById('w3');
            break;
        case 4: // world 4
            bgLayer1.src = './img/bg/world4/layer1.png';
            bgLayer2.src = './img/bg/world4/layer2.png';
            bgLayer3.src = './img/bg/world4/layer3.png';
            bgLayer4.src = './img/bg/world4/layer4.png';
            bgTextLayer1.src = './img/bg/text/world4.png';
            tileset = document.getElementById('tileset4');
            bgMusic = new Audio('./audio/bgMusic/w4.mp3');
            video = document.getElementById('w4');
            break;
        default:
            break;
    }
    switch (
        level // select leveltext for matching level
    ) {
        case 1:
            bgTextLayer2.src = './img/bg/text/level1.png';  // Text der zeigt welches Level gespielt wird
            break;
        case 2:
            bgTextLayer2.src = './img/bg/text/level2.png';  // Text der zeigt welches Level gespielt wird
        default:
            break;
    }
    /* Erstellt für jede Hintergrund Ebene und für den Text den Parallax */
    layer1 = new Parallax(bgLayer1, 0.1);
    layer2 = new Parallax(bgLayer2, 0.2);
    textLayer1 = new Parallax(bgTextLayer1, 2);
    textLayer2 = new Parallax(bgTextLayer2, 3);
    layer3 = new Parallax(bgLayer3, 0.4);
    layer4 = new Parallax(bgLayer4, 1);
}

/* Game - Loop - Läuft die ganze Zeit während dem Level und updated alle wichtigen Funktionen */
function update(requestTime) {
    duration = (requestTime - timerStart) / 1000; // Zeit die vergangen ist seit dem die Funktion das letzte mal aufgerufen wurde
    timerStart = requestTime; // Setzt den Timer zurück

    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Als erstes wird jedes mal alles auf dem Canvas gelöscht
    layer1.update(duration);                            // updatet alle Parallax Ebenen
    layer2.update(duration);
    textLayer1.update(duration);
    textLayer2.update(duration);
    layer3.update(duration);
    layer4.update(duration);
    ctx.drawImage(paraCanvas, 0, 0, 1280, 704);         // Zeichnet den Parallax Canvas auf den sichtbaren Canvas

    if (world == 4) player.update(duration);    // Wenn Welt 4 gespielt wird, wird der Spieler vor der Map gezeichnet, dadurch steht er in den Wolken
    checkCollision();                          
    updateLevel(duration);                      // updatet das Level
    if (world < 4) player.update(duration);     // Wenn nicht Welt 4, dann wird Spieler nach der Map gezeichnet.
    

    hud.update(duration);                   // Hud wird geupdatet
    soundOverlay();                         // Overlay unten links für stummschalten wird gezeichnet
    if (musicMuted) bgMusic.volume = 0;     // Wenn Musik gemutet ist dann setzt es die Lautstärke auf 0
    if (!musicMuted) bgMusic.volume = 0.2;  // Wenn Musik nicht gemutet auf 20% Lautstärke

    if (health <= 0) {          // Falls Leben auf 0 => gameOver()
        gameOver(loop);
    } else if (posY > 650) {    // Falls y-Position am unteren Ende der Map => gameOver()
        gameOver(loop);
    } else if (coins >= 3) {    // Falls 3 Katzenkekse gesammelt => levelFinish()
        levelFinish(loop);
    } else {
        loop = requestAnimationFrame(update);   // Ansonsten wird der Loop weiter ausgeführt
    }
}

// Richtet das Level ein, Level, Spieler, etc.
function startLevel() {
    menuMusic.pause();  // pausiert die Menü Musik
    currentLevel = getCopyOfArray(levels[world][level]); // speichert eine Kopie des Levels, damit am Original Level nichts verändert wird
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelX = 640;   // Setzt die levelX auf 640, Position für die Kollisionen
    x = 0;          // Setzt x auf 0, Position für das zeichnen des mapCanvas
    health = 3;     // Setzt Leben zurück
    coins = 0;      // Setzt Katzenkekse zurück
    posX = canvas.width / 2 - 12; // Startposition X des Spielers
    posY = 300;     // Startposition Y des Spielers
    worldSetup();   
    bgMusic.play(); // startet die Hintergrundmusik
    player = new Player();  // erstellt den Spieler
    hud = new Hud();        // erstellt das Hud
    inputSetup();           // richtet die Steuerung ein
    drawLevel(currentLevel);// zeichnet das Level
    timerStart = performance.now(); // startet den Timer für die Duration
    window.requestAnimationFrame(update);   // startet den Game Loop
}

// Funktion um das Level aus dem Multidimensional Array zu kopieren
function getCopyOfArray(array) {
    return array.map((row) => row.map((col) => col)); 
}

// Funktion ermöglicht es den Canvas in Vollbild anzuzeigen durch drücken von 'F'
function fullscreen(e) {
    if (e.key == 'f') {
        canvas.requestFullscreen();
    }
}

// Funktion die ausgeführt wird wenn der Spieler stirbt
function gameOver(loop) {
    bgMusic.pause();    // Musik wird pausiert
    cancelAnimationFrame(loop); // bricht den Game Loop ab.
    let gameOverDE = document.getElementById('gameOverDE');     
    let gameOverEN = document.getElementById('gameOverEN');
    if (language == 'de') ctx.drawImage(gameOverDE, 286, 224);  // zeichnet das Game Over Overlay in Deutsch oder Englisch
    if (language == 'en') ctx.drawImage(gameOverEN, 348, 224);
}

// Funktion die ausgeführt wird wenn der Spieler das Level erfolgreich beendet
function levelFinish(loop) {
    inputDelete();  // entfernt die Steurung
    bgMusic.pause(); // beendet die Musik
    let imgFinishedEn = document.getElementById('levelFinishedEn')  
    let imgFinishedDe = document.getElementById('levelFinishedDe')
    if (language == 'en') ctx.drawImage(imgFinishedEn, 390, 227)    // zeichnet das Game Finished Overlay in Deutsch oder Englisch
    if (language == 'de') ctx.drawImage(imgFinishedDe, 390, 227)
    cancelAnimationFrame(loop);
    coins = 0;
    setTimeout(() => {
        if (level == 1) {
            level = 2;
            startLevel();
        } else if (level == 2 && unlocked < 4) {
            world++;
            level = 1;
            localStorage.setItem('unlocked', world);
            unlocked = localStorage.getItem('unlocked');
            video.play();
            requestAnimationFrame(cutSzene);
        } else {
            level = 1;
            video.play();
            requestAnimationFrame(cutSzene);
        }
    }, 1000);
}

// Startet das Level neu
function restartLevel() {
    bgMusic.pause();
    cancelAnimationFrame(loop);
    inputDelete();
    startLevel();
}

//
//
/* Input Functions */

// Erstellt die Steuerung
function inputSetup() {
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keyup', keyHandler);
    leftKey = false;
    rightKey = false;
    jumpKey = false;
}

// Funktion um zurück ins Menü zu kommen
function backToMenu() {
    bgMusic.pause();
    menuMusic.play();
    cancelAnimationFrame(loop);
    inputDelete();
    new Kitchen();
}

// Funktion die je nach Taste die gedrückt wurde, etwas ausführt
function keyHandler(e) {
    switch (e.key) {
        case 'a':
        case 'ArrowLeft':
            leftKey = e.type == 'keydown'; // A oder Pfeil links um nach links zu gehen
            break;
        case 'd':
        case 'ArrowRight':
            rightKey = e.type == 'keydown'; // D oder Pfeil rechts um nach rechts zu gehen
            break;
        case 'w':
        case 'ArrowUp':
        case ' ':
            jumpKey = e.type == 'keydown'; // W, Pfeil hoch oder Leertaste zum Springen
            break;
        case 'r':
            restartLevel(); // wenn R gedrückt wird, startet das Level neu
            break;
        case 'p':
            backToMenu();   // wenn P gedrückt wird, kommt man zurück ins Menü
            break;
        default:
            break;
    }
}

// Löscht die Steuerung
function inputDelete() {
    window.removeEventListener('keydown', keyHandler);
    window.removeEventListener('keyup', keyHandler);
}

//
//
//
/* Funktion um die korrekte Mausposition zu bekommen, auch im Vollbildschirm */
function getMousePosition(e) {
    let x, y;
    let view = canvas.getBoundingClientRect();
    if (isFullscreen) {
        let ratio = window.innerHeight / canvas.height;
        let offset = (window.innerWidth - canvas.width * ratio) / 2;
        x = calculate(e.clientX - view.left - offset, 0, canvas.width * ratio, 0, canvas.width);
        y = calculate(e.clientY - view.top, 0, canvas.height * ratio, 0, canvas.height);
    } else {
        x = e.offsetX;
        y = e.offsetY;
    }

    mouseX = x;
    mouseY = y;
}

/*  Wir hatten das Problem, das im Vollbildmodus die Mausposition nicht stimmt, nachdem ich alles mögliche ausprobiert habe und nichts funktioniert
    hat habe ich diese calculate() Funktion von StackOverflow kopiert
    https://stackoverflow.com/questions/62049700/how-can-i-get-the-mouse-position-on-an-html5-canvas-when-canvas-is-fullscreen 
*/
function calculate(v, n1, n2, m1, m2) {
    return ((v - n1) / (n2 - n1)) * (m2 - m1) + m1;
}

// Funktion zum Abspielen der Cut Scene
function cutSzene() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (video.ended || video.paused) {
        new Kitchen();
    } else {
        requestAnimationFrame(cutSzene);
    }
}

// Funktion zum Muten von Musik und Soundeffekten
function mute(e) {
    switch (e.key) {
        case 'm':
            if (musicMuted) {
                musicMuted = false;
            } else {
                musicMuted = true;
            }
            break;
        case 'n':
            if (soundMuted) {
                soundMuted = false;
            } else {
                soundMuted = true;
            }
            break;
        default:
            break;
    }
    if (musicMuted) menuMusic.volume = 0;
    if (!musicMuted) menuMusic.volume = 0.2;
}

// Anzeigen des Soundoverlays, ob gemutet oder nicht
function soundOverlay() {
    let musicBtn = new Image();
    let soundBtn = new Image();
    if (!musicMuted) {
        if (language == 'en') musicBtn.src = './img/overlay/mute/MusicEnOn.png';
        if (language == 'de') musicBtn.src = './img/overlay/mute/MusicDeOn.png';
    } else {
        if (language == 'en') musicBtn.src = './img/overlay/mute/MusicEnOff.png';
        if (language == 'de') musicBtn.src = './img/overlay/mute/MusicDeOff.png';
    }
    if (!soundMuted) {
        if (language == 'en') soundBtn.src = './img/overlay/mute/SoundEnOn.png';
        if (language == 'de') soundBtn.src = './img/overlay/mute/SoundDeOn.png';
    } else {
        if (language == 'en') soundBtn.src = './img/overlay/mute/SoundEnOff.png';
        if (language == 'de') soundBtn.src = './img/overlay/mute/SoundDeOff.png';
    }

    ctx.drawImage(musicBtn, 10, 610);
    ctx.drawImage(soundBtn, 15, 656);
}
