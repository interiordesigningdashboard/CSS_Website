// start.js
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runningProcesses = new Map();

const services = [
  {
    name: "Backend Server",
    cmd: "node",
    args: ["server.js"],
    cwd: path.join(__dirname, "backend"),
  },
  {
    name: "Frontend Server",
    cmd: "node",
    args: [".output/server/index.mjs"],
    cwd: path.join(__dirname, "."),
  },
];

const colors = ["\x1b[36m", "\x1b[38;5;202m"];

const RESTART_DELAY = 2000;

function startService(service, idx) {
  const color = colors[idx % colors.length];

  const proc = spawn(service.cmd, service.args, {
    cwd: service.cwd,
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  runningProcesses.set(service.name, proc);

  proc.stdout.on("data", (d) =>
    process.stdout.write(`${color}[${service.name}]\x1b[0m ${d}`)
  );

  proc.stderr.on("data", (d) =>
    process.stderr.write(`${color}[${service.name}][err]\x1b[0m ${d}`)
  );

  proc.on("exit", (code, signal) => {
    runningProcesses.delete(service.name);
    if (signal === "SIGINT" || signal === "SIGTERM") return;
    setTimeout(() => startService(service, idx), RESTART_DELAY);
  });
}

services.forEach(startService);
