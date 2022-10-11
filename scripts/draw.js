const canvas = document.getElementById('canvas'); // Canvas von index.html
/* weißt breite und höhe und context('2d') zu */
canvas.width = 1280;
canvas.height = 704;
const ctx = canvas.getContext('2d');

const paraCanvas = document.createElement('canvas'); // Erstellt Canvas Element für den Parallax Hintergrund.
/* weißt breite und höhe und context('2d') zu */
paraCanvas.width = 1280;
paraCanvas.height = 704;
const paraCtx = paraCanvas.getContext('2d');

const mapCanvas = document.createElement('canvas'); // Erstellt Canvas Element auf dem das Level/Map gezeichnet wird.
/* weißt breite und höhe und context('2d') zu */
mapCanvas.width = 10000;
mapCanvas.height = 704;
const mapCtx = mapCanvas.getContext('2d');

// Hintergrund Bilder Ebenen // die src wird in -> helper.js - worldSetup() gesetzt.
const bgLayer1 = new Image();
const bgLayer2 = new Image();
const bgLayer3 = new Image();
const bgLayer4 = new Image();
const bgTextLayer1 = new Image();
const bgTextLayer2 = new Image();
const levelLayer = new Image();

/* Funktion zum zeichnen der einzelnen Tiles an ihrer korrekten Position */
function drawTile(id, x, y) {
    mapCtx.drawImage(tileset, id * 32, 0, 32, 32, x * 32, y * 32, 32, 32);
}

/* Funktion zum zeichene des kompletten Levels */
function drawLevel(level) {
    mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height); // löscht alles was auf dem mapCanvas gezeichnet ist.
    let y = 0; // y-Position im Array (*32 = y-Position an der das Tile gezeichnet werden muss)
    level.forEach((row) => { // schleife die alles innerhalb einmal für jede Reihe ausführt.
        let x = 0; // x-Position im Array (*32 = x-Position an der das Tile gezeichnet werden muss)
        row.forEach((col) => { // schleife die alles innerhalb einmal für jede Spalte ausführt.
            drawTile(col, x, y); // zeichnet jede Spalte, also jedes Tile
            x++; // zählt hoch bis zur letzten Spalte
        });
        y++; // zählt hoch bis zur letzten Reihe
    });
}

function updateLevel(duration) {
    let speed; // geschwindigkeit mit der sich das Level bewegt
    let b = checkCollision(); // checkt die Kollision in collision.js
    if (leftKey && !b.left) { 
        // wenn man linke Taste drückt und links nichts blockiert dann bewegt sich das Level
        speed = -moveSpeed * duration; // gibt einen negativen wert somit verringert sich x
        levelX -= moveSpeed * duration; // für die Kollision
    } else if (rightKey && !b.right) { 
        // wenn man rechte Taste drückt und rechts nichts blockiert dann bewegt sich das Level
        speed = moveSpeed * duration; // gibt einen positiven wert somit erhöt sich x
        levelX += moveSpeed * duration; // für die Kollision
    } else {
        speed = 0; // ansonsten ist speed = 0 und somit bewegt sich das Level nicht
    }

    x = x + speed; // addiert auf die aktuelle x position die oben berechnete Geschwindigkeit

    // zeichnet alles was auf dem mapCanvas ist, also das Level, an die x-Position, die wir oben berechnet haben, auf den sichtbaren Canvas
    ctx.drawImage(mapCanvas, x, 0, 1280, 704, 0, 0, 1280, 704);
}
