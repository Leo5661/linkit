import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";

function Match() {
  const [isDisable, setIsDisable] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);

  function onTimerComplete(event) {
    if (event) {
      setIsDisable(event);
      sendConnectionEvent();
    }
  }

  function sendConnectionEvent() {
    setPauseTimer(true);
    const queryOption = { currentWindow: true, active: true };
    chrome.tabs.query(queryOption, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          isSendConnection: true
        },
        res => {
          console.log(res);
          setIsDisable(true);
        }
      );
    });
  }

  function handleTimer() {
    setPauseTimer(!pauseTimer);
  }

  return (
    <Component>
      <div className="title">Sending connection will start in</div>
      <Timer onPause={pauseTimer} onComplet={onTimerComplete} />
      <button
        disabled={isDisable}
        className="sendConnction"
        onClick={sendConnectionEvent}
      >
        Send Connection
      </button>
      <button disabled={isDisable} className="hold" onClick={handleTimer}>
        {pauseTimer ? "Start" : "Hold"}
      </button>
    </Component>
  );
}

const Component = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  .title {
    align-content: flex-start;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.404);
  }
  .sendConnction {
    color: rgba(255, 255, 255, 0.521);
    width: 140px;
    height: 35px;
    border-radius: 50px;
    border: none;
    transition: all 0.3s;
    background: linear-gradient(145deg, #323232, #3c3c3c);
    box-shadow: 5px 5px 10px #303030, -5px -5px 10px #404040;
    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.404);
      cursor: pointer;
    }
  }
  .hold {
    color: rgba(255, 255, 255, 0.404);
    border-radius: 50px;
    width: 140px;
    border: none;
    height: 35px;
    background: transparent;
    transition: all 0.3s;
    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.404);
      box-shadow: 5px 5px 10px #303030, -5px -5px 10px #404040;
      cursor: pointer;
    }
  }
`;

export default Match;
