class Parallax {
    // img: Hintergrund Ebenen 1-4, speedMod: Geschwindigkeits Modifikator z.B. 1 währe die Geschwindigkeit des Spielers,
    // 0.5 währe halb so schnell wie der Spieler
    constructor(img, speedMod) {
        this.x = -640;
        this.y = 0;
        this.width = 3880;
        this.height = 704;
        // this.x2 = this.width;
        this.img = img;
        this.speedMod = speedMod;
        this.speed = moveSpeed * this.speedMod;
    }
    
    update(duration) {
        let b = checkCollision();
        // hintergrund bewegt sich, wenn spieler nach rechts oder links läuft und nichts blockiert
        if (leftKey && !b.left) {
            this.speed = moveSpeed * this.speedMod * 1 * duration;
        } else if (rightKey && !b.right) {
            this.speed = moveSpeed * this.speedMod * -1 * duration;
        } else {
            this.speed = 0;
        }

        this.x = this.x + this.speed;
        this.draw();
    }

    draw() {
        // Zeichnet die Hintergrund Ebene auf den Parallax Canvas
        paraCtx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
