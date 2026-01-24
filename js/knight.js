/**
 * Knight Rider - Knight Character & Comments
 * The desperate knight with... digestive issues 💨
 */

const KNIGHT_CHARACTER = {
    emoji: '🐴',
    name: 'Sir Galoppino',

    // Status messages based on game state
    messages: {
        // Start of game (25 messages)
        start: [
            "Los geht's! *hüpf* Oh nein, war vielleicht keine gute Idee nach dem Bohneneintopf... 💨",
            "Auf in die Schlacht! ...Moment, wo ist hier die nächste Toilette?! 🚽",
            "Ich bin bereit! *grummel* ...Mein Magen leider auch. ZU bereit. 😰",
            "Endlich wieder hüpfen! *pffft* Ups, das war ich nicht! 💨",
            "Ein Ritter muss tun, was ein Ritter tun muss! ...Und ich muss DRINGEND! 🏃‍♂️💨",
            "Möge die Tour beginnen! Und möge mein Darm durchhalten! 🙏",
            "Heute erobere ich das ganze Brett! Morgen die Toilette! 🏆🚽",
            "Welches Feld zuerst? Hauptsache nicht das mit dem Klo-Schild! Oh wait... 🤔",
            "Ein neues Abenteuer! Hoffentlich mit Toilettenpause! 🐴💨",
            "Bereit für die große Tour! *dramatisches Magengrummeln* 🎭",
            "Auf geht's, edles Ross! *pffft* ...das war mein Schlachtruf! 📯💨",
            "Ich fühle mich heute besonders... bewegungsfreudig. In jeder Hinsicht. 😬",
            "Wähle weise! Mein Magen wählt auch gerade... 🎯💩",
            "Die Legende beginnt! Mit einem leichten Druckgefühl... 📜😰",
            "Hufe sind poliert, Rüstung sitzt! Nur mein Bauch rebelliert! ⚔️💨",
            "Schach war gestern! Heute: ÜBERLEBEN! 🏇💨",
            "Ich bin Sir Galoppino! Ritter der Tafelrunde! ...Der Klo-Tafelrunde! 🛡️🚽",
            "Jedes große Epos beginnt mit einem ersten Schritt! Und einem ersten... naja! 📖💨",
            "Mögen meine Sprünge präzise sein! Und mein Bauch gnädig! 🎯🙏",
            "Ein Springer kennt kein Hindernis! Außer geschlossene Toiletten! 🚫🚽",
            "Heute werde ich Geschichte schreiben! Braune Geschichte! 📜💩",
            "Mein Herz sagt JA! Mein Darm sagt JETZT! ❤️💨",
            "Ruhm und Ehre warten! Und ein stilles Örtchen hoffentlich auch! 🏆",
            "Die Felder zittern vor mir! Oder ist das mein Bauch? 🤔",
            "Galoppino ist bereit! *unterdrücktes Pupsen* FAST bereit! 😅💨"
        ],

        // After making a move (40 messages)
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
            "Brillant! Wenn nur mein Bauch so kooperieren würde! 😫",
            "L wie LEGENDE! Und wie LAXATIV! 🐴💨",
            "*spring* Eleganter Sprung! Weniger elegantes Geräusch hinten! 🎭💨",
            "Weiter so! Mein Darm applaudiert! Mit Tönen! 👏💨",
            "Felderoberung +1! Darmkontrolle -1! 📊😰",
            "*hüpf hüpf* Oh, das Hüpfen hilft nicht gerade... 😱💨",
            "Der Springer springt! Der Darm drückt! Das Leben ist hart! 🐴",
            "Wunderschön! *PFFFT* ...das Ende weniger! 🎨💨",
            "Jedes Feld bringt mich der Rettung näher! Der Rettung meines WCs! 🚽",
            "L-Sprung perfektioniert! L-oslass-Kontrolle... nicht so sehr! 😅💨",
            "NÄCHSTES! *panisches Galoppieren* 🏃‍♂️💨",
            "Markiert! Erledigt! *unterdrücktes Stöhnen* Fast erledigt! 😬",
            "*spring* Ich bin ein Profi! *pffft* In beidem! 🏆💨",
            "Nummer {X}! Mein Rekord ist 58! Mein Darm sagt: SCHNELLER! 📈",
            "Das Schachbrett gehorcht mir! Mein Verdauungstrakt weniger! 👑",
            "So weit so gut! *GRUMMEL* ...oder auch nicht! 😨",
            "Ein Feld nach dem anderen! Ein Pups nach dem anderen! 🐴💨",
            "Galoppino macht Fortschritt! *explosives Herumsquirmen* 🏇💨",
            "Ha! Dieses Feld nie wieder! *hinterlässt Spur* 💩",
            "Strategie + Verzweiflung = ERFOLG! 🧠😰",
            "Der Weg des Springers ist nicht der gerade! Wie mein Darm! 🔀💨",
            "*hüpf* Ich liebe meinen Job! *pffft* Meistens! 💕💨",
            "TEMPO! TEMPO! *panisches inneres Rumoren* ⏩",
            "Noch viele Felder! Wenig Zeit! Noch weniger Darmkontrolle! ⏱️😱",
            "Die Tour geht weiter! Und was anderes auch! *pffft* 🐴💨",
            "Historischer Zug! In mehrfacher Hinsicht! 📜💩",
            "So hüpft ein Meister! *PRRT* ...So pupst einer auch! 😅💨",
            "YEEHAW! *sofortiges Unbehagen* 🤠😰",
            "Und wieder einer! *verzweifelte Bauchklammer* 😫",
            "*spring* Mein Motto: Erst springen, dann... naja! 🎯💨",
            "Galoppierender Wahnsinn! Und galoppierendes anderes Zeug! 🌀💨"
        ],

        // When stuck (no valid moves) (30 messages with clever wordplay)
        stuck: [
            "💩 Eingeklemmt! Jetzt sitzt nicht nur SIR fest... 😅",
            "Oh nein! Ich stecke fest! ...Genau wie meine Verdauung NICHT! 😱💨",
            "Eingesperrt! Jetzt hab ich vor Schreck in die Rüstung... nein, keine Details! 🙈",
            "Game Over! Wenigstens kann ich jetzt endlich zur Toilette! 🏃‍♂️🚽",
            "Festgefahren! Mein Darm kennt dieses Problem nicht... 💨💨💨",
            "NEIN! So endet kein Ritter! *pffft* ...So schon eher. 😅",
            "Blockiert! Auf dem Brett ja, woanders ÜBERHAUPT NICHT! 🚫💩",
            "Kein Ausweg mehr! Außer der eine... zum WC! 🚽💨",
            "Die Tour endet hier! Etwas anderes endet NICHT hier! *panik* 😰",
            "Festgesteckt! Wenn doch nur ALLES so feststecken würde! 😬💨",
            "So nah am Ziel! Und SO NAH am... anderen Ziel! 😨🚽",
            "Game Over, Mann! GAME OVER! *unkontrollierter Darmausgang* 💀💨",
            "Sackgasse! Für mich ja, für meinen Darm: AUTOBAHN! 🛣️💩",
            "Keine Züge mehr! Nur noch EINE Bewegung ist jetzt wichtig! 🏃‍♂️💩",
            "Eingezwängt! Ich kenne das Gefühl... von innen! 😫💨",
            "Die Springer-Tour ist vorbei! Die andere Tour beginnt! 🚽🏃‍♂️",
            "Festsitzen ist blöd! Außer auf der Toilette! Dort wär's toll! 😰🚽",
            "Hier geht nichts mehr! DORT schon! *zeigt aufgeregt zum WC* 👆💩",
            "Blockade! Hätte ICH doch mal eine! Eine ANDERE! 😭💨",
            "Klemme! Der Springer klemmt! Galoppino NICHT! 😱💩",
            "Eingesperrt wie ein... wie ein... EGAL, WO IST DAS KLO?! 🚪🚽",
            "Stillstand auf dem Brett! Kein Stillstand im Gedärm! 📊💨",
            "Stau! Verkehrsstau hier, Verdauungsfluss dort! 🚗💩",
            "Gefangen! Wäre mein Essen auch mal so gefangen! 😤💨",
            "Ausweglos! Anders als mein Mittagessen gestern! 🍲💩",
            "Pattsituation! Für den Springer! Nicht für Sir Darmino! 😰",
            "Schachmatt! Für das Spiel! Mein Hintern spielt weiter! 💨♟️",
            "Ende Gelände! Anfang WC-Sprinter! 🏁🏃‍♂️🚽",
            "Nichts geht mehr! Außer RAUS! ALLES RAUS! 😱💩💩💩",
            "Die Legende endet! Die Legende vom... Klomann beginnt! 📜🚽"
        ],

        // When winning (15 messages)
        win: [
            "GEWONNEN! 🎉 Jetzt aber schnell zum Klo! *galoppier* 🏃‍♂️💨",
            "SIEGREICH! Was für eine Erleichterung! ...Gleich noch eine andere Erleichterung! 🚽",
            "ICH BIN DER CHAMPION! *triumphierendes Pupsen* 🏆💨",
            "DAS GANZE BRETT! Mein Magen grummelt vor Stolz! ...Oder so ähnlich! 🎺",
            "VOLLENDET! Die Springer-Tour UND meine Verdauung! Beides historisch! 📜💩",
            "ALLE 58 FELDER! Jetzt 58 Sekunden bis zur Toilette! 🏃‍♂️⏱️",
            "PERFEKTION! *Siegespups* 💨🏆💨",
            "Ich bin eine LEGENDE! Eine Legende mit Verdauungsproblemen! 👑💨",
            "GESCHAFFT! *kollabiert vor dem WC* 🚽🎉",
            "Sir Galoppino, Meister der Felder! Und bald Meister des WCs! 🐴🏆",
            "UNBESIEGBAR! Außer von Bohnen! 🫘💨",
            "DER SPRINGER HAT GESIEGT! *stürmischer Darm feiert mit* 🎺💩",
            "100% TOUR! 100% DRUCK! 100% ERLEICHTERT! 📈🚽",
            "Alle Felder besucht! Zeit für einen anderen wichtigen Besuch! 🚪💨",
            "WELTREKORD! In beiden Kategorien! 🌍🏆💩"
        ],

        // Idle / thinking (20 messages)
        idle: [
            "*tappel tappel* Denk nach, denk nach! *grummel* 🤔💨",
            "Hmm, wohin als nächstes? *blähbauch* ⏰",
            "Klick schon! Mein Darm wartet nicht ewig! 😰",
            "*ungeduldig* Los doch! Es DRÜCKT! 💩",
            "Die Uhr tickt! Andere Dinge auch! *pffft* ⏱️💨",
            "*nervöses Wiehern* Beeil dich! BEEIL DICH! 🐴😰",
            "Jede Sekunde zählt! Besonders für meinen Bauch! ⏳💨",
            "*Hufscharren* Ich kann nicht ewig warten! Buchstäblich! 😬",
            "Entscheidung bitte! Mein Verdauungstrakt hat schon entschieden! 🎯💩",
            "*unruhiges Traben* Los, los, LOS! 🏃‍♂️💨",
            "Mein Instinkt sagt LINKS! Mein Darm sagt KLOO! 🧭🚽",
            "Tick tack! *bauch-grummel* TICK TACK! ⏰😰",
            "Ich warte... ungeduldig... sehr ungeduldig... 😤💨",
            "*wippt von Huf zu Huf* Das Wippen ist aus anderen Gründen! 🐴😬",
            "Hmm... *presst Pobacken zusammen* ...Schneller wäre gut! 😅",
            "Philosophische Frage: Wenn ein Springer im Wald pupst... 🌲💨",
            "Noch am Überlegen? ICH NICHT! Mein Körper hat Pläne! 😱",
            "*angespanntes Warten* In mehrfacher Hinsicht angespannt! 😰",
            "Ein kluger Zug braucht Zeit! Mein Darm hat keine! ⏳💩",
            "Denkpause! *angespanntes inneres Rumoren* 🤔💨"
        ],

        // Near pond obstacle (10 messages)
        nearPond: [
            "Oh, ein Teich! Perfekt zum... NEIN, nehm' ich zurück! 🌊😳",
            "Wasser! Könnte ich gebrauchen nach diesem Bohnen-Debakel! 💧",
            "Ein Teich! Kurz reinspringen und... nein, besser nicht. 🙈",
            "Wasser, Wasser! Nicht das was ICH gerade brauche! 🌊😰",
            "Oh, ein See! Wenn ich dort reinmache... neee. 💧🙈",
            "Schöner Teich! Hoffentlich muss niemand hinein... 🌊💨",
            "Wasser beruhigt ja normalerweise... NICHT HELFEN! 😱🌊",
            "Ein Frosch! Oh, ich beneide seinen einfachen Verdauungstrakt! 🐸💨",
            "Gluckerndes Wasser! Gluckernder Magen! Passt! 🌊😬",
            "Der Teich erinnert mich an... STOP! NICHT DRAN DENKEN! 💧😰"
        ],

        // Near wolf obstacle (10 messages)
        nearWolf: [
            "Ein Wolf! Der riecht bestimmt meine... Angst! Ja, Angst! 🐺😅",
            "Wölfe! Die haben bessere Nasen, ich bleib lieber hier! 🐺💨",
            "Vorsicht Wolf! Obwohl, ICH bin hier die biologische Waffe! 💣",
            "Ein Wolf! Wenn der mich jagt, pupse ich ihn nieder! 🐺💨",
            "Böser Wolf! Aber auch ICH kann böse Überraschungen! 😈💩",
            "Der Wolf heult! Vor meinem Geruch oder vor Angst? 🐺🌙💨",
            "Wölfe meiden mich normalerweise! Aus gutem Grund! 💨😅",
            "Knurrender Wolf! Knurrender Magen! Wer gewinnt? 🐺🆚😰",
            "Wölfe sind Raubtiere! Ich bin... Geruchstier! 🐺💨",
            "Gefährliche Bestie! Aber mein Hintern ist gefährlicher! 💣🐺"
        ],

        // Speedrun mode specific (15 messages)
        speedrun: [
            "SCHNELLER! Die Zeit rennt! Und ich muss rennen! ZUR TOILETTE! ⏱️🏃‍♂️",
            "60 Sekunden! Das schaff ich! Ob mein Darm 60 Sekunden schafft?! 😰",
            "Tempo! Tempo! *explosives Galoppieren* 💨💨💨",
            "Die Uhr läuft! Mein Darm auch! Irgendwie! 😱",
            "SPRINT-MODUS! *dramatisches Pupsen* 🎺💨",
            "60 SEKUNDEN! EINE MINUTE! 60.000 MILLISEKUNDEN DES DRUCKS! ⏱️😱",
            "Zeit + Darm = PANIK! Die Formel des Tages! 📐😰💨",
            "SPEED! SPEED! SPEEEEED! *pfffffrt* 🏎️💨",
            "Rekordversuch! In Schnelligkeit UND Lautstärke! 🏆📢💨",
            "Jede Sekunde zählt! Jedes Grummeln auch! ⏳😬",
            "SCHNELL WIE DER WIND! Im doppelten Sinne! 💨🌪️",
            "Die Uhr ist mein Feind! Mein Darm auch! 😰⏱️",
            "Tick-tack-PFFFT-tick-tack-PRRRT! ⏰💨",
            "60 Sekunden zwischen mir und Ruhm! Und mir und dem WC! 🏆🚽",
            "ZEITMODUS AKTIVIERT! *Bauch aktiviert sich auch* ⚡💨"
        ],

        // Time running out (10 messages)
        timeWarning: [
            "Noch 10 Sekunden! PANIK! *panisches Pupsen* 😱💨",
            "Die Zeit! DIE ZEIT! Und das Essen von gestern! ALLES DRÄNGT! ⏰😫",
            "Beeil dich! Ich halte das nicht mehr lange aus! NICHTS davon! 💀",
            "ZEHN! NEUN! ACHT! *SIEBEN PUPSE* 🔢💨",
            "DIE UHR! DER DARM! ALLES EXPLODIERT GLEICH! ⏰💣",
            "LETZTE SEKUNDEN! LETZTER HALT! 😱🏃‍♂️💨",
            "NICHT GENUG ZEIT! FÜR BEIDES NICHT! ⏱️🚽😰",
            "PANIK-MODUS! *alles verkrampft sich* 😵💨",
            "5...4...3... *Schweißausbruch* ...2...1... 💦😰",
            "ES WIRD KNAPP! ALLES WIRD KNAPP! ZEIT! KONTROLLE! ALLES! ⏰💩😱"
        ],

        // Random fart commentary (15 bonus messages for random interjections)
        fart: [
            "*PFFFT* Das war der Wind! Ritterehre! 💨🤥",
            "*prrrrt* Entschuldigung! Das Pferd war's! ...Ich bin das Pferd! 🐴💨",
            "*leises Zischen* War nichts! Gar nichts! Weitermachen! 😅",
            "*BRUMMM* Donner! Ja! Gewitter! Von hinten! ⛈️💨",
            "*pff pff pff* Morse-Code! S-O-S! 📡💨",
            "*PFFFFFT* Der Schlachtruf des Sir Galoppino! 📯💨",
            "*brrt* Die Trompeten von Jericho! Aus... anderem Ort! 🎺💩",
            "*plop* Hoppla! Da ist was entkommen! 🙈💨",
            "*PRRRRT* Akustische Kriegsführung! 🔊💨",
            "*zisch* Das Dampfablassen! Buchstäblich! ♨️",
            "*BRAP* Ritterliche Kommunikation! 👑💨",
            "*ffft* Klein aber fein! ...Oder nicht fein! 😬💨",
            "*BÖLLER* Feuerwerk! Aus... yeah. 🎆💩",
            "*tröööt* Die Fanfaren! Des Hinterteils! 🎺🍑💨",
            "*pfrrrrt* Applaus! Für mich selbst! Von mir selbst! 👏💨"
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
