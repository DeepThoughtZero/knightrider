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

        // After making a move (80 messages)
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
            "Galoppierender Wahnsinn! Und galoppierendes anderes Zeug! 🌀💨",
            // 40 neue Sprüche
            "*BOING* Wie ein Flummi! Ein Flummi mit Blähungen! 🏀💨",
            "Feld erobert! Territorium markiert! *stolzes Pupsen* 🚩💩",
            "Das war ein Bilderbuch-Sprung! Das Ende war ein Bilderbuch-Pups! 📖💨",
            "*hoppla* Beinahe wär was passiert! Also... MEHR passiert! 😅💨",
            "Zwei-eins! Zack! *brrrpt* Ups, Nachbeben! 📐💨",
            "Ich bin UNAUFHALTSAM! Wie meine Verdauung! 💪💩",
            "*elegant spring* Grazie! Eleganz! *PFFFT* ...Peinlichkeit! 🩰💨",
            "Felder fallen vor mir! Andere Dinge auch! 👑💨",
            "Noch einer drauf! *presst alles zusammen* Buchstäblich! 😬💩",
            "SPRUNG! LANDUNG! *EXPLOSION* ...Akustisch gemeint! 💥💨",
            "*hippity hoppity* Dieses Feld ist jetzt mein Property! 🏠💩",
            "Wie geschmiert! Leider auch woanders! 🛢️💨",
            "Der perfekte Zug! Der imperfekte Magen! ♟️😰",
            "*bounce* Federleicht! *prrt* Federleicht war das NICHT! 🪶💨",
            "Schritt für Schritt zum Ziel! Pups für Pups auch! 👣💨",
            "Ich tanze über das Brett! Mit gewissen... Nebengeräuschen! 💃💨",
            "*ZACK* Da bin ich! *PRRT* Da war noch was! ⚡💨",
            "Dieses Feld gehört GALOPPINO! Für immer! Riecht auch so! 👃💩",
            "Weiter gehts! Keine Zeit! Kein Halten! NIRGENDS! 🏃‍♂️💨",
            "*spring spring* Doppelt hält besser! *pff pff* Doppelt pupst auch! 💨💨",
            "Sieg auf ganzer Linie! Niederlage auf Bauch-Linie! 📏😰",
            "Der Ritter reitet! Der Ritter leidet! Aber WEITER! 🛡️💨",
            "*majestätisch spring* So macht man das! *peinlich pups* So eher nicht! 👑💨",
            "Feld Nummer WOW! Darm-Status: ALARM! 🚨😱",
            "Ein Held braucht Felder! Ein Held braucht auch ein WC! 🦸💩",
            "*geschmeidig hüpf* Wie eine Gazelle! Eine blähende Gazelle! 🦌💨",
            "Progress! Fortschritt! *BRUMM* ...auch hinten Fortschritt! 📈💨",
            "Das Brett zittert vor mir! Mein Bauch zittert vor dem Brett! 🌋😰",
            "*triumphaler Sprung* JA! *triumphaler Furz* ...weniger JA! 🎉💨",
            "Immer weiter! Niemals aufgeben! *verzweifelt klammern* NIEMALS! 💪😬",
            "Ich bin der MEISTER! Der Meister des... *PRRRT* ...egal! 🏆💨",
            "Feld besetzt! Feld bestinkt! Feld MEINS! 🏴‍☠️💩",
            "*professionell spring* Jahre des Trainings! *unprofessionell pups* Jahre des Essens! 🎓💨",
            "Ein Schritt näher! Ein Pups lauter! Das ist der Deal! 🤝💨",
            "*schwungvoll hüpf* Mit STIL! *peinlich entweich* Mit... weniger Stil! ✨💨",
            "Wie ein Uhrwerk! Tick-tack-PRRRT-tick-tack! ⏰💨",
            "Feldherrschaft AKTIVIERT! Darmherrschaft DEAKTIVIERT! 🎮😰",
            "*akrobatisch spring* Zirkusreif! *laut entweich* Manege frei! 🎪💨",
            "Der Weg zum WC führt über alle Felder! ALLE! 🗺️🚽",
            "*flink hüpf* Schnell wie der Wind! Riecht auch so! 🌬️💨"
        ],

        // When stuck (no valid moves) (30 messages with clever wordplay)
        stuck: [
            "💩 Sackgasse! Und mein Hintern kennt keine Sackgassen! 😱💨",
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

        // Partial win (40+ fields but not completed) - 15 messages
        partialWin: [
            "Okay, 40+ Felder! Das zählt! *erleichtertes Seufzen* 🎊💨",
            "Nicht perfekt, aber RESPEKTABEL! Jetzt aber zur Toilette! 🥈🚽",
            "Mehr als die Hälfte! Mein Darm ist beeindruckt! *grummel* 👏💩",
            "Fast geschafft! Aber 'fast' reicht für jetzt! AUFS KLO! 🏃‍♂️💨",
            "Gute Leistung! Kein Sieg, aber auch keine Schande! *stolzer Pups* 💨🎖️",
            "40+ Felder! Das ist mehr als mancher Ritter je schafft! 🛡️✨",
            "Teilsieg! Besser als Totalversagen! Ab zum WC! 🚽🎉",
            "Nicht alle Felder, aber genug für die Ehre! Und jetzt: ERLEICHTERUNG! 😅💩",
            "Beachtlich! Sir Galoppino ist ein bisschen stolz! *bescheidener Furz* 💨🥉",
            "Das war ordentlich! Ordentlicher als mein Darm gerade! 📊💩",
            "Kein perfekter Lauf, aber ein guter! *zufriedenes Grummeln* 🐴✅",
            "40+ ist das neue 58! Zumindest sage ich das jetzt! 😅🏆",
            "Halb gewonnen ist gar nicht verloren! Jetzt aber WC! 🚽🏃‍♂️",
            "Respektable Tour! Mein Hintern applaudiert! *klatsch* 👏💨",
            "Gut gemacht! Nicht perfekt, aber mein Magen verzeiht! 🎊😌"
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

        // Can't enter pond - explains why (10 messages)
        blockPond: [
            "NEIN! Da ist WASSER! Ich kann nicht schwimmen! *panisch* 🌊😱",
            "Ins Wasser?! Mit meiner Verdauung?! Das Ökosystem würde sterben! 🌊💀",
            "ICH HASSE WASSER! Pferde + Wasser = NEIN! 🐴🚫🌊",
            "Der Teich ist TABU! Außerdem: nasses Fell stinkt! 💧😤",
            "Da ist ein TEICH! Willst du mich ertränken?! 🌊😰",
            "Wasser? WASSER?! Ich bin ein Springer, keine Ente! 🦆🚫",
            "In den Teich?! Mein Ritter-Zertifikat erlaubt das nicht! 📜🌊",
            "Nass werden?! Dann klebt alles am Fell! ALLES! 💧😱💩",
            "Der Teich sieht tief aus! Zu tief für meine kurzen Beine! 🌊🦵",
            "Schwimmen macht Bauchweh! Mehr als ich SCHON habe! 🏊‍♂️😫"
        ],

        // Can't enter wolf territory - explains why (10 messages)
        blockWolf: [
            "DA IST EIN WOLF! Der frisst mich! MIT HAUT UND HAAREN! 🐺🍽️",
            "WOLF! Neee neee neee! Der beißt! DIE BEIßEN! 🐺🦷😭",
            "ZU DEM WOLF?! Hast du den Verstand verloren?! 🐺🤯",
            "Ein WOLF! Der riecht meine Angst! Und andere Sachen! 🐺👃💨",
            "Wölfe FRESSEN Pferde! Das steht in jedem Märchen! 🐺📖😱",
            "Ich geh nicht zum Wolf! Der macht aus mir HACKFLEISCH! 🐺🥩",
            "WOLF-TERRITORIUM! Lebensmüde bin ich noch nicht! 🐺☠️",
            "Sehe ich aus wie Rotkäppchen?! ZUM WOLF! Pah! 🐺👧🚫",
            "Der Wolf hat bestimmt Hunger! ICH bin nicht das Abendessen! 🐺🍴😰",
            "Bei dem Wolf?! Da verliere ich nicht nur meine Verdauung! 🐺💀💩"
        ],

        // Can't revisit field - explains why (10 messages)
        blockVisited: [
            "Da liegt schon ein PFERDEAPFEL! Zweimal drauftreten?! 💩🚫",
            "Das Feld hab ich schon markiert! *stolz* Mit DRINGLICHKEIT! 💩😅",
            "Da war ich schon! Die Spur ist noch... frisch! 💩💨",
            "Nochmal da hin?! Und in mein EIGENES Zeug treten?! 💩🦶😱",
            "Das stinkt schon genung von meinem letzten Besuch! 💩👃",
            "GEWESEN! ERLEDIGT! HINTERLASSEN! Weiter geht's! 💩✅",
            "Ich trete nicht in meine eigenen Hinterlassenschaften! 💩🚫🦶",
            "Da ist noch warm! Ich meine... äh... NEIN! 💩🔥😳",
            "Ein Ritter macht zweimal am selben Ort?! Skandal! 💩👑🚫",
            "Das Feld ist bereits... vollständig beschriftet! 💩📝"
        ],

        // Can't reach - not an L-shaped move (10 messages)
        blockNotL: [
            "Das ist kein L! Ich bin ein SPRINGER, kein Turm! ♞🚫",
            "L-Form! L! Wie LAUFENLASSEN! Nicht geradeaus! 🔷💨",
            "Springer hüpfen im L! Zwei-eins oder eins-zwei! NICHT diagonal! ♞📐",
            "Das kann ich nicht erreichen! Meine Beine sind L-förmig verbogen! 🦵🔀",
            "Ich springe L-förmig! Wie ein L! Ein ELL! ELLLLL! ♞😤",
            "Kennst du Schach?! Springer = L-Form! Immer! 📖♞",
            "Da kann ich nicht hin! Außer ich lerne fliegen! ✈️🐴",
            "Falsches Muster! L-Sprung heißt: Zwei Felder + Knick! 📐",
            "So funktionieren meine Hufe nicht! L-FORM, verstanden?! 🦶🔷",
            "Ich bin ein SPRINGER! Kein Läufer, kein Turm, kein Bauer! ♞💢"
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
