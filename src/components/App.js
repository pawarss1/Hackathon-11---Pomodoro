import React, { Component, useEffect, useRef, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [time, setTime] = useState("Work-Time");
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const [reset, setReset] = useState(true);
  const [set, setSet] = useState(false);
  const workInput = useRef(null);
  const breakInput = useRef(null);

  let intervalId = null;

  const tick = () => {
    if (stop) return;
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(intervalId);
        if (time === "Work-Time") {
          setMinutes(breakTime);
          setSeconds(0);
          setTime("Break-Time");
          alert("work duration is over");
        } else {
          setMinutes(workTime);
          setSeconds(0);
          setTime("Work-Time");
          alert("break duration is over");
        }
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
    // console.log(minutes, seconds);
  };

  const setHandler = () => {
    if (workTime === 0 && breakTime === 0) {
      resetHandler();
      return;
    }
    setReset(false);
    setSet(false);
    setStart(false);
    setStop(true);
    setMinutes(workTime);
    setSeconds(0);
    setTime("Work-Time");
  };

  const startHandler = () => {
    setStart(true);
    setStop(false);
    setReset(false);
    setSet(true);
  };

  const stopHandler = () => {
    setStop(true);
    setStart(false);
    setReset(false);
    setSet(false);
  };

  const resetHandler = () => {
    setReset(true);
    setStop(true);
    setStart(false);
    setSet(false);
    setTime("Work-Time");
    setWorkTime(25);
    setBreakTime(5);
    setMinutes(25);
    setSeconds(0);
    // console.log(workInput);
    workInput.current.value = 25;
    breakInput.current.value = 5;
  };

  useEffect(() => {
    intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <div id="main" className="container">
      <div className="clock">
        <h1 className="timer">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        <h3>{time}</h3>
      </div>
      <div className="control">
        <button data-testid="start-btn" disabled={start} onClick={startHandler}>
          Start
        </button>
        <button data-testid="stop-btn" disabled={stop} onClick={stopHandler}>
          Stop
        </button>
        <button data-testid="reset-btn" disabled={reset} onClick={resetHandler}>
          Reset
        </button>
      </div>
      <br />
      <div className="parameters">
        <form onSubmit={(evt) => evt.preventDefault()}>
          <input
            placeholder="work duration"
            data-testid="work-duration"
            type="Number"
            onChange={(evt) => setWorkTime(Number(evt.target.value))}
            defaultValue={workTime}
            disabled={set}
            ref={workInput}
            required
          />
          <input
            placeholder="break duration"
            data-testid="break-duration"
            type="Number"
            required
            onChange={(evt) => setBreakTime(Number(evt.target.value))}
            defaultValue={breakTime}
            disabled={set}
            ref={breakInput}
            required
          />
          <button data-testid="set-btn" disabled={set} onClick={setHandler}>
            Set
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;