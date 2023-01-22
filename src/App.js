import "./App.css";
import { useState, useEffect, useRef } from "react";
function App() {
  const [inter, setInter] = useState(0);
  const [startstop, setStartstop] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [br, setBr] = useState(5);
  const [session, setSession] = useState(25);
  const [label, setLable] = useState("Session");
  const reference = useRef(null);
  const reset = () => {
    clearInterval(inter);
    setInter(0);
    setStartstop(false);
    setSession(25);
    setBr(5);
    setTime(25 * 60);
    setLable("Session");
    reference.current.pause();
    reference.current.currentTime = 0;
  };

  ///displaying the timer
  const returnms = (pros) => {
    let min = Math.floor(pros / 60);
    let sec = pros - min * 60;
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  }; ///display end
  useEffect(() => {
    if (startstop) {
      if (!inter) {
        const int = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
        setInter(int);
      }
    } else {
      clearInterval(inter);
      setInter(0);
    }
    return () => clearInterval(inter);
  }, [startstop, inter]);

  useEffect(() => {
    if (time === 0 && label === "Session") {
      console.log("lable change");
      setTime(br * 60);
      setLable("Break");
      reference.current.play();
    }
    if (time === 0 && label === "Break") {
      console.log("lable change");
      setTime(session * 60);
      setLable("Session");
      reference.current.play();
    }
  }, [time]);
  useEffect(() => {
    console.log(time);
  }, [time]);
  //controling session
  useEffect(() => {
    clearInterval(inter);
    setTime(session * 60);
  }, [session]);
  return (
    <div className="App">
      <div className="main-title">25 + 5 Clock</div>
      <div className="upper-slip">
        <div className="length-control">
          <h2 id="break-label">Break Length</h2>
          <div className="timer-control">
            <button
              className="btn-level"
              id="break-decrement"
              value="-"
              onClick={() => {
                if (!startstop) {
                  setBr((pre) => (1 < pre ? pre - 1 : 1));
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
            <div className="btn-level" id="break-length">
              {br}
            </div>
            <button
              className="btn-level"
              id="break-increment"
              value="+"
              onClick={() => {
                if (!startstop) {
                  setBr((previous) => (60 > previous ? previous + 1 : 60));
                }
              }}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
        <div className="length-control">
          <h2 id="session-label">Session Length</h2>
          <div className="timer-control">
            <button
              className="btn-level"
              id="session-decrement"
              value="-"
              onClick={() => {
                if (!startstop) {
                  setSession((pre) => (1 < pre ? pre - 1 : 1));
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
            <div className="btn-level" id="session-length">
              {session}
            </div>
            <button
              className="btn-level"
              id="session-increment"
              value="+"
              onClick={() => {
                if (!startstop) {
                  setSession((previous) => (60 > previous ? previous + 1 : 60));
                }
              }}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="timer-wrapper">
          <h2 id="timer-label">{label}</h2>
          <h2 id="time-left">{returnms(time)}</h2>
        </div>
      </div>
      <div className="timer-control" style={{ width: "200px" }}>
        <button
          id="start_stop"
          onClick={() => {
            setStartstop((prev) => !prev);
          }}
        >
          <i className="fas fa-play"></i>
        </button>
        <button id="reset" onClick={() => reset()}>
          <i className="fas fa-redo-alt"></i>
        </button>
        <audio
          id="beep"
          ref={reference}
          src="https://res.cloudinary.com/drpcjt13x/video/upload/v1599590677/Proyectos/Pomodoro%20Clock/bells003_ne9dwp.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
