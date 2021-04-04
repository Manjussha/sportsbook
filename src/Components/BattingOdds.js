import React, { useEffect, useState } from "react";
import { Button, Collapse, Space, Spin } from "antd";
import BattingGrid from "../Components/BattingGrid.js";
import "../Components/BattingOdds.css";
import GameHead from "./GameHead.js";
const { Panel } = Collapse;
const delay = 4;
let count = 1;

const BattingOdds = (props) => {
  const [SelectGame, setSelectGame] = useState({});
  const [show, setShow] = useState(false);
  const [showBattingGrid, setshowBattingGrid] = useState(false);
  const [BattingValue, setBattingValue] = useState("");
  const [BackGroundValue, setBackGroundValue] = useState("");
  const [BatOnGame, setBatOnGame] = useState([]);

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), delay * 1000);
    async function getGameData() {
      const selectedGameString = await localStorage.getItem("selectedGame");
      const selectedGame = JSON.parse(selectedGameString);

      setSelectGame(selectedGame);
      console.log("Selected Game for Batting", SelectGame);
      //   setOdds(true);
    }
    getGameData();
  }, []);

  const battingPoint1 = (e, gameTeam, battingValue) => {
    console.log("event happend~!", e);
    console.log("button is click on team", gameTeam, "value", battingValue);

    if (e) {
      count += 2;

      if (e.target.className === "lay_data") {
        console.log("color is red");
        setBattingValue(battingValue);
        setBackGroundValue("red");
        setBatOnGame({
          teamName: gameTeam,
          batpoint: battingValue,
          bgcolor: "red",
          odds: "lay",
        });
      } else if (e.target.className === "odd_data") {
        console.log("color is blue");
        setBattingValue(battingValue);
        setBackGroundValue("blue");
        setBatOnGame({
          teamName: gameTeam,
          batpoint: battingValue,
          bgcolor: "blue",
          odds: "back",
        });
      } else {
        console.log("color is gray");
        setBattingValue(battingValue);
        setBackGroundValue("gray");
        setBatOnGame({
          teamName: gameTeam,
          batpoint: battingValue,
          bgcolor: "gray",
          odds: "back",
        });
      }
    }
    console.log("countervalueIS", count);
  };
  useEffect(() => {
    if (count % 2 === 0) {
      console.log("Seet bet on Game : in Use Feect", BatOnGame);
      pushBatData(BatOnGame);
      setshowBattingGrid(true);
    } else {
      setshowBattingGrid(false);
      count++;
    }
  }, [BatOnGame]);

  function pushBatData(selectedGame) {
    console.log("want to bat on Game :", selectedGame);
    const selectedGameToStoreString = JSON.stringify(selectedGame);
    localStorage.setItem("battingOpen", selectedGameToStoreString);
    console.log(selectedGameToStoreString);
    // props.history.push(
    //   `/game/live/${sportsKey}/${selectedGame.teams[0]}/vs/${selectedGame.teams[1]}`
    // );
  }

  return show ? (
    <>
      <div class="flex-item-left">
        <GameHead />
        <h2>It is {new Date().toLocaleTimeString()}.</h2>

        <button className="accordion">
          MATCH ODDS ({SelectGame.teams[0]} v/s {SelectGame.teams[1]})
        </button>
        <div className="panel__odds">
          <table>
            <tr>
              <th colSpan="6">Total Matched</th>
              <th>Back</th>
              <th>Lay</th>
              <th colSpan="2"></th>
            </tr>
            <tr className={SelectGame.teams[0]}>
              <td colSpan="4">
                {SelectGame.teams[0] ? SelectGame.teams[0] : 0}
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    0
                    // SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                2
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    0
                    // SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                1
              </td>

              <td
                className="odd_data"
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    SelectGame.odds.h2h[1] ? SelectGame.odds.h2h[1] : 0
                  );
                }}
              >
                {SelectGame.odds.h2h[1] ? SelectGame.odds.h2h[1] : 0}
                {/* <Button type="primary" size="middle" danger>
                {SelectGame.odds.h2h_lay[0]
                  ? SelectGame.odds.h2h_lay[0]
                  : 0}
              </Button> */}
              </td>
              <td
                className="lay_data"
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                {SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0}
                {/* <Button type="primary" size="middle">
                {SelectGame.odds.h2h_lay[1]
                  ? SelectGame.odds.h2h_lay[1]
                  : 0}
              </Button> */}
              </td>

              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    0
                    // SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                1
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[0],
                    0
                    // SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                2
              </td>
            </tr>
            <tr className={SelectGame.teams[1]}>
              <td colSpan="4">
                {SelectGame.teams[1] ? SelectGame.teams[1] : 0}
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(e, SelectGame.teams[1], 111);
                }}
              >
                111
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[1],
                    0
                    // SelectGame.odds.h2h_lay[1] ? SelectGame.odds.h2h_lay[1] : 0
                  );
                }}
              >
                2
              </td>
              <td
                className="odd_data"
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[1],
                    SelectGame.odds.h2h[0] ? SelectGame.odds.h2h[0] : 0
                  );
                }}
              >
                {SelectGame.odds.h2h[0] ? SelectGame.odds.h2h[0] : 0}
                {/* <Button type="primary" size="middle" danger>
                {SelectGame.odds.h2h[0] ? SelectGame.odds.h2h[0] : 0}
              </Button> */}
              </td>
              <td
                className="lay_data"
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[1],
                    SelectGame.odds.h2h_lay[0] ? SelectGame.odds.h2h_lay[0] : 0
                  );
                }}
              >
                {SelectGame.odds.h2h_lay[0]}
                {/* <Button type="primary" size="middle">
                {SelectGame.odds.h2h[1]}
              </Button> */}
              </td>

              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[1],
                    0
                    // SelectGame.odds.h2h[0] ? SelectGame.odds.h2h[0] : 0
                  );
                }}
              >
                2
              </td>
              <td
                onClick={(e) => {
                  battingPoint1(
                    e,
                    SelectGame.teams[1],
                    0
                    // SelectGame.odds.h2h[0] ? SelectGame.odds.h2h[0] : 0
                  );
                }}
              >
                1
              </td>
            </tr>
          </table>
        </div>
      </div>

      {showBattingGrid === true ? (
        <div class="flex-item-right">
          <BattingGrid />
        </div>
      ) : (
        <div class="flex-item-right">
          <p>nothing to show here now !!</p>
          <p>here we will show some attractive things for batting !!</p>
        </div>
      )}
    </>
  ) : (
    <div className="loadingGameSpinner">
      {/* show is false, wait {delay}seconds */}
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default BattingOdds;
