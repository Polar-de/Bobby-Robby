let invincible = false; // während true kann der spieler keinen Schaden bekommen

// Function zum kontrollieren der Kollisionen.
function checkCollision() {
    // Object Blockierende Kollisions und die Katzenkeks Kollision / Größere Hitbox als die Schadens Hitbox
    let b = {};

    // Gibt die Y Position des Tiles über dem Spieler und unter dem Spieler.
    b.topTile = Math.floor(posY / 32);
    b.bottomTile = Math.floor((posY + 48) / 32);

    // Gibt das Teil das Oben Links und Oben Rechts am Spieler ist
    b.topLeft = currentLevel[Math.floor(posY / 32)][Math.floor((levelX - 5) / 32)];
    b.topRight = currentLevel[Math.floor(posY / 32)][Math.floor((levelX + 5) / 32)];

    // Gibt das Teil das genau in der Mitte des Spielers und Links und Rechts in der Mitte vom Spieler
    b.midLeft = currentLevel[Math.floor((posY + 24) / 32)][Math.floor((levelX - 12) / 32)];
    b.mid = currentLevel[Math.floor((posY + 24) / 32)][Math.floor(levelX / 32)];
    b.midRight = currentLevel[Math.floor((posY + 24) / 32)][Math.floor((levelX + 12) / 32)];

    // Gibt das Teil das Unten Links und Unten Rechts am Spieler ist. 
    // Wir ziehen hier ein Pixel ab, da der Spieler sonst immer Kontakt zum Boden hätte und sich nicht bewegen könnte
    b.bottomLeft = currentLevel[Math.floor((posY + 47) / 32)][Math.floor((levelX - 12) / 32)];
    b.bottomRight = currentLevel[Math.floor((posY + 47) / 32)][Math.floor((levelX + 12) / 32)];

    // Gibt das Teil ganz Unten Links und Unten Rechts am Spieler an.
    // Hier ziehen wir nichts ab, das ist nur dafür da um zu checken ob er den Boden berührt.
    b.groundLeft = currentLevel[Math.floor((posY + 48) / 32)][Math.floor((levelX - 5) / 32)];
    b.groundRight = currentLevel[Math.floor((posY + 48) / 32)][Math.floor((levelX + 5) / 32)];

    
    // Blockierende Tiles 1 bis 20 & 49 || Schadens Tiles 21 & 22 || nicht blockende Tiles 23 bis 40 & 45 bis 48 & 50 bis ... || Sammelbare Katzenkekse 41 bis 44

    /* Blockierende Kollision */

    // Berührt der Spieler den Boden?
    if ((b.groundLeft > 0 && b.groundLeft <= 20) || (b.groundRight > 0 && b.groundRight <= 20)) {
        b.ground = true;
    } else {
        b.ground = false;
    }
    
    // Blockiert ein Teil Links? 
    // Hätte man auch als eine if-Bedingung schreiben können aber fanden es so übersichtlicher
    if ((b.bottomLeft > 0 && b.bottomLeft <= 20) || b.bottomLeft == 49) {
        b.left = true;
    } else if ((b.midLeft > 0 && b.midLeft <= 20) || b.midLeft == 49) {
        b.left = true;
    } else if ((b.topLeft > 0 && b.topLeft <= 20) || b.topLeft == 49) {
        b.left = true;
    } else {
        b.left = false;
    }

    // Blockiert ein Teil Links?
    // Das selbe wie oben, ist übersichtlicher
    if ((b.bottomRight > 0 && b.bottomRight <= 20) || b.bottomRight == 49) {
        b.right = true;
    } else if ((b.midRight > 0 && b.midRight <= 20) || b.midRight == 49) {
        b.right = true;
    } else if ((b.topRight > 0 && b.topRight <= 20) || b.topRight == 49) {
        b.right = true;
    } else {
        b.right = false;
    }

    // Blockiert ein Teil Oben?
    if ((b.topLeft > 0 && b.topLeft <= 20) || b.topLeft == 49 || (b.topRight > 0 && b.topRight <= 20) || b.topRight == 49) {
        b.top = true;
    } else {
        b.top = false;
    }


    /* Katzenkekse Einsammeln */
    if (b.mid > 40 && b.mid < 45) {  // Prüft nach, ob sich die Kollision b.mid in einem Tile zwischen 41-44 befindet.
        mid = Math.floor(levelX / 32);
        coins++; // Fügt ein Katzenkeks dem Zähler hinzu, wenn er eingesammelt wird.
        switch (b.mid) {
            case 41:
                // Ersetzt Tile 41 mit Tile 0
                currentLevel[Math.floor((posY + 24) / 32)].splice(mid, 1, 0);
                break;
            case 42:
                // Ersetzt Tile 42 mit Tile 23
                currentLevel[Math.floor((posY + 24) / 32)].splice(mid, 1, 23);
                break;
            case 43:
                // Ersetzt Tile 43 mit Tile 32
                currentLevel[Math.floor((posY + 24) / 32)].splice(mid, 1, 32);
                break;
            case 44:
                // Ersetzt Tile 44 mit Tile 28
                currentLevel[Math.floor((posY + 24) / 32)].splice(mid, 1, 28);
            default:
                break;
        }
        // Nachdem der Katzenkeks eingesammelt und im Array ersetzt wurde, wird das Level neu zeichnen.
        drawLevel(currentLevel);
    }

    /* Schadens Kollision */
    let d = {}; // Object für Schadenshitbox -> kleiner als blockierende Hitbox

    // Kollision oben, Hitbox hat die selbe Höhe des Characters, aber eine kleinere Breite.
    // Unser Character ist 24px breit, die Hitbox nur 10px, also jeweils 5px von der Mitte nach links und rechts.
    d.topLeft = currentLevel[Math.floor(posY / 32)][Math.floor((levelX - 5) / 32)];
    d.topRight = currentLevel[Math.floor(posY / 32)][Math.floor((levelX + 5) / 32)];

    d.midLeft = currentLevel[Math.floor((posY + 24) / 32)][Math.floor((levelX - 5) / 32)];
    d.midRight = currentLevel[Math.floor((posY + 24) / 32)][Math.floor((levelX + 5) / 32)];

    d.bottomLeft = currentLevel[Math.floor((posY + 47) / 32)][Math.floor((levelX - 5) / 32)];
    d.bottomRight = currentLevel[Math.floor((posY + 47) / 32)][Math.floor((levelX + 5) / 32)];

    // Hier die unübersichtliche Variante der Kollisionsüberprüfung (vergleich übersichtliche Variante Zeile 44)
    if (
        (d.bottomLeft > 20 && d.bottomLeft < 23) ||
        (d.bottomLeft > 49 && d.bottomLeft < 52) ||
        (d.midLeft > 20 && d.midLeft < 23) ||
        (d.midLeft > 49 && d.midLeft < 52) ||
        (d.topLeft > 20 && d.topLeft < 23) ||
        (d.topLeft > 49 && d.topLeft < 52) ||
        (d.bottomRight > 20 && d.bottomRight < 23) ||
        (d.bottomRight > 49 && d.bottomRight < 52) ||
        (d.midRight > 20 && d.midRight < 23) ||
        (d.midRight > 49 && d.midRight < 52) ||
        (d.topRight > 20 && d.topRight < 23) ||
        (d.topRight > 49 && d.topRight < 52)
    ) {
        ctx.fillStyle = '#ff000020';
        ctx.fillRect(0, 0, 1280, 704);
        if (!invincible) damaged(); // wird ausgeführt wenn Spieler nicht invincible (unverwundbar) ist (invincible = false)
    }

    return b;
}

// Wird ausgeführt wenn man Schaden bekommt.
function damaged() {
    invincible = true; // Spieler kann keinen Schaden mehr bekommen.
    health--; // ein Leben wird abgezogen.
    randomDamageSound(); // zufälliger Schaden-Soundeffect wird abgespielt.
    // Timeout => Spieler ist nachdem er Schaden genommen hat 1000ms, also eine Sekunde unverwundbar, und kann solange keinen Schaden nehmen.
    setTimeout(() => {
        invincible = false;
    }, 1000);
}

// Spielt einen zufälligen Sound ab wenn der Spieler Schaden nimmt.
function randomDamageSound() {
    let rndNr = Math.round(Math.random() * 2); // gibt eine zufällige Zahl zwischen 0 und 2
    if (!soundMuted) { // wenn Soundeffekte nicht gemutet sind werden Sound 0, 1, oder 2 abgespielt, je nach Zufallszahl
    switch (rndNr) {
        case 0:
            new Audio('./audio/Auee.mp3').play();
            break;
        case 1:
            new Audio('./audio/Auu.mp3').play();
            break;
        case 2:
            new Audio('./audio/Ohh.mp3').play();
            break;
        default:
            break;
        }
    }
}
