"use client";

import { useEffect, useState } from "react";

export type NotifyType =
  | "success"
  | "error"
  | "warning"
  | "info";

interface NotifyItemProps {
  id: string;
  title: string;
  message: string;
  type: NotifyType;
  duration: number;
  onClose: (id: string) => void;
}

export default function NotifyItem({
  id,
  title,
  message,
  type,
  duration,
  onClose,
}: NotifyItemProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      const percentage =
        100 - (elapsed / duration) * 100;

      setProgress(Math.max(0, percentage));
    }, 50);

    const timeout = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [id, duration, onClose]);

  const borderColor = {
    success: "border-green-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
  }[type];

  const progressColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={`
        relative
        overflow-hidden
        min-w-[320px]
        rounded-xl
        border
        ${borderColor}
        bg-zinc-900
        shadow-lg
        animate-in
        slide-in-from-right
      `}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold text-white">
              {title}
            </h4>

            <p className="mt-1 text-sm text-zinc-400">
              {message}
            </p>
          </div>

          <button
            onClick={() => onClose(id)}
            className="
              text-zinc-500
              hover:text-white
              transition
            "
          >
            ✕
          </button>
        </div>
      </div>

      <div className="h-1 w-full bg-zinc-800">
        <div
          className={`h-full ${progressColor}`}
          style={{
            width: `${progress}%`,
            transition: "width 50ms linear",
          }}
        />
      </div>
    </div>
  );
}