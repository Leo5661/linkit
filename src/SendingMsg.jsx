import React from "react";
import styled from "styled-components";

function SendingMsg({ state }) {
  return (
    <Component>
      {state ? (
        <div className="sending">
          <span>
            <div className="dot"></div>
          </span>
          Sending Connection
        </div>
      ) : (
        <div className="sent">All Connection Sent</div>
      )}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  .sending {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.705);
    font-weight: 100;
    .dot {
      margin: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
      animation: blink-animation 1s steps(5, start) infinite;
      -webkit-animation: blink-animation 1s steps(5, start) infinite;
      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
      @-webkit-keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
    }
  }
  .sent {
    color: white;
    font-weight: 100;
  }
`;

export default SendingMsg;
