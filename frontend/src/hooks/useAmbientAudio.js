import { useRef, useState, useEffect } from "react";

export default function useAmbientAudio() {
  const audioRef = useRef(null);

  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (sound) => {
    // stop previous sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(sound.url);
    audio.loop = true;

    audioRef.current = audio;
    setCurrentSound(sound);

    audio.play();
    setIsPlaying(true);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setCurrentSound(null);
    setIsPlaying(false);
  };

  return {
    currentSound,
    isPlaying,
    playSound,
    togglePlay,
    stopSound,
  };
}