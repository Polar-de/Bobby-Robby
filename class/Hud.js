class Hud {
    // Bilder für Katzenkekse und Herzen
    imgCoin = new Image();
    imgHeart = new Image();
    // Interval für die Zeitmessung und ...Frame welche position zum Zeitpunkt im spritesheet angezeigt wird
    interval = 0;
    coinFrame = 0;
    heartFrame = 0;
    
    InGameMenuEn = document.getElementById('InGameMenuEn');
    InGameMenuDe = document.getElementById('InGameMenuDe');

    constructor() {
        // quelle für bilder/spritesheets
        this.imgCoin.src = './img/powerhud/coins_animate.png';
        this.imgHeart.src = './img/powerhud/heart_heart.png';
    }

    update(duration) {
        this.coinAnimation(duration);
        this.drawHud();
        this.health();
    }

    
    coinAnimation(duration) {
        this.interval += duration;
        if (this.interval > 0.05) {
            this.interval = 0;
            this.coinFrame = ++this.coinFrame % 31; // modulo 31, weil das spritesheet aus 31 tiles besteht
        }
    }

    // 
    drawHud() {
        // Coinanimation
        ctx.drawImage(this.imgCoin, this.coinFrame * 32, 0, 32, 32, 10, 10, 48, 48); //Größen- und Positionsangaben

        // Zeigt an wie viele Coins man hat
        ctx.font = '24px Dogica';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(coins, 55, 48);
        ctx.strokeStyle = '#000000';
        ctx.strokeText(coins, 55, 48);
        
        // Hilfeoverlay in der gewählten Sprache
        if (language == 'en') ctx.drawImage(InGameMenuEn, 405, 16);
        if (language == 'de') ctx.drawImage(InGameMenuDe, 419, 16);
    }

    health() {
        // wenn x = 0, dann herz ausgefüllt | wenn x = 32, dann herz nicht ausgefüllt
        if (health == 3) {
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 64, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 128, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 192, 10, 48, 48);
        } else if (health == 2) {
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 64, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 128, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 192, 10, 48, 48);
        } else if (health == 1) {
            ctx.drawImage(this.imgHeart, 0, 0, 32, 32, canvas.width - 64, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 128, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 192, 10, 48, 48);
        } else if (health == 0) {
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 64, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 128, 10, 48, 48);
            ctx.drawImage(this.imgHeart, 32, 0, 32, 32, canvas.width - 192, 10, 48, 48);
        }
    }
}
