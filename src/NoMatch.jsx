import React from "react";
import styled from "styled-components";

function NoMatch() {
  return (
    <Component>
      <div className="message">
        Must be on LinkedIn search page to use this extention.
      </div>
    </Component>
  );
}

const Component = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  .message {
    font-weight: 200;
    color: rgba(255, 255, 255, 0.753);
  }
`;

export default NoMatch;
