// ============================================================
// Widget iPhone per Scriptable — "Glauco & Yuliia ♥"
// Mostra l'ultimo cuore 3D + contatore mesi/giorni insieme.
// Toccando il widget si apre l'app 3D interattiva!
// ============================================================

// 1) INCOLLA QUI L'URL DOVE HAI PUBBLICATO LA CARTELLA "app"
//    (esempio Netlify Drop: "https://cuore-glauco-yuliia.netlify.app")
const BASE_URL = "https://INSERISCI-QUI-IL-TUO-URL.netlify.app";

// Cache locale su iPhone (funziona anche offline)
const fm = FileManager.local();
const cacheDir = fm.joinPath(fm.documentsDirectory(), "cuore-glauco-yuliia-cache");
if (!fm.fileExists(cacheDir)) fm.createDirectory(cacheDir);
const jsonCachePath = fm.joinPath(cacheDir, "hearts.json");

async function loadData() {
  try {
    const req = new Request(`${BASE_URL}/hearts.json?v=${Date.now()}`);
    req.timeoutInterval = 8;
    const data = await req.loadJSON();
    fm.writeString(jsonCachePath, JSON.stringify(data));
    return data;
  } catch (e) {
    if (fm.fileExists(jsonCachePath)) {
      return JSON.parse(fm.readString(jsonCachePath));
    }
    return {
      couple: "Glauco & Yuliia",
      startDate: "2026-09-22",
      anniversaryDay: 22,
      hearts: [{ month: 2, dateDisplay: "22.11.2026", title: "2 Months Anniversary", backNote: "three good ♥", preview: "previews/month-02.png" }]
    };
  }
}

async function loadHeartImage(relPath) {
  const safeName = relPath.replace(/[^a-zA-Z0-9._-]/g, "_");
  const imgCachePath = fm.joinPath(cacheDir, safeName);
  try {
    const req = new Request(`${BASE_URL}/${relPath}?v=${Date.now()}`);
    req.timeoutInterval = 10;
    const img = await req.loadImage();
    fm.writeImage(imgCachePath, img);
    return img;
  } catch (e) {
    if (fm.fileExists(imgCachePath)) return fm.readImage(imgCachePath);
    return null;
  }
}

function computeStats(startDateStr, annivDay) {
  const start = new Date(`${startDateStr}T00:00:00`);
  const now = new Date();
  const days = Math.max(0, Math.floor((now - start) / 86400000));
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < annivDay) months -= 1;
  months = Math.max(0, months);

  let nextY = now.getFullYear();
  let nextM = now.getMonth();
  if (now.getDate() >= annivDay) {
    nextM += 1;
    if (nextM > 11) { nextM = 0; nextY += 1; }
  }
  const nextDate = new Date(nextY, nextM, annivDay);
  const daysUntilNext = Math.max(0, Math.ceil((nextDate - now) / 86400000));
  return { months, days, daysUntilNext };
}

const data = await loadData();
const latest = data.hearts[data.hearts.length - 1];
const heartImg = latest?.preview ? await loadHeartImage(latest.preview) : null;
const stats = computeStats(data.startDate, data.anniversaryDay || 22);
const mesiText = stats.months === 1 ? "1 mese" : `${stats.months} mesi`;

const w = new ListWidget();
w.url = BASE_URL; // Toccare il widget apre subito il cuore 3D interattivo!

// Sfondo velluto bordeaux coerente con l'app
const grad = new LinearGradient();
grad.locations = [0, 0.55, 1];
grad.colors = [new Color("#330c18"), new Color("#1a070d"), new Color("#0f0408")];
grad.startPoint = new Point(0, 0);
grad.endPoint = new Point(1, 1);
w.backgroundGradient = grad;
w.setPadding(14, 14, 14, 14);

const family = config.widgetFamily || "small";

if (family === "small") {
  // Layout compatto (quadrato)
  const top = w.addText(data.couple);
  top.font = Font.italicSystemFont(12);
  top.textColor = new Color("#ffd6e0", 0.85);
  top.centerAlignText();

  w.addSpacer(4);

  if (heartImg) {
    const imgStack = w.addStack();
    imgStack.addSpacer();
    const im = imgStack.addImage(heartImg);
    im.imageSize = new Size(74, 74);
    im.cornerRadius = 8;
    imgStack.addSpacer();
  }

  w.addSpacer(4);

  const count = w.addText(`${mesiText} ♥`);
  count.font = Font.boldSystemFont(16);
  count.textColor = Color.white();
  count.centerAlignText();

  const sub = w.addText(`${stats.days} giorni insieme`);
  sub.font = Font.mediumSystemFont(10.5);
  sub.textColor = new Color("#ffb3c6", 0.85);
  sub.centerAlignText();
} else {
  // Layout medio/grande (orizzontale con cuore grande a sinistra + dettagli a destra)
  const row = w.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();

  if (heartImg) {
    const im = row.addImage(heartImg);
    im.imageSize = new Size(106, 106);
  }

  row.addSpacer(14);

  const col = row.addStack();
  col.layoutVertically();

  const couple = col.addText(data.couple);
  couple.font = Font.italicSystemFont(15);
  couple.textColor = new Color("#ffd6e0", 0.9);

  col.addSpacer(4);

  const main = col.addText(`${mesiText} insieme ♥`);
  main.font = Font.boldSystemFont(20);
  main.textColor = Color.white();

  col.addSpacer(3);

  const daysTxt = col.addText(`${stats.days} giorni · ${data.hearts.length} ${data.hearts.length === 1 ? "cuore" : "cuori"}`);
  daysTxt.font = Font.mediumSystemFont(12);
  daysTxt.textColor = new Color("#ffb3c6", 0.85);

  col.addSpacer(8);

  const nextTxt = col.addText(`Prossimo cuore tra ${stats.daysUntilNext}g · Tocca per 3D ↻`);
  nextTxt.font = Font.regularSystemFont(10.5);
  nextTxt.textColor = new Color("#ffffff", 0.65);
}

if (config.runsInWidget) {
  Script.setWidget(w);
} else {
  await w.presentMedium();
}
Script.complete();
