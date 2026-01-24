/**
 * Knight Rider - Knight Character & Comments
 * The desperate knight with... digestive issues 💨
 */

const KNIGHT_CHARACTER = {
    emoji: '🐴',
    name: 'Sir Galoppino',

    // Status messages based on game state
    messages: {
        // Start of game
        start: [
            "Los geht's! *hüpf* Oh nein, war vielleicht keine gute Idee nach dem Bohneneintopf... 💨",
            "Auf in die Schlacht! ...Moment, wo ist hier die nächste Toilette?! 🚽",
            "Ich bin bereit! *grummel* ...Mein Magen leider auch. ZU bereit. 😰",
            "Endlich wieder hüpfen! *pffft* Ups, das war ich nicht! 💨",
            "Ein Ritter muss tun, was ein Ritter tun muss! ...Und ich muss DRINGEND! 🏃‍♂️💨"
        ],

        // After making a move
        move: [
            "*hüpf* Perfekt! Ein Pferdeapfel zurückgelassen! 💩",
            "So macht man das! *prrt* Entschuldigung, das passiert bei L-Sprüngen... 💨",
            "Noch ein Feld erobert! Mein Darm feiert mit! *grummel* 🎺",
            "Weiter, weiter! Bevor es zu spät ist! 😰",
            "*spring* Geschafft! Oh oh, das war knapp... 💦",
            "Ein Meisterzug! Fast so gut wie mein letzter Toilettenbesuch! 🏆",
            "*hops* Diese Bohnen waren DEFINITIV schlecht! 🫘💨",
            "Vorwärts! ...Rückwärts wäre gerade gefährlich! 🙈",
            "*galoppier* Jeder Schritt ein Abenteuer! *pffft* Jeder Pups auch! 💨",
            "Brillant! Wenn nur mein Bauch so kooperieren würde! 😫"
        ],

        // When stuck (no valid moves)
        stuck: [
            "Oh nein! Ich stecke fest! ...Genau wie meine Verdauung NICHT! 😱💨",
            "Eingesperrt! Jetzt hab ich vor Schreck in die Rüstung... nein, keine Details! 🙈",
            "Game Over! Wenigstens kann ich jetzt endlich zur Toilette! 🏃‍♂️🚽",
            "Festgefahren! Mein Darm kennt dieses Problem nicht... 💨💨💨",
            "NEIN! So endet kein Ritter! *pffft* ...So schon eher. 😅"
        ],

        // When winning
        win: [
            "GEWONNEN! 🎉 Jetzt aber schnell zum Klo! *galoppier* 🏃‍♂️💨",
            "SIEGREICH! Was für eine Erleichterung! ...Gleich noch eine andere Erleichterung! 🚽",
            "ICH BIN DER CHAMPION! *triumphierendes Pupsen* 🏆💨",
            "DAS GANZE BRETT! Mein Magen grummelt vor Stolz! ...Oder so ähnlich! 🎺",
            "VOLLENDET! Die Springer-Tour UND meine Verdauung! Beides historisch! 📜💩"
        ],

        // Idle / thinking
        idle: [
            "*tappel tappel* Denk nach, denk nach! *grummel* 🤔💨",
            "Hmm, wohin als nächstes? *blähbauch* ⏰",
            "Klick schon! Mein Darm wartet nicht ewig! 😰",
            "*ungeduldig* Los doch! Es DRÜCKT! 💩",
            "Die Uhr tickt! Andere Dinge auch! *pffft* ⏱️💨"
        ],

        // Near pond obstacle
        nearPond: [
            "Oh, ein Teich! Perfekt zum... NEIN, nehm' ich zurück! 🌊😳",
            "Wasser! Könnte ich gebrauchen nach diesem Bohnen-Debakel! 💧",
            "Ein Teich! Kurz reinspringen und... nein, besser nicht. 🙈"
        ],

        // Near wolf obstacle  
        nearWolf: [
            "Ein Wolf! Der riecht bestimmt meine... Angst! Ja, Angst! 🐺😅",
            "Wölfe! Die haben bessere Nasen, ich bleib lieber hier! 🐺💨",
            "Vorsicht Wolf! Obwohl, ICH bin hier die biologische Waffe! 💣"
        ],

        // Speedrun mode specific
        speedrun: [
            "SCHNELLER! Die Zeit rennt! Und ich muss rennen! ZUR TOILETTE! ⏱️🏃‍♂️",
            "60 Sekunden! Das schaff ich! Ob mein Darm 60 Sekunden schafft?! 😰",
            "Tempo! Tempo! *explosives Galloppieren* 💨💨💨",
            "Die Uhr läuft! Mein Darm auch! Irgendwie! 😱",
            "SPRINT-MODUS! *dramatisches Pupsen* 🎺💨"
        ],

        // Time running out
        timeWarning: [
            "Noch 10 Sekunden! PANIK! *panisches Pupsen* 😱💨",
            "Die Zeit! DIE ZEIT! Und das Essen von gestern! ALLES DRÄNGT! ⏰😫",
            "Beeil dich! Ich halte das nicht mehr lange aus! NICHTS davon! 💀"
        ]
    }
};

/**
 * Get a random message for the given category
 */
function getKnightMessage(category) {
    const messages = KNIGHT_CHARACTER.messages[category];
    if (!messages) return KNIGHT_CHARACTER.messages.idle[0];
    return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Get knight emoji with optional state
 */
function getKnightEmoji(state = 'normal') {
    const emojis = {
        normal: '🐴',
        moving: '🏇',
        thinking: '🤔🐴',
        panic: '😰🐴',
        win: '🎉🐴🏆',
        stuck: '😱🐴',
        fart: '🐴💨'
    };
    return emojis[state] || emojis.normal;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KNIGHT_CHARACTER, getKnightMessage, getKnightEmoji };
}
