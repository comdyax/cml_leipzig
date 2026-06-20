import { useState, useRef } from "react";
import styles from "./AudioPlayer.module.css";

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const INITIAL = { playing: false, progress: 0, currentTime: 0, duration: 0 };

function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [{ playing, progress, currentTime, duration }, setState] = useState(INITIAL);

  const toggle = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setState((s) => ({ ...s, playing: !s.playing }));
  };

  const handleTimeUpdate = () => {
    const a = audioRef.current;
    setState((s) => ({
      ...s,
      currentTime: a.currentTime,
      progress: a.duration ? (a.currentTime / a.duration) * 100 : 0,
    }));
  };

  const handleSeek = (e) => {
    const a = audioRef.current;
    if (!a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setState((s) => ({ ...s, duration: e.target.duration }))}
        onEnded={() => setState((s) => ({ ...s, playing: false, progress: 0, currentTime: 0 }))}
      />
      <button className={styles.playBtn} onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" rx="1" />
            <rect x="8" y="1" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
          </svg>
        )}
      </button>
      <div className={styles.controls}>
        <div className={styles.progressTrack} onClick={handleSeek}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.times}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
