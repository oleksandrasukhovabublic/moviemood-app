// Підключає git-хуки (Husky), навіть якщо папка .git лежить НА РІВЕНЬ ВИЩЕ за цей проєкт
// (наприклад, репозиторій у MovieMood/, а застосунок у MovieMood/moviemood-app/).
// Звичайний `husky install` у такому випадку падає з помилкою ".git can't be found".
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let repoRoot;
try {
  repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: projectDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
} catch {
  console.log('husky: git-репозиторій не знайдено, хуки не підключено (це нормально).');
  process.exit(0);
}

// Шлях до папки .husky відносно кореня репозиторію (напр. "moviemood-app/.husky")
const hooksDir = path.relative(repoRoot, path.join(projectDir, '.husky')).split(path.sep).join('/');
const huskyBin = path.join(projectDir, 'node_modules', 'husky', 'lib', 'bin.js');

execFileSync(process.execPath, [huskyBin, 'install', hooksDir], { cwd: repoRoot, stdio: 'inherit' });
