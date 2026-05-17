import { useState, useRef, useEffect } from "react";
import { ambientSounds } from "../../utils/ambientSounds";
import useAmbientAudio from "../../hooks/useAmbientAudio";

export default function AmbientPanel() {
  const { currentSound, playSound, togglePlay, isPlaying } =
    useAmbientAudio();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-50">

      {/* 🎧 SINGLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          bg-[var(--primary)]
          hover:bg-[var(--primary-hover)]
          text-white
          px-4 py-2
          rounded-full
          shadow-md
          transition
        "
      >
        🎧 Focus Mode
      </button>

      {/* 📂 DROPDOWN */}
      {open && (
        <div
          className="
            mt-2 w-64
            bg-[var(--surface)]
            border border-[var(--accent)]
            rounded-xl
            shadow-lg
            p-3
          "
        >
          {/* HEADER */}
          <div className="text-sm font-semibold mb-2 text-[var(--text-main)]">
            Ambient Sounds
          </div>

          {/* SOUND LIST */}
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {ambientSounds.map((sound) => (
              <button
                key={sound.id}
                onClick={() => {
                  playSound(sound);
                  setOpen(false);
                }}
                className={`
                  w-full text-left p-2 rounded flex items-start gap-2 transition transform
                  ${
                    currentSound?.id === sound.id
                      ? "bg-[var(--accent)] shadow-sm"
                      : "hover:bg-[var(--bg)]"
                  }
                `}
              >
                {/* ICON */}
                <span className="text-lg mt-0.5">{sound.icon}</span>

                {/* TEXT */}
                <div className="leading-tight">
                  <div className="text-sm font-medium text-[var(--text-main)]">
                    {sound.name}
                  </div>

                  <div className="text-[10px] italic text-[var(--text-muted)] opacity-80">
                    {sound.tagline}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* PLAY / PAUSE CONTROL */}
          <button
            onClick={togglePlay}
            className="
              mt-3 w-full
              bg-[var(--primary)]
              hover:bg-[var(--primary-hover)]
              text-white
              py-1 rounded
              transition
            "
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}