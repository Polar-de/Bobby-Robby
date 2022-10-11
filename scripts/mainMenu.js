/* Bilder der verschiedenen Buttons */
const enBtn = document.getElementById('enBtn');
const enBtnHover = document.getElementById('enBtnHover');
const enSelected = document.getElementById('enSelected');
const deBtn = document.getElementById('deBtn');
const deBtnHover = document.getElementById('deBtnHover');
const deSelected = document.getElementById('deSelected');
const mainBtn = document.getElementById('mainBtn');
const mainBtnHover = document.getElementById('mainBtnHover');
const instructions = document.getElementById('instructions');
const anleitung = document.getElementById('anleitung');
const headline = document.getElementById('headline');

// Speichert alle buttons in einem Objekt um sie später einfacher zeichnen zu lassen.
function menuSetup() {
    let draw = {};

    ctx.fillStyle = '#DAAF88'
    draw.bg = () => {ctx.fillRect(0, 0, canvas.width, canvas.height)};

    draw.en = () => {ctx.drawImage(enBtn, 364, 477)};
    draw.enHover = () => {ctx.drawImage(enBtnHover, 340, 456)};
    draw.enSelected = () => {ctx.drawImage(enSelected, 359, 471)};

    draw.de = () => {ctx.drawImage(deBtn, 766, 477)};
    draw.deHover = () => {ctx.drawImage(deBtnHover, 741, 456)};
    draw.deSelected = () => {ctx.drawImage(deSelected, 762, 471)};

    draw.play = () => {ctx.drawImage(mainBtn, 486, 247)};
    draw.playEn = () => {ctx.fillStyle = '#ffffff',ctx.fillText('Play', 583, 293)};
    draw.playDe = () => {ctx.fillStyle = '#ffffff',ctx.fillText('Spielen', 539, 293)}
    draw.playHover = () => {ctx.drawImage(mainBtnHover, 486, 247)};

    draw.help = () => {ctx.drawImage(mainBtn, 486, 342)};
    draw.helpEn = () => {ctx.fillStyle = '#ffffff',ctx.fillText('Help', 581, 388)};
    draw.helpDe = () => {ctx.fillStyle = '#ffffff',ctx.fillText('Hilfe', 570, 388)}
    draw.helpHover = () => {ctx.drawImage(mainBtnHover, 486, 342)};

    draw.instructions = () => {ctx.drawImage(instructions, 140, 52)}
    draw.anleitung = () => {ctx.drawImage(anleitung, 140, 52)}

    draw.headline = () => {ctx.drawImage(headline, 260, 100)};

    return draw;
}

// Zeichnet das Hauptmenü 
function drawMenu() {
    let draw = menuSetup();
    ctx.font = '36px Dogica';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw.bg();  // Hintergrund
    draw.headline(); // Überschrift
    draw.play();    // Play-Spielen Button
    draw.help();    // Help-Hilfe Button
    // Zeichnet die Schrift der Buttons in der gwählten Sprache & die Sprachauswahl Buttons
    if (language == 'en') {
        draw.enSelected();
        draw.de();
        draw.playEn();
        draw.helpEn();
    } else if (language == 'de') {
        draw.en();
        draw.deSelected();
        draw.playDe();
        draw.helpDe();
    }
    // Zeichnet das Soundoverlay zum Stummschalten
    soundOverlay();
    // Eventlistener für hover über Button oder klick auf Button
    canvas.addEventListener('mousemove', menuHover);
    canvas.addEventListener('click', clickMenu);
}

// Handler für Maus Hover, je nach Position, also über welchem Button die Maus sich gerade befindet
function menuHover(e) {
    getMousePosition(e);
    let draw = menuSetup();
    if (mouseX >= 486 && mouseX <= 794 && mouseY >= 247 && mouseY <= 315) {
        // Maus über "Spielen" Button
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.bg();
        draw.headline();
        draw.playHover();
        draw.help();
        if (language == 'en') draw.enSelected(), draw.de(), draw.playEn(), draw.helpEn();
        if (language == 'de') draw.deSelected(), draw.en(), draw.playDe(), draw.helpDe();
        soundOverlay();
    } else if (mouseX >= 486 && mouseX <= 794 && mouseY >= 342 && mouseY <= 410) {
        // Maus über "Hilfe" Button
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.bg();
        draw.headline();
        draw.play();
        draw.helpHover();
        if (language == 'en') draw.enSelected(), draw.de(), draw.playEn(), draw.helpEn();
        if (language == 'de') draw.deSelected(), draw.en(), draw.playDe(), draw.helpDe();
        soundOverlay();
    } else if (mouseX >= 364 && mouseX <= 517 && mouseY >= 477 && mouseY <= 630) {
        // Maus über "Englisch" Button
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.bg();
        draw.headline();
        draw.play();
        draw.help();
        draw.enHover();
        if (language == 'en') draw.de(), draw.playEn(), draw.helpEn();
        if (language == 'de') draw.deSelected(), draw.playDe(), draw.helpDe();
        soundOverlay();
    } else if (mouseX >= 766 && mouseX <= 919 && mouseY >= 477 && mouseY <= 630) {
        // Maus über "Deutsch" Button
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.bg();
        draw.headline();
        draw.play();
        draw.help();
        draw.en();
        draw.deHover();
        if (language == 'en') draw.playEn(), draw.helpEn();
        if (language == 'de') draw.playDe(), draw.helpDe();
        soundOverlay();
    } else {
        // Falls Maus nicht über Button, Eventlistener entfernen und Hauptmenü neu zeichnen
        canvas.removeEventListener('mousemove', menuHover);
        canvas.removeEventListener('click', clickMenu);
        drawMenu();
    }
}

