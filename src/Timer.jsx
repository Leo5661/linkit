import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Timer({ onPause, onComplet }) {
  const [sec, setSec] = useState("20");

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      if (!onPause) {
        if (Number(sec) !== 0) {
          const second = Number(sec) - 1;
          if (second > 9) {
            setSec(second);
          } else {
            setSec(`0${second}`);
          }
        } else {
          setSec("00");
          onComplet(true);
          return;
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <Component>
      <section>
        <h2 className={onPause ? "pause" : ""}>00</h2>
        <span>Min</span>
      </section>
      <div className="tick">:</div>
      <section>
        <h2 className={onPause ? "pause" : ""}>{sec}</h2>
        <span>Sec</span>
      </section>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 10px 10px;
  border-radius: 5px;
  transition: all 0.3s;
  background: linear-gradient(145deg, #323232, #3c3c3c);
  box-shadow: 5px 5px 10px #303030, -5px -5px 10px #404040;
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2 {
      font-weight: 100;
      color: white;
    }
    span {
      font-size: 0.5rem;
      font-weight: 100;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.705);
    }
    .pause {
      color: rgba(255, 255, 255, 0.404);
    }
  }
  .tick {
    font-size: 1rem;
    height: 50%;
  }
`;

export default Timer;
