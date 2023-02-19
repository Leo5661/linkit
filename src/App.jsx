import { useEffect, useState } from "react";
import styled from "styled-components";
import Match from "./Match";
import NoMatch from "./NoMatch";

function App() {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs.query(queryInfo, tabs => {
      if (
        tabs[0].url &&
        tabs[0].url.includes(`linkedin.com/search/results/people/`)
      ) {
        console.log("found match");
        setIsMatched(true);
      }
    });
  }, []);

  return (
    <Component>
      <div className="App">
        <h2 className="title">LinkIt</h2>
        <h4 className="subTitle">Make connection fast.</h4>
        <div className="divider"></div>
      </div>
      {isMatched ? <Match /> : <NoMatch />}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;

  .App {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .title {
      padding-left: 10px;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.753);
    }

    .subTitle {
      padding-left: 10px;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.404);
    }
    .divider {
      height: 0.5px;
      background-color: rgba(255, 255, 255, 0.233);
      width: 100%;
    }
  }
`;

export default App;
