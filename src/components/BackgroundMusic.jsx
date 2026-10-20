import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import "./BackgroundMusic.css";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onError = () => setError("File musik tidak dapat dimuat.");
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("error", onError);
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
      setError("Musik belum bisa diputar. Coba tekan Play lagi.");
    }
  }

  return (
    <div className="samoy-music-control">
      <audio ref={audioRef} src="/audio/lagu-samoy.mp3" preload="none" loop />
      <button
        type="button"
        className={`samoy-music-button${playing ? " is-playing" : ""}`}
        onClick={toggleMusic}
        aria-label={playing ? "Jeda backsound Samoy" : "Putar backsound Samoy"}
        aria-pressed={playing}
        title={playing ? "Pause backsound" : "Play backsound"}
      >
        <Music2 size={17} aria-hidden="true" />
        <span className="samoy-music-label">
          {playing ? "MUSIC ON" : "MUSIC OFF"}
        </span>
        {playing ? (
          <Pause size={15} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={15} fill="currentColor" aria-hidden="true" />
        )}
      </button>
      {error && (
        <span className="samoy-music-error" role="status">
          {error}
        </span>
      )}
    </div>
  );
}
