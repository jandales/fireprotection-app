import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const BackgroundAudio = () => {
  const isPlaying = useSelector((state) => state.isPlaying); // ✅ Get Redux state
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/storage/fire-alarm.mp3");
      audioRef.current.loop = true;
    }
 
    if (isPlaying) {
      audioRef.current.muted = false;

      audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
      });

    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying]);

  return null;
};

export default BackgroundAudio;
