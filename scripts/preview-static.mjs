import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
let host = '127.0.0.1';
let port = 4173;

for (let index = 0; index < args.length; index++) {
  const argument = args[index];
  if (argument === '--host') host = args[++index] || '0.0.0.0';
  else if (argument.startsWith('--host=')) host = argument.slice(7);
  else if (argument.startsWith('--host')) host = argument.slice(6);
  else if (argument === '--port') port = Number(args[++index]);
  else if (argument.startsWith('--port=')) port = Number(argument.slice(7));
  else if (argument.startsWith('--port')) port = Number(argument.slice(6));
  else throw new Error(`Argumento desconhecido: ${argument}`);
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('A porta deve ser um número inteiro entre 1 e 65535.');
}

let publicRoot;
for (const directory of ['.output/public', 'dist/client']) {
  const candidate = path.join(projectRoot, directory);
  if (await stat(path.join(candidate, 'index.html')).then((entry) => entry.isFile()).catch(() => false)) {
    publicRoot = await realpath(candidate);
    break;
  }
}

if (!publicRoot) {
  console.error('Nenhum build exportado encontrado. Execute npm run build antes de npm run preview.');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

function isInsidePublicRoot(filename) {
  const relative = path.relative(publicRoot, filename);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function plainResponse(request, response, status, text) {
  const body = Buffer.from(text);
  response.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': body.length,
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(request.method === 'HEAD' ? undefined : body);
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    plainResponse(request, response, 405, 'Método não permitido.');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://preview.local').pathname);
    if (pathname.includes('\0')) throw new Error('Invalid path');
  } catch {
    plainResponse(request, response, 400, 'Endereço inválido.');
    return;
  }

  if (/^\/a-clinica\/ribeirao-preto\/?$/.test(pathname)) {
    response.writeHead(301, { Location: '/sobre/', 'Content-Length': 0 });
    response.end();
    return;
  }

  try {
    let filename = path.resolve(publicRoot, `.${pathname}`);
    if (!isInsidePublicRoot(filename)) throw new Error('Outside public root');
    let info = await stat(filename);
    if (info.isDirectory()) {
      filename = path.join(filename, 'index.html');
      info = await stat(filename);
    }
    filename = await realpath(filename);
    if (!info.isFile() || !isInsidePublicRoot(filename)) throw new Error('Not a public file');
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filename).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      'X-Content-Type-Options': 'nosniff',
      ...(['/blog', '/cursos', '/perio-ia'].includes(pathname.replace(/\/$/, ''))
        ? { 'X-Robots-Tag': 'noindex, follow' }
        : {}),
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filename).on('error', () => response.destroy()).pipe(response);
  } catch {
    plainResponse(request, response, 404, 'Página não encontrada.');
  }
});

server.on('error', (error) => {
  console.error(`Não foi possível iniciar a prévia: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  const address = host.includes(':') ? `[${host}]` : host;
  console.log(`Prévia estática: http://${address}:${port}/`);
  console.log(`Arquivos: ${path.relative(projectRoot, publicRoot)}`);
});
