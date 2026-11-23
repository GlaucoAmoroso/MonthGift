# Cuore 3D & Widget iPhone — Glauco & Yuliia ♥

Tutto il necessario per far vedere a Yuliia i vostri cuori 3D sull’iPhone (con rotazione 360° per leggere **`three good ♥`** sul retro, contatore automatico dei mesi/giorni e widget sulla Schermata Home!).

## Contenuto della cartella `app/`
- `index.html` — Mini app 3D interattiva (PWA per iPhone) con rotazione touch, bottone *Gira sul retro*, contatore mesi/giorni e timeline dei cuori.
- `hearts.json` — Elenco dei cuori mese per mese (qui aggiungi ogni mese il nuovo cuore!).
- `models/month-02.glb` — Modello 3D del cuore del 2° mese esportato da Rhino.
- `previews/month-02.png` — Anteprima trasparente ad alta qualità per il widget iPhone.
- `icons/apple-touch-icon.png` — Icona a cuore per la Schermata Home dell’iPhone.
- `widget-iphone-scriptable.js` — Codice del widget nativo per iPhone (tramite l’app gratuita **Scriptable**).

---

## Passo 1 — Metti online la cartella `app/` (30 secondi, gratis)
Il modo più veloce:
1. Vai su **[app.netlify.com/drop](https://app.netlify.com/drop)** (o usa GitHub Pages).
2. Trascina dentro l’intera cartella `app/`.
3. Netlify ti darà subito un link tipo `https://cuore-glauco-yuliia.netlify.app` (puoi rinominarlo gratis nelle impostazioni del sito!).

---

## Passo 2 — Aggiungi l’app 3D sull’iPhone di Yuliia
1. Apri il link su **Safari** sul suo iPhone.
2. Tocca il tasto **Condividi** (quadrato con freccia in su) → **Aggiungi alla schermata Home**.
3. Avrà l’icona del cuore direttamente sulla Home: aprendola vedrà il cuore 3D a schermo intero, potrà girarlo con il dito e leggere *three good ♥* sul retro!

---

## Passo 3 — Aggiungi il Widget sulla Schermata Home dell’iPhone
1. Scarica l’app gratuita **Scriptable** dall’App Store sull’iPhone di Yuliia.
2. Apri Scriptable → tocca **`+`** in alto a destra.
3. Incolla il contenuto di `widget-iphone-scriptable.js` e sostituisci `BASE_URL` alla riga 9 con il tuo link Netlify/GitHub Pages (senza `/` finale).
4. Torna sulla Schermata Home dell’iPhone → tieni premuto sullo sfondo → **`+`** → cerca **Scriptable** → scegli **Piccolo** o **Medio** → aggiungilo.
5. Tieni premuto sul widget → **Modifica widget** → in *Script* seleziona lo script appena salvato.

Fatto! Ora il widget mostra il cuore del mese corrente + i mesi/giorni insieme, e **toccandolo si apre subito il cuore 3D interattivo**.

---

## Come mandarle un nuovo cuore ogni mese (il 22!)
1. Esporta il nuovo cuore 3D in `models/month-03.glb` e la sua anteprima in `previews/month-03.png`.
2. Apri `hearts.json` e aggiungi un nuovo blocco dentro `"hearts": [ ... ]` (cambiando colore, data e dedica, es. oro rosa `#e6a4b4`, perla `#f5e6e8`, rubino `#b3002d`, ecc.).
3. Ricarica la cartella su Netlify/GitHub: **sia il widget che la collezione 3D di Yuliia si aggiorneranno automaticamente!**
