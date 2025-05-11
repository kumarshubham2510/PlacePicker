<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect } from 'react';
>>>>>>> recover-lost-work

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
<<<<<<< HEAD
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);
=======
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
>>>>>>> recover-lost-work

    return () => {
      clearInterval(interval);
    };
<<<<<<< HEAD
  });
=======
  }, []);
>>>>>>> recover-lost-work

  return <progress value={remainingTime} max={timer} />;
}
