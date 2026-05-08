"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-06-19T19:00:00+01:00").getTime();

function getTimeLeft() {
  let diff = Math.max(0, TARGET_DATE - Date.now());
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  diff %= 60000;
  const seconds = Math.floor(diff / 1000);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown-row">
      <div className="countdown-label">Masterclass Starts In</div>
      <div className="cd-units" aria-label="Countdown timer">
        <div className="c-unit">
          <span className="c-num">{pad(timeLeft.days)}</span>
          <span className="c-label">Days</span>
        </div>
        <span className="c-sep" aria-hidden="true">
          :
        </span>
        <div className="c-unit">
          <span className="c-num">{pad(timeLeft.hours)}</span>
          <span className="c-label">Hours</span>
        </div>
        <span className="c-sep" aria-hidden="true">
          :
        </span>
        <div className="c-unit">
          <span className="c-num">{pad(timeLeft.minutes)}</span>
          <span className="c-label">Mins</span>
        </div>
        <span className="c-sep" aria-hidden="true">
          :
        </span>
        <div className="c-unit">
          <span className="c-num">{pad(timeLeft.seconds)}</span>
          <span className="c-label">Secs</span>
        </div>
      </div>
    </div>
  );
}
