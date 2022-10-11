class Kitchen {
    // Bilder der Küche und der Glow-Hover-Effekte
    imgKitchen = document.getElementById('kitchen');
    imgGlowWindow = document.getElementById('glowWindow');
    imgGlowRefrigerator = document.getElementById('glowRefrigerator');
    imgGlowOven = document.getElementById('glowOven');
    imgGlowHood = document.getElementById('glowHood');

    // Bilder der Buttons
    backBtnEN = document.getElementById('backBtnEN');
    backBtnDE = document.getElementById('backBtnDE');
    backBtnENHover = document.getElementById('backBtnENHover');
    backBtnDEHover = document.getElementById('backBtnDEHover');

    // Bilder der Schlösser
    imgLocked = document.getElementById('locked');
    imgUnlocked = document.getElementById('unlocked');

    // Positionen der x und y positionen der Schlösser
    lockWindowX = 265;
    lockWindowY = 188;
    lockRefX = 1121;
    lockRefY = 300;
    lockOvenX = 550;
    lockOvenY = 440;
    lockHoodX = 550;
    lockHoodY = 102;
    backBtnX = 490;
    backBtnY = 600;

    constructor() {
        menuMusic.pause();
        menuMusic.play();
        this.drawKitchen();
    }

    // Zeichnet die Küche und fügt Eventlistener für hover und klick hinzu
    drawKitchen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.imgKitchen, 0, 0);   // zeichnet die Küche
        this.drawLocks();   // zeichnet die Schlösser
        this.drawBtn();     // zeichnet die Buttons
        soundOverlay();     // zeichnet das SoundOverlay

        this.hover = this.hoverHandler.bind(this);
        canvas.addEventListener('mousemove', this.hover);

        this.click = this.clickHandler.bind(this);
        canvas.addEventListener('click', this.click);
    }

    // Handler für Hover über die Welten (Küchen-Gegenstände)
    hoverHandler(e) {
        getMousePosition(e);
        ctx.drawImage(this.imgKitchen, 0, 0);
        this.drawLocks();
        this.drawBtn();
        soundOverlay();

        // Wenn Maus über Gegenstand, zeichnet Glow über den Gegenstand
        if (mouseX >= 140 && mouseX <= 370 && mouseY >= 44 && mouseY <= 300) {
            // Fenster
            ctx.drawImage(this.imgGlowWindow, 0, 0);
        } else if (mouseX >= 1040 && mouseX <= 1280 && mouseY >= 60 && mouseY <= 555) {
            // Kühlschrank
            ctx.drawImage(this.imgGlowRefrigerator, 0, 0);
        } else if (mouseX >= 450 && mouseX <= 715 && mouseY >= 335 && mouseY <= 555) {
            // Ofen
            ctx.drawImage(this.imgGlowOven, 0, 0);
        } else if (mouseX >= 460 && mouseX <= 695 && mouseY >= 0 && mouseY <= 210) {
            // Dunstabzugshaube
            ctx.drawImage(this.imgGlowHood, 0, 0);
        } else if (mouseX >= this.backBtnX && mouseX <= this.backBtnX + 300 && mouseY >= this.backBtnY && this.backBtnY + 60) {
            if (language == 'en') ctx.drawImage(this.backBtnENHover, this.backBtnX, this.backBtnY);
            if (language == 'de') ctx.drawImage(this.backBtnDEHover, this.backBtnX, this.backBtnY);
        } else {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            this.drawKitchen();
        }
    }

    // Handler für klick auf eine Welt (Küchen-Gegenstand)
    clickHandler(e) {
        getMousePosition(e);

        // Wenn klick auf eine Welt und diese freigeschaltet ist, startet es diese Welt Level 1
        if (mouseX >= 140 && mouseX <= 370 && mouseY >= 44 && mouseY <= 300 && unlocked >= 1) {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            // Fenster
            if (unlocked >= 1) {
                world = 1;
                level = 1;
                startLevel();
            }
        } else if (mouseX >= 1040 && mouseX <= 1280 && mouseY >= 60 && mouseY <= 555 && unlocked >= 2) {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            // Kühlschrank
            world = 2;
            level = 1;
            startLevel();
        } else if (mouseX >= 450 && mouseX <= 715 && mouseY >= 335 && mouseY <= 555 && unlocked >= 3) {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            // Ofen
            world = 3;
            level = 1;
            startLevel();
        } else if (mouseX >= 460 && mouseX <= 695 && mouseY >= 0 && mouseY <= 210 && unlocked >= 4) {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            // Dunstabzughaube
            world = 4;
            level = 1;
            startLevel();
        } else if (mouseX >= this.backBtnX && mouseX <= this.backBtnX + 300 && mouseY >= this.backBtnY && this.backBtnY + 60) {
            canvas.removeEventListener('mousemove', this.hover);
            canvas.removeEventListener('click', this.click);
            drawMenu();
        }
    }

    // Zeichnet die Schlösser jenachdem welche Welt freigeschalten ist.
    drawLocks() {
        ctx.drawImage(this.imgUnlocked, this.lockWindowX, this.lockWindowY);
        if (unlocked == 1) {
            ctx.drawImage(this.imgLocked, this.lockRefX, this.lockRefY);
            ctx.drawImage(this.imgLocked, this.lockOvenX, this.lockOvenY);
            ctx.drawImage(this.imgLocked, this.lockHoodX, this.lockHoodY);
        } else if (unlocked == 2) {
            ctx.drawImage(this.imgUnlocked, this.lockRefX, this.lockRefY);
            ctx.drawImage(this.imgLocked, this.lockOvenX, this.lockOvenY);
            ctx.drawImage(this.imgLocked, this.lockHoodX, this.lockHoodY);
        } else if (unlocked == 3) {
            ctx.drawImage(this.imgUnlocked, this.lockRefX, this.lockRefY);
            ctx.drawImage(this.imgUnlocked, this.lockOvenX, this.lockOvenY);
            ctx.drawImage(this.imgLocked, this.lockHoodX, this.lockHoodY);
        } else if (unlocked == 4) {
            ctx.drawImage(this.imgUnlocked, this.lockRefX, this.lockRefY);
            ctx.drawImage(this.imgUnlocked, this.lockOvenX, this.lockOvenY);
            ctx.drawImage(this.imgUnlocked, this.lockHoodX, this.lockHoodY);
        }
    }

    // zeichet die Buttons um zurück zum Menü zu kommen
    drawBtn() {
        if (language == 'en') ctx.drawImage(this.backBtnEN, this.backBtnX, this.backBtnY);
        if (language == 'de') ctx.drawImage(this.backBtnDE, this.backBtnX, this.backBtnY);
    }
}
