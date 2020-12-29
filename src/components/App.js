import React, { Component, useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  let [curTask, setTask] = useState(false);
  let [resetFlag, setResetFlag] = useState(false);
  let [stopFlag, setStopFlag] = useState(false);
  let [startFlag, setStartFlag] = useState(false);
  let [workTime, setWorkTime] = useState(25);
  let [breakTime, setBreakTime] = useState(5);
  let [timerString, setTimer] = useState("25:00");
  let [secondsRemain, setSecondRemain] = useState(1500);
  let intervalId = null;
  //false for worktime and true for break time.
  useEffect(() => {
    intervalId = setInterval(getFormatedTime, 1 * 1000);
    return () => clearInterval(intervalId);
  });
  function updateWorkTime(event) {
    if (event.target.value < 0) {
      setWorkTime(25);
      return;
    }
    setWorkTime(event.target.value);
  }
  function updateBreakTime(event) {
    if (event.target.value < 0) {
      setBreakTime(5);
      return;
    }
    setBreakTime(event.target.value);
  }
  function setDurations() {
    if (workTime == 0 && breakTime == 0) {
      setWorkTime(25);
      setBreakTime(5);
      setTimer(`25:00`);
    } else {
      const temp = workTime < 10 ? `0${workTime}` : workTime;
      setTimer(`${temp}:00`);
    }
    setSecondRemain(60 * workTime);
  }
  function getFormatedTime() {
    if (!stopFlag && startFlag) {
      let minuteNow = Math.floor(secondsRemain / 60);
      let secNow = secondsRemain % 60;
      minuteNow = minuteNow < 10 ? `0${minuteNow}` : minuteNow;
      secNow = secNow < 10 ? `0${secNow}` : secNow;
      if (minuteNow === "00" && secNow === "00") {
        //clearInterval(intervalId);
        //intervalId = null;
        console.log(curTask);
        curTask == false
          ? alert("work duration is over")
          : alert("break duration is over");
        if (curTask == false) {
          //worktime
          const temp = breakTime < 10 ? `0${breakTime}` : breakTime;
          setTimer(`${temp}:00`);
          setSecondRemain(60 * breakTime);
        } else {
          //break time
          const temp = workTime < 10 ? `0${workTime}` : workTime;
          setTimer(`${temp}:00`);
          setSecondRemain(60 * workTime);
        }
        setTask(!curTask);
        return;
      }
      setTimer(`${minuteNow}:${secNow}`);
      setSecondRemain(secondsRemain - 1);
      //secondsRemain = Math.max(secondsRemain - 1, 0);
    }
  }
  function startTimer() {
    setStopFlag(false);
    setStartFlag(true);
    setResetFlag(false);
  }
  function stopTimer() {
    setStartFlag(false);
    setStopFlag(true);
    setResetFlag(false);
  }
  function resetTimer() {
    setStartFlag(false);
    setStopFlag(true);
    setResetFlag(true);
    setWorkTime(25);
    setBreakTime(5);
    setTimer(`25:00`);
    setSecondRemain(1500);
  }
  
  return (
    <div id="main" className="container">
      <div>
        <h1>{timerString}</h1>
        {!curTask && (
          <p>
            <b>Work-Time</b>
          </p>
        )}
        {curTask && (
          <p>
            <b>Break-Time</b>
          </p>
        )}
      </div>
      <div>
        <div>
          <button data-testid="start-btn" onClick={startTimer} disabled={startFlag}>
            Start
          </button>
          <button data-testid="stop-btn" onClick={stopTimer} disabled={stopFlag}>Stop</button>
          <button data-testid="reset-btn" onClick={resetTimer} disabled={resetFlag}>Reset</button>
        </div>

        <div className="timer-grp">
          <input
            type="number"
            data-testid="work-duration"
            placeholder="work duration"
            value={workTime}
            onChange={(event) => {
              updateWorkTime(event);
            }}
            required
            disabled={startFlag}
          ></input>
          <input
            type="number"
            data-testid="break-duration"
            placeholder="break duration"
            value={breakTime}
            onChange={(event) => {
              updateBreakTime(event);
            }}
            required
            disabled={startFlag}
          ></input>
          <button data-testid="set-btn" onClick={setDurations} disabled={startFlag}>
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
