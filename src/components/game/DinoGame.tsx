"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useIdeStore } from "@/store/ideStore";
import { readLocalStorage, writeLocalStorage } from "@/lib/utils";

const WIDTH = 640;
const HEIGHT = 200;
const GROUND_Y = 168;
const RUNNER_X = 56;
const RUNNER_SIZE = 30;
const GRAVITY = 0.62;
const JUMP_VELOCITY = -11.5;
const ACHIEVEMENT_SCORE = 50;

interface Obstacle {
  x: number;
  width: number;
  height: number;
  kind: 0 | 1; // 0 = bug, 1 = warning block
}

interface GameControls {
  jump: () => void;
  restart: () => void;
}

/**
 * Game canvas + loop. Mounted fresh every time the modal opens,
 * so all state starts clean without effect-driven resets.
 */
function DinoGameInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<GameControls | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [achievement, setAchievement] = useState(
    () => readLocalStorage("sc-dino-achievement") === "true"
  );
  const [best, setBest] = useState(() => Number(readLocalStorage("sc-dino-best")) || 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Mutable game state local to this mount
    let runnerY = GROUND_Y - RUNNER_SIZE;
    let velocity = 0;
    let obstacles: Obstacle[] = [];
    let speed = 4.4;
    let score = 0;
    let distanceToNext = 60;
    let over = false;
    let started = false;
    let achievementFired = false;
    let raf = 0;

    const cssVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888";

    function draw() {
      if (!ctx) return;
      const editor = cssVar("--editor");
      const border = cssVar("--border");
      const cyan = cssVar("--accent-primary");
      const violet = cssVar("--accent-secondary");
      const text = cssVar("--text-secondary");
      const orange = cssVar("--string");
      const yellow = cssVar("--warning");

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = editor;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // ground line
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 1);
      ctx.lineTo(WIDTH, GROUND_Y + 1);
      ctx.stroke();

      // runner: pixel "SC" robot
      ctx.fillStyle = cyan;
      ctx.fillRect(RUNNER_X, runnerY, RUNNER_SIZE, RUNNER_SIZE);
      ctx.fillStyle = violet;
      ctx.fillRect(RUNNER_X + 4, runnerY - 8, RUNNER_SIZE - 8, 8);
      ctx.fillStyle = editor;
      ctx.fillRect(RUNNER_X + 6, runnerY + 8, 6, 6);
      ctx.fillRect(RUNNER_X + 18, runnerY + 8, 6, 6);
      ctx.fillStyle = "#000";
      ctx.font = "bold 10px monospace";
      ctx.fillText("SC", RUNNER_X + 8, runnerY + 26);

      for (const ob of obstacles) {
        const top = GROUND_Y - ob.height;
        if (ob.kind === 0) {
          // crawling bug
          ctx.fillStyle = orange;
          ctx.fillRect(ob.x, top, ob.width, ob.height);
          ctx.strokeStyle = orange;
          ctx.lineWidth = 2;
          for (let i = 0; i < 3; i++) {
            const ly = top + 4 + i * (ob.height / 3);
            ctx.beginPath();
            ctx.moveTo(ob.x - 5, ly);
            ctx.lineTo(ob.x, ly);
            ctx.moveTo(ob.x + ob.width, ly);
            ctx.lineTo(ob.x + ob.width + 5, ly);
            ctx.stroke();
          }
        } else {
          // warning block
          ctx.fillStyle = yellow;
          ctx.fillRect(ob.x, top, ob.width, ob.height);
          ctx.fillStyle = editor;
          ctx.font = `bold ${Math.floor(ob.height * 0.6)}px monospace`;
          ctx.fillText("!", ob.x + ob.width / 2 - 3, top + ob.height * 0.72);
        }
      }

      ctx.fillStyle = text;
      ctx.font = "12px monospace";
      ctx.fillText(`score: ${Math.floor(score)}`, WIDTH - 110, 24);

      if (!started && !over) {
        ctx.fillStyle = text;
        ctx.font = "14px monospace";
        ctx.fillText("press Space / tap to start", WIDTH / 2 - 100, HEIGHT / 2);
      }
    }

    function endGame() {
      over = true;
      const finalScore = Math.floor(score);
      setGameOver(true);
      setBest((b) => {
        const nextBest = Math.max(b, finalScore);
        writeLocalStorage("sc-dino-best", String(nextBest));
        return nextBest;
      });
    }

    function tick() {
      // pause while the tab is hidden or before start / after crash
      if (!over && started && !document.hidden) {
        velocity += GRAVITY;
        runnerY = Math.min(runnerY + velocity, GROUND_Y - RUNNER_SIZE);
        if (runnerY === GROUND_Y - RUNNER_SIZE) velocity = Math.min(velocity, 0);

        distanceToNext -= speed;
        if (distanceToNext <= 0) {
          const kind: 0 | 1 = Math.random() < 0.55 ? 0 : 1;
          obstacles.push({
            x: WIDTH + 10,
            width: kind === 0 ? 26 : 22,
            height: kind === 0 ? 20 : 26 + Math.random() * 14,
            kind,
          });
          distanceToNext = 180 + Math.random() * 220;
        }

        for (const ob of obstacles) {
          ob.x -= speed;
          const obTop = GROUND_Y - ob.height;
          if (
            RUNNER_X + RUNNER_SIZE - 4 > ob.x &&
            RUNNER_X + 4 < ob.x + ob.width &&
            runnerY + RUNNER_SIZE > obTop + 4
          ) {
            endGame();
          }
        }
        obstacles = obstacles.filter((ob) => ob.x + ob.width > -12);

        score += 0.12 * speed;
        speed = Math.min(speed + 0.0009, 9);
        setDisplayScore(Math.floor(score));

        if (!achievementFired && score >= ACHIEVEMENT_SCORE) {
          achievementFired = true;
          writeLocalStorage("sc-dino-achievement", "true");
          window.dispatchEvent(new Event("sc-achievement"));
          setAchievement(true);
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    }

    function jump() {
      if (over) return;
      if (!started) started = true;
      if (runnerY >= GROUND_Y - RUNNER_SIZE - 1) velocity = JUMP_VELOCITY;
    }

    function restart() {
      runnerY = GROUND_Y - RUNNER_SIZE;
      velocity = 0;
      obstacles = [];
      speed = 4.4;
      score = 0;
      distanceToNext = 60;
      over = false;
      started = true;
      setGameOver(false);
      setDisplayScore(0);
    }

    controlsRef.current = { jump, restart };

    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (over) restart();
        else jump();
      }
    }

    window.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      controlsRef.current = null;
    };
  }, []);

  const onPointerDown = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (gameOver) controls.restart();
    else controls.jump();
  };

  return (
    <div className="p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          onPointerDown={onPointerDown}
          className="w-full cursor-pointer touch-none rounded border border-border bg-editor"
          aria-label="Dino runner game. Press space, arrow up, or tap to jump over bugs."
        />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded bg-black/60">
            <p className="font-mono text-sm font-bold text-white">
              process exited — score: {displayScore}
            </p>
            <button
              onClick={() => controlsRef.current?.restart()}
              className="flex items-center gap-1.5 rounded-md bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-black"
            >
              <RotateCcw size={14} aria-hidden /> Restart
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-text-2">
        <span>
          score: <span className="text-cyan">{displayScore}</span> · best:{" "}
          <span className="text-violet">{best}</span>
        </span>
        <span className="text-text-3">Space / ↑ / tap to jump · dodge the bugs</span>
      </div>

      {achievement && (
        <p
          className="mt-3 flex items-center gap-2 rounded border border-warning/40 bg-warning/10 px-3 py-2 font-mono text-xs text-warning"
          role="status"
        >
          <Trophy size={14} aria-hidden />
          Achievement unlocked: Debugging Streak — new questions added to the assistant!
        </p>
      )}
    </div>
  );
}

export default function DinoGame() {
  const { dinoOpen, setDinoOpen } = useIdeStore();
  return (
    <Modal
      open={dinoOpen}
      onClose={() => setDinoOpen(false)}
      title="debug-runner.exe — Dino Game"
      wide
    >
      <DinoGameInner />
    </Modal>
  );
}
