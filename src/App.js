import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [time, setTime] = useState(0);
  const [startstop, setStartstop] = useState(false);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [br, setBr] = useState(5);
  const [session, setSession] = useState(25);
  const [label, setLable] = useState("Session");
  const reset = () => {
    setStartstop(false);
    clearInterval(time);
    setSecond(0);
    setSession(25);
    setBr(5);
    setMinute(25);
    setTime(0);
    setLable("Session");
  };
  ///starting
  useEffect(() => {
    if (startstop) {
      if (!time) {
        const inter = setInterval(() => {
          setSecond((prev) => (prev === 0 ? 59 : prev - 1));
          setTime(inter);
        }, 10);
      }
    } else {
      clearInterval(time);
      setTime(0);
    }
    return () => clearInterval(time);
  }, [startstop, time]);

  useEffect(() => {
    if (second === 0 && minute === 0 && label === "Session") {
      setLable("Break");
      setMinute(br);
      setSecond(0);
    }
    if (second === 0 && minute === 0 && label === "Break") {
      setLable("Session");
      setMinute(session);
      setSecond(0);
    }
    if (second === 0 && startstop) {
      setMinute((prev) => prev - 1);
    }
  }, [second, startstop]);
  /// session control
  useEffect(() => {
    if (!startstop) {
      clearInterval(time);
      setMinute(session);
      setSecond(0);
    }
  }, [session]);
  //// session end

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
          <h2 id="time-left">
            {minute < 10 ? "0" + minute : minute}:
            {second < 10 ? "0" + second : second}
          </h2>
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
      </div>
    </div>
  );
}

export default App;