// Handler für click auf Button, je nach Button werden andere Funktionen ausgeführt
function clickMenu(e) {
    getMousePosition(e);
    let draw = menuSetup();
    if (mouseX >= 486 && mouseX <= 794 && mouseY >= 247 && mouseY <= 315) {
        // Klick auf den "Spielen" Button
        // Entfernt Eventlistener und startet Charakterauswahl & Menü Musik startet
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener('mousemove', menuHover);
        canvas.removeEventListener('click', clickMenu);
        characterSelect();
        menuMusic.play();
    } else if (mouseX >= 486 && mouseX <= 794 && mouseY >= 342 && mouseY <= 410) {
        // Klick auf den "Hilfe" Button
        // Entfernt Eventlistener und zeichnet die Anleitung, fügt Eventlistener hinzu um Anleitung zu schließen
        if (language == 'en') {
            canvas.removeEventListener('mousemove', menuHover);
            canvas.removeEventListener('click', clickMenu);
            draw.instructions();
            canvas.addEventListener('click', helpMenu);
        } else if (language == 'de') {
            canvas.removeEventListener('mousemove', menuHover);
            canvas.removeEventListener('click', clickMenu);
            draw.anleitung();
            canvas.addEventListener('click', helpMenu);
        }
    } else if (mouseX >= 364 && mouseX <= 517 && mouseY >= 477 && mouseY <= 630) {
        // Klick auf den "Englisch" Button => ändert Sprache auf Englisch
        language = 'en';
    } else if (mouseX >= 766 && mouseX <= 919 && mouseY >= 477 && mouseY <= 630) {
        // Klick auf den "Deutsch" Button => ändert Sprache auf Deutsch
        language = 'de';
    }
}

// Zum schließen der "Anleitung"
function helpMenu(e) {
    getMousePosition(e);
    if (mouseX >= 160 && mouseX <= 192 && mouseY >= 70 && mouseY <= 102) {
        canvas.removeEventListener('click', helpMenu);
        drawMenu();
    }
}

// Charakter Auswahl
function characterSelect() {
    // Bilder die für die Charakterauswahl benötigt werden
    let bobertaBobby = document.getElementById('bobertaBobby');
    let bobby = document.getElementById('bobby');
    let boberta = document.getElementById('boberta');
    let characterSelectEn = document.getElementById('characterSelectEn');
    let characterSelectDe = document.getElementById('characterSelectDe');

    // Zeichnet Charakter Auswahl
    canvas.style.background = '#f5a56c';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bobertaBobby, 350, 166);
    if (language == 'en') ctx.drawImage(characterSelectEn, 375, 70);
    if (language == 'de') ctx.drawImage(characterSelectDe, 350, 70);

    // Eventlistener für hover über Charakter oder klick auf Charakter
    canvas.addEventListener('mousemove', charHover);
    canvas.addEventListener('click', charClick);
}

// Handler für hover über einen Charakter in der Charakter Auswahl
function charHover(e) {
    getMousePosition(e);
    // Ändert die Bilder jenachdem über welchen Charakter gehovert wird
    if (mouseX >= 375 && mouseX <= 537 && mouseY >= 166 && mouseY <= 538) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(boberta, 350, 166);
        if (language == 'en') ctx.drawImage(characterSelectEn, 375, 70);
        if (language == 'de') ctx.drawImage(characterSelectDe, 350, 70);
    } else if (mouseX >= 699 && mouseX <= 861 && mouseY >= 166 && mouseY <= 538) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bobby, 350, 166);
        if (language == 'en') ctx.drawImage(characterSelectEn, 375, 70);
        if (language == 'de') ctx.drawImage(characterSelectDe, 350, 70);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bobertaBobby, 350, 166);
        if (language == 'en') ctx.drawImage(characterSelectEn, 375, 70);
        if (language == 'de') ctx.drawImage(characterSelectDe, 350, 70);
    }
}

// Handler für klick auf einen Charakter in der Charakter Auswahl
function charClick(e) {
    getMousePosition(e);
    // Klick auf Bobby setzt tileset auf Bobby und startet Küche,
    // Klick auf Boberta setzt tileset auf Boberta und startet Küche
    if (mouseX >= 375 && mouseX <= 537 && mouseY >= 166 && mouseY <= 538) {
        spritesheet = document.getElementById('spriteBoberta');
        canvas.removeEventListener('mousemove', charHover);
        canvas.removeEventListener('click', charClick);
        new Kitchen();
        canvas.style.background = '#000000';
    } else if (mouseX >= 699 && mouseX <= 861 && mouseY >= 166 && mouseY <= 538) {
        spritesheet = document.getElementById('spriteBobby');
        canvas.removeEventListener('mousemove', charHover);
        canvas.removeEventListener('click', charClick);
        new Kitchen();
        canvas.style.background = '#000000';
    } else {
    }
}
