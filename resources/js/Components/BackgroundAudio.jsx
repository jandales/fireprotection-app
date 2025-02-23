import { useEffect, useState } from "react";

const BackgroundAudio = (play) => {

  const [audio, setAudio] = useState(null);

  

  const playAlarm = () => {
    if(audio){
      audio.loop = true;
      audio.muted = true;
      audio.play()
        .then(() => {
          setTimeout(() => (audio.muted = false), 1000);
        })
        .catch((err) => console.error("Audio play failed:", err));
    } 


    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }

  useEffect(() => {   
    setAudio(new Audio("/storage/fire-alarm.mp3"))
    if(audio){
      playAlarm();
    }

  }, [play]);

  return null;
};

export default BackgroundAudio;
