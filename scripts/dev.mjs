// Запускає разом мок-бекенд (порт 3001) і Vite (порт 5173): npm run dev:all
import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';

const run = (script) =>
  spawn(npm, ['run', script], { stdio: 'inherit', shell: isWindows });

const children = [run('server'), run('dev')];

const stop = () => children.forEach((child) => child.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach((child) => child.on('exit', stop));
