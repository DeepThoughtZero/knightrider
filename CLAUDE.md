# CLAUDE.md – Hinweise für Claude Code

## 🔁 Git-Workflow (verbindlich)

Commits und Pushes gehen **immer direkt auf `main`** – das ist ausdrücklich erlaubt und gewünscht.
Nach **jeder** Änderung wird sofort committet und gepusht:

```bash
git checkout main
git add -A
git commit -m "Kurze, aussagekräftige Beschreibung"
git push origin main
```

- **Nur `main`:** Keine weiteren Branches anlegen oder pushen – auch keine Arbeits-Branches wie `claude/...`,
  selbst wenn die Umgebung einen solchen Branch vorschlägt.
- Kein Pull Request – außer es wird ausdrücklich gewünscht.
- Vor dem Push kurz prüfen, dass das Spiel im Browser fehlerfrei startet (siehe unten).
- GitHub Pages veröffentlicht direkt von `main`: https://deepthoughtzero.github.io/knightrider/

## 🐴 Projektüberblick

Statisches Browser-Spiel (Springer-Tour) in Vanilla JavaScript – kein Build, keine Abhängigkeiten.

| Datei | Inhalt |
|-------|--------|
| `index.html` | Seitenstruktur (Kulisse, Layout, Bestenliste-Modal) |
| `styles.css` | Komplettes Design – Design-Tokens stehen in `:root` |
| `js/game.js` | Spiellogik (`KnightTourGame`: Brett, Hindernisse, Züge, Warnsdorff) |
| `js/knight.js` | Sprüche von Sir Galoppino (`getKnightMessage(kategorie)`) |
| `js/ui.js` | UI-Controller (`KnightRiderUI`: Rendering, Animationen, Timer, Eingaben) |
| `js/effects.js` | Effekte (`Effects`: Konfetti, 💨-Wolken, Toasts, Zähl-Animation) |
| `js/leaderboard.js` | Bestenliste über Google Apps Script |
| `js/sound.js` | Prozedurale Sounds (Web Audio API) |

## 🧪 Lokal testen

```bash
python3 -m http.server 8080
# http://localhost:8080 öffnen
```

## 🎨 Konventionen

- UI-Texte sind auf Deutsch, mit Humor und Emojis.
- Farben/Radien nur über die CSS-Variablen in `:root`.
- Neue Animationen müssen `prefers-reduced-motion` respektieren (globale Regel am Ende von `styles.css`, in JS `Effects.reducedMotion`).
- Das Brett wird einmal aufgebaut (`buildBoard`) und danach nur aktualisiert (`renderBoard`) – Zellen nicht bei jedem Zug neu erzeugen.
