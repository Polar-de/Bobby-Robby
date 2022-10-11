class Player {
    velocity = 400; // Sprungkraft
    gravity = 1000; 
    fall = 0; 
    grounded = false; // Steht der Spieler auf dem Boden?

    // Für animation
    interval = 0;
    spriteRow = 0;
    spriteFrame = 0;

    constructor() {
        this.width = 24;
        this.height = 48;
    }
    // Zeichnet den Spieler
    drawPlayer() {
        ctx.drawImage(spritesheet, this.spriteFrame * this.width, this.spriteRow * this.height, this.width, this.height, posX, posY, this.width, this.height);
    }

    update(duration) {
        this.move(duration);
        this.animate(duration);
        this.drawPlayer();
    }

    // Der Spieler bewegt sich nur auf der y-Achse, er ist immer in der Mitte der x-Achse
    // Somit hier nur Springen und fallen
    move(duration) {
        if (this.grounded) {
            // Springen
            if (jumpKey) {
                this.fall = -this.velocity;
                this.grounded = false;
                this.randomJumpSound();
            }
            let b = checkCollision();
            // Fallen
            if (!b.ground) {
                this.fall = this.gravity * duration;
                this.grounded = false;
            }
        } else {
            this.fall += this.gravity * duration;
            posY += this.fall * duration;
            let b = checkCollision();
            if (this.fall > 0 && b.ground) {
                posY = 32 * b.bottomTile - 48;
                this.fall = 0;
                this.grounded = true;
            }
            if (this.fall < 0 && b.top) {
                posY = 32 * b.topTile + 32;
                this.fall = 0;
            }
        }
    }

    // animiert den Spieler
    animate(duration) {
        this.interval += duration;
        if (this.interval > 0.1) {
            this.interval = 0;
            let b = checkCollision();
            // Reihe wird geändert
            if (leftKey) this.spriteRow = 3;    // links laufen
            if (rightKey) this.spriteRow = 2;   // rechts laufen
            if (!this.grounded) this.spriteRow = 4; // Springen ohne links oder rechts bewegung
            if (!this.grounded && leftKey) this.spriteRow = 5;  // Springen nach links
            if (!this.grounded && rightKey) this.spriteRow = 4; // Springen nach rechts
            if (!rightKey && !leftKey && this.grounded) this.spriteRow = 0; // Spieler bewegt sich nicht
            if (b.left || b.right) this.spriteRow = 0;

            // Animationen werden abgespielt
            if ((leftKey && this.grounded) || (rightKey && this.grounded)) {
                this.spriteFrame = ++this.spriteFrame % 7;
            } else if (!this.grounded) {
                this.spriteFrame = ++this.spriteFrame % 4;
            } else if (!rightKey && !leftKey && this.grounded) {
                this.spriteFrame = ++this.spriteFrame % 5;
            }
            if ((b.right && rightKey) || (b.left && leftKey)) {
                this.spriteFrame = ++this.spriteFrame % 5;
            }
        }
    }

    // Zufälliger Sound beim Springen wird abgespielt
    randomJumpSound() {
        let rndNr = Math.round(Math.random() * 2);
        if (soundMuted) {
        } else {
            switch (rndNr) {
                case 0:
                    new Audio('./audio/Ui.mp3').play();
                    break;
                case 1:
                    new Audio('./audio/Ho.mp3').play();
                    break;
                case 2:
                    new Audio('./audio/Up.mp3').play();
                    break;
                default:
                    break;
            }
        }
    }
}
