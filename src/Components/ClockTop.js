import "../App.css";
import React, { useState, useEffect } from "react";
import Clock from "./Clock";

// NOTE:- countDownDate must be passed as IS0 8601

function ClockTop({ countDownDate }) {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const dateTimer = new Date(countDownDate);
  const convertToUnix = Date.parse(dateTimer.toISOString());

  let interval;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = convertToUnix - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer
        clearInterval(interval.current);
      } else {
        // Update Timer
        setTimeRemaining(distance);
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <div className="clock-top">
      <section className="timer-container">
        <section className="timer">
          <div className="clock">
            {timeRemaining < oneDay && (
              <>
                <section>
                  {timerHours.toString().length === 1 ? (
                    <p>0{timerHours}</p>
                  ) : (
                    <p>{timerHours}</p>
                  )}
                  <small>h</small>
                </section>
                <section>
                  {timerMinutes.toString().length === 1 ? (
                    <p>0{timerMinutes}</p>
                  ) : (
                    <p>{timerMinutes}</p>
                  )}
                  <small>m</small>
                </section>
              </>
            )}
            {timeRemaining < oneHour && (
              <>
                <section>
                  <p>{timerMinutes}</p>
                  <small>m</small>
                </section>
                <section>
                  <p>{timerSeconds}</p>
                  <small>s</small>
                </section>
              </>
            )}
            {timeRemaining < oneMinute && (
              <>
                <section>
                  <p>{timerSeconds}</p>
                  <small>s</small>
                </section>
              </>
            )}
            {timeRemaining > oneDay && (
              <>
                <section>
                  <p>{timerDays}</p>
                  <small>Days</small>
                </section>
                <section>
                  <p>{timerHours}</p>
                  <small>h</small>
                </section>
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default ClockTop;
