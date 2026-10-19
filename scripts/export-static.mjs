import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const documents = {
  'home.html': 'index.html',
  'sobre.html': 'sobre/index.html',
  'paciente.html': 'informacoes-ao-paciente/index.html',
  'contato.html': 'contato/index.html',
  'privacidade.html': 'politica-de-privacidade/index.html',
  'blog.html': 'blog/index.html',
};

const outputDirectories = [];
for (const directory of ['.output/public', 'dist/client']) {
  const target = path.join(projectRoot, directory);
  if (await stat(target).then((entry) => entry.isDirectory()).catch(() => false)) {
    outputDirectories.push(target);
  }
}

if (outputDirectories.length === 0) {
  throw new Error('Nenhum build encontrado. Execute npm run build antes de exportar.');
}

for (const target of outputDirectories) {
  for (const [source, destination] of Object.entries(documents)) {
    const destinationPath = path.join(target, destination);
    await mkdir(path.dirname(destinationPath), { recursive: true });
    await copyFile(path.join(projectRoot, 'src/data/site', source), destinationPath);
  }
  console.log(`Exportadas ${Object.keys(documents).length} páginas para ${path.relative(projectRoot, target)}.`);
}
