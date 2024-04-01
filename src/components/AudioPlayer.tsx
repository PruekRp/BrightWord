import { RotateCcw } from "lucide-react";
import React, { useState } from "react";

const AudioPlayer = ({ src }:any) => {
  const [audio] = useState(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  return (
    <div className="flex items-center ml-56">
      <audio src={src} />
      <div className=" text-lg bg-white">
        {isPlaying ? (
          <div className="flex ">
            <button
              onClick={togglePlay}
              className="focus:outline-none bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
            >
              หยุด
            </button>
            <button
              onClick={restart}
              className="focus:outline-none bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ml-2"
            >
              <RotateCcw size={16} className="inline-block" />
              Restart
            </button>
          </div>
        ) : (
          <button
            onClick={togglePlay}
            className="focus:outline-none  bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
          >
            กดฟัง
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
