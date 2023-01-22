import "./App.css";
import { useState, useEffect, useRef } from "react";
function App() {
  const reference = useRef(null);
  const [clock, setClock] = useState({
    inter: 0,
    startstop: false,
    time: 1500,
    br: 5,
    session: 25,
    label: "session",
  });
  const reset = () => {
    setClock({
      inter: 0,
      startstop: false,
      time: 1500,
      br: 5,
      session: 25,
      label: "session",
    });
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
    if (clock.startstop) {
      if (!clock.inter) {
        const int = setInterval(() => {
          setClock((prev) => {
            return { ...prev, time: prev.time - 1 };
          });
        }, 1000);
        setClock((prev) => {
          return { ...prev, inter: int };
        });
      }
    } else {
      clearInterval(clock.inter);
      setClock({ ...clock, inter: 0 });
    }
    return () => clearInterval(clock.inter);
  }, [clock.startstop, clock.inter]);

  useEffect(() => {
    if (clock.time === -1 && clock.label === "session") {
      setClock({ ...clock, time: clock.br * 60, label: "break" });
      reference.current.play();
    } else if (clock.time === -1 && clock.label === "break") {
      setClock({ ...clock, time: clock.session * 60, label: "session" });
      reference.current.play();
    }
  }, [clock.time]);

  //controling session
  useEffect(() => {
    clearInterval(clock.inter);
    setClock({ ...clock, time: clock.session * 60 });
  }, [clock.session]);
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
                if (!clock.startstop) {
                  setClock((prev) => {
                    return { ...prev, br: 1 < prev.br ? prev.br - 1 : 1 };
                  });
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
            <div className="btn-level" id="break-length">
              {clock.br}
            </div>
            <button
              className="btn-level"
              id="break-increment"
              value="+"
              onClick={() => {
                if (!clock.startstop) {
                  setClock((prev) => {
                    return { ...prev, br: 60 > prev.br ? prev.br + 1 : 60 };
                  });
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
                if (!clock.startstop) {
                  setClock((prev) => {
                    return {
                      ...prev,
                      session: 1 < prev.session ? prev.session - 1 : 1,
                    };
                  });
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
            <div className="btn-level" id="session-length">
              {clock.session}
            </div>
            <button
              className="btn-level"
              id="session-increment"
              value="+"
              onClick={() => {
                if (!clock.startstop) {
                  setClock((prev) => {
                    return {
                      ...prev,
                      session: 60 > prev.session ? prev.session + 1 : 60,
                    };
                  });
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
          <h2 id="timer-label">{clock.label}</h2>
          <h2 id="time-left">{returnms(clock.time)}</h2>
        </div>
      </div>
      <div className="timer-control" style={{ width: "200px" }}>
        <button
          id="start_stop"
          onClick={() => {
            setClock((prev) => {
              return { ...prev, startstop: !prev.startstop };
            });
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
