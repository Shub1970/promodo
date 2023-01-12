import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  return (
    <div className="App">
      <div class="main-title">25 + 5 Clock</div>
      <div className="upper-slip">
        <div class="length-control">
          <h2 id="break-label">Break Length</h2>
          <div className="timer-control">
            <button class="btn-level" id="break-decrement" value="-">
              <FontAwesomeIcon icon="fas fa-long-arrow-down" />
            </button>
            <div class="btn-level" id="break-length">
              5
            </div>
            <button class="btn-level" id="break-increment" value="+">
              <FontAwesomeIcon icon="fas fa-long-arrow-up" />
            </button>
          </div>
        </div>
        <div class="length-control">
          <h2 id="session-label">Session Length</h2>
          <div className="timer-control">
            <button class="btn-level" id="session-decrement" value="-">
              <FontAwesomeIcon icon="fas fa-long-arrow-down" />
            </button>
            <div class="btn-level" id="session-length">
              25
            </div>
            <button class="btn-level" id="session-increment" value="+">
              <FontAwesomeIcon icon="fas fa-long-arrow-up" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="timer-wrapper">
          <h2 id="timer-label">Session</h2>
          <h2 id="time-left">25:00</h2>
        </div>
      </div>
      <div class="timer-control" style={{ width: "200px" }}>
        <button id="start">
          <FontAwesomeIcon icon="fas fa-start" />
          start
        </button>
        <button id="pause">
          <FontAwesomeIcon icon="fas fa-pause" />
          pause
        </button>
        <button id="reset">
          <FontAwesomeIcon icon="fas fa-sync-alt" />
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
