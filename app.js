const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const ROUTES = new Map([
  ['/', '/index.html'],
  ['/home', '/index.html'],
  ['/home/', '/index.html'],
  ['/apps-websites', '/lab.html'],
  ['/apps-websites/', '/lab.html'],
  ['/apps/websites', '/lab.html'],
  ['/apps/websites/', '/lab.html'],
  ['/apps/websites/hospice-roadmap', '/labs/hospice-roadmap/index.html'],
  ['/apps/websites/hospice-roadmap/', '/labs/hospice-roadmap/index.html'],
  ['/labs/hospice-roadmap', '/labs/hospice-roadmap/index.html'],
  ['/labs/hospice-roadmap/', '/labs/hospice-roadmap/index.html'],
  ['/apps/websites/hospice-rep-cost-calculator', '/labs/hospice-rep-cost-calculator/index.html'],
  ['/apps/websites/hospice-rep-cost-calculator/', '/labs/hospice-rep-cost-calculator/index.html'],
  ['/labs/hospice-rep-cost-calculator', '/labs/hospice-rep-cost-calculator/index.html'],
  ['/labs/hospice-rep-cost-calculator/', '/labs/hospice-rep-cost-calculator/index.html']
]);

function resolveFile(urlPath) {
  let clean;
  try {
    clean = decodeURIComponent((urlPath || '/').split('?')[0]);
  } catch (_) {
    return null;
  }

  let target = ROUTES.get(clean);

  if (!target) {
    target = clean;
    if (target.endsWith('/')) {
      target = `${target}index.html`;
    } else if (!path.extname(target)) {
      target = `${target}.html`;
    }
  }

  const full = path.normalize(path.join(ROOT, target));
  if (!full.startsWith(ROOT)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  const full = resolveFile(req.url || '/');
  if (!full) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  fs.readFile(full, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(full).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`ThorDad static server listening on ${PORT}`);
});
