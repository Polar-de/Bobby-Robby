let moveSpeed = 300; // Geschwindigkeit mit der sich die Welt bewegt.
let health = 3; 
let coins = 0; 
let language = 'en'; // Die Sprache die gewählt ist. Standart Englisch ('en'). Kann durch das Menü auch auf Deutsch ('de') gestellt werden.
let isFullscreen = false; // Wenn man in den Fullscreen geht = true; Wird für die Berechnung der Maus Position im Vollbild benötigt.
let leftKey, rightKey, jumpKey;
let loop; 
let currentLevel = []; // In dieses Array wird das aktuelle Level aus dem Multidimensional Array (level.js - levels[]) kopiert.
let spritesheet; // Hier wird nach der Charakter Auswahl das Spritesheet gespeichert um es später global abrufen zu können.

// globale Variablen für die Hintergrund-Musik und die Soundeffekte
let bgMusic; // Level-Hintergrund-Musik wird in helper.js - worldSetup() je nach Welt definiert.
let menuMusic = document.getElementById('menuMusic'); // Menü-Musik, wird abgespielt sobald man auf Spielen/Play drückt.
menuMusic.loop = true; // Dadurch läuft die Musik in Dauerschleife, auch wenn man längere Zeit im Menü verbringt.
let musicMuted = false; // Musik ist Standartmäßig an, kann aber stummgeschalten werden. => musicMuted = true
let soundMuted = false; // Das gleiche gilt für die Soundeffekte.


window.addEventListener('load', (e) => {
    // Wenn ein Spieler das erste mal auf die Seite kommt ist unlocked = null, dann wird im Local Storage des Browsers die Variable unlocked
    // auf 1 gesetzt. Das heißt die erste Welt ist freigeschalten.
    if (localStorage.getItem('unlocked') == null) {
        localStorage.setItem('unlocked', 1);
        unlocked = 1;
    } else if (localStorage.getItem('unlocked') > 0) {  // wenn der Spieler schon auf der Seite war dann wird hier aus dem LocalStorage gelesen
        unlocked = localStorage.getItem('unlocked');    // welche Welt schon Freigeschalten ist.
    }
    // Eventlistener um bei Tastendruck Musik oder Soundeffekte stummzuschalten.
    window.addEventListener('keypress', mute);

    // Hier wird das Main Menü gestartet.
    drawMenu();
    // Hier wird die Lautstärke der Menü Musik auf 50% gesetzt.
    menuMusic.volume = 0.5;

    // EventListener um den Canvas in Fullscreen anzuzeigen (F drücken um in den Vollbildschirm zu gehen. ESC um ihn zu beenden)
    window.addEventListener('keypress', fullscreen);
    /*  Ändert die Variable isFullscreen zu true oder false jenachdem ob man in den Fullscreen geht oder ihn beendet.
        Wird für das tracking der Maus im Vollbildmodus benötigt*/
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !isFullscreen;
    });
});
