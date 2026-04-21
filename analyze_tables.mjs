import { readFileSync } from 'fs';
const src = readFileSync('src/components/documents.ts', 'utf8');

// Strip literal \x1b[...m sequences (as written in TS source, not actual ESC chars)
function stripAnsi(s) {
  return s.replace(/\\x1b\[[0-9;]*m/g, '');
}

const names = ['mca_final', 'bsc_final', 'hs_result', 'icse_result'];
for (const name of names) {
  const marker = `const ${name} = \``;
  const start = src.indexOf(marker) + marker.length;
  const end = src.indexOf('`\n', start);
  const content = src.slice(start, end);
  const lines = content.split('\n');
  console.log(`\n=== ${name} ===`);
  lines.forEach((line, i) => {
    const vis = stripAnsi(line.replace(/\r/g, ''));
    console.log(`${String(i).padStart(2)}: len=${String(vis.length).padStart(2)} |${vis}|`);
  });
}
