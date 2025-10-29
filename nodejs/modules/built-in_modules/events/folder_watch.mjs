// dirWatcher.js
import fs from "fs";
import EventEmitter from "events";

const dirWatcher = new EventEmitter();
const dir = "./watched";
let knownFiles = new Set(fs.readdirSync(dir));

// track watchers and last emit time for each file with a debounce tolerance
const fileWatchers = new Map();
const lastEmitted = new Map();
const DEBOUNCE_MS = 100;

dirWatcher.on("file-added", (f) => console.log(`File added: ${f}`));
dirWatcher.on("file-removed", (f) => console.log(`File removed: ${f}`));
dirWatcher.on("file-changed", (f) => console.log(`File changed: ${f}`));

function watchFileOnce(file) {
  if (fileWatchers.has(file)) return;

  const filepath = `${dir}/${file}`;
  const w = fs.watch(filepath, (eventType) => {
    // only treat explicit change events, debounce to avoid duplicates
    if (eventType === "change") {
      const now = Date.now();
      if (now - (lastEmitted.get(file) || 0) < DEBOUNCE_MS) return;
      lastEmitted.set(file, now);
      dirWatcher.emit("file-changed", file);
    }
  });

  fileWatchers.set(file, w);
}

// Watch all existing directory files initially
for (const file of knownFiles) {
  watchFileOnce(file);
}

fs.watch(dir, () => {
  // re-read directory safely
  let current;
  try {
    current = new Set(fs.readdirSync(dir));
  } catch (err) {
    current = new Set();
  }

  // added files
  for (const file of current) {
    if (!knownFiles.has(file)) {
      dirWatcher.emit("file-added", file);
      watchFileOnce(file);
    }
  }

  // removed files
  for (const file of knownFiles) {
    if (!current.has(file)) {
      dirWatcher.emit("file-removed", file);
      const w = fileWatchers.get(file);
      if (w) {
        try {
          w.close();
        } catch (e) {}
        fileWatchers.delete(file);
      }
      lastEmitted.delete(file);
    }
  }

  // ensure watchers exist for existing known files on startup
  for (const file of current) {
    if (!fileWatchers.has(file)) watchFileOnce(file);
  }

  knownFiles = current;
});

console.log(`Watching for changes in ${dir}...`);
