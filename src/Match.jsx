import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendingMsg from "./SendingMsg";
import Timer from "./Timer";

function Match() {
  const [isDisable, setIsDisable] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [isBtnTextChanged, setIsBtnTextChanged] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
      if (obj.isConnectionSent) {
        setIsSent(true);
        response("conection stoped");
      }
    });
  });

  function onTimerComplete(event) {
    if (event) {
      setIsDisable(event);
      sendConnectionEvent();
    }
  }

  function broadcastMessage() {
    const queryOption = { currentWindow: true, active: true };
    chrome.tabs.query(queryOption, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          tabId: tabs[0].id,
          isSendConnection: true
        },
        res => {
          if (res === "started") {
            console.log(res);
            setIsSending(true);
            setIsDisable(true);
          }
        }
      );
    });
  }

  function sendConnectionEvent() {
    setPauseTimer(true);
    broadcastMessage();
  }

  function handleTimer() {
    setPauseTimer(!pauseTimer);
    setIsBtnTextChanged(!isBtnTextChanged);
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
      {isSending ? (
        <SendingMsg state={!isSent} />
      ) : (
        <button disabled={isDisable} className="hold" onClick={handleTimer}>
          {isBtnTextChanged ? "Start" : "Hold"}
        </button>
      )}
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
    color: rgba(255, 255, 255, 0.705);
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
    &:disabled {
      color: rgba(255, 255, 255, 0.404);
    }
    &:disabled:hover {
      border: none;
      cursor: default;
    }
  }
  .hold {
    color: rgba(255, 255, 255, 0.705);
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
    &:disabled {
      color: rgba(255, 255, 255, 0.404);
    }
    &:disabled:hover {
      border: none;
      cursor: default;
    }
  }
`;

export default Match;
