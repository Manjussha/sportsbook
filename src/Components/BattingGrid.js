import React, { useEffect, useState } from "react";
import { Collapse, Button } from "antd";
import "../Components/BattingGrid.css";
import axios from "axios";
const { Panel } = Collapse;
let battingOdds = 0;
let profit = 0;
function BattingGrid(props) {
  const [GameOnBet, setGameOnBet] = useState({});
  const [StackValue, setStackValue] = useState();
  const [calProfit, setcalProfit] = useState();
  const [showSubmitBetBtn, setshowSubmitBetBtn] = useState(false);
  const [currentBalance, setcurrentBalance] = useState("");
  const [showErrorMsg, setshowErrorMsg] = useState(false);
  const [WalletID, setWalletID] = useState("");
  const [walletInfo, setwalletInfo] = useState({});
  useEffect(() => {
    setInterval(grabdata, 1000);
    // grabdata();
  }, []);
  const grabdata = () => {
    async function getGameData() {
      const selectedGameString = await localStorage.getItem("battingOpen");
      console.log("catch game", selectedGameString);
      const selectedGame = JSON.parse(selectedGameString);
      setGameOnBet(selectedGame);
    }
    getGameData();
  };
  function getStackValue(e, stackValue) {
    let availableBal = localStorage.getItem("availableBalance");
    console.log("battingBal", availableBal, typeof availableBal);
    if (availableBal) {
      const walletInfo = JSON.parse(availableBal);
      console.log("walletInfo", walletInfo, typeof walletInfo);
      setwalletInfo(walletInfo);
      const cur_bal = walletInfo.availablePoint;
      setcurrentBalance(cur_bal);
      setWalletID(walletInfo.wallet_id);
      // let balance = parseFloat(availableBal);
      console.log("player want to bat on", stackValue, cur_bal);
      if (stackValue < cur_bal) {
        setshowSubmitBetBtn(true);
        setshowErrorMsg(false);
        setStackValue(stackValue);
        console.log("onBatting", StackValue, battingOdds);
        battingOdds = GameOnBet.batpoint;

        //profit calculation
        profit = parseFloat(battingOdds * StackValue - StackValue).toFixed(2);

        console.log("expactedProfit", profit);
        setcalProfit(profit);
        setshowSubmitBetBtn(true);
      } else {
        setshowSubmitBetBtn(false);
        setshowErrorMsg(true);
      }
    } else {
      setshowSubmitBetBtn(false);
      setshowErrorMsg(true);
    }
  }
  function submitMybet() {
    const userInfo = localStorage.getItem("userDetails");
    // const userstringInfo = jes(userInfo);
    var userJsonInfo = JSON.parse(`${userInfo}`);

    console.log(
      "battingSubmit +> Stack :",
      StackValue,
      "odds",
      battingOdds,
      "gamesInfo",
      GameOnBet,
      "userinfo",
      userInfo
    );
    console.log(
      new Date(new Date().toString().split("GMT")[0] + " UTC").toISOString()
    );
    let backPoint = 0;
    let layPoint = 0;

    if (GameOnBet.odds === "back" || GameOnBet.odds === "gray") {
      backPoint = battingOdds;
    } else {
      layPoint = battingOdds;
    }
    console.log(
      "gameDetails",
      GameOnBet.teamName,
      userJsonInfo.user_id,
      battingOdds,
      backPoint,
      layPoint
    );

    //1.battng hits !!
    axios
      .post("http://45.79.121.209:8000/api/v1/batting/", {
        battingName: GameOnBet.teamName,
        oddspoint: battingOdds,
        backpoint: backPoint,
        laypoint: layPoint,
        stackpoint: StackValue,
        matchInfo: 1,
        eventStartTime: new Date(
          new Date().toString().split("GMT")[0] + " UTC"
        ).toISOString(),
        eventEndTime: new Date(
          new Date().toString().split("GMT")[0] + " UTC"
        ).toISOString(),
        batByUser: userJsonInfo.user_id,
      })
      .then((res) => {
        console.log("battingDataSent", res);

        //balance update
        const ava_bal = currentBalance;
        console.log("available_Balance", currentBalance, typeof currentBalance);
        var parseBal = parseFloat(ava_bal).toFixed(2);
        var bal = parseInt(parseBal);
        console.log("available_Balance1", bal, typeof bal);
        const updatedbal = bal - StackValue;
        console.log("remainingBal", updatedbal, typeof updatedbal);
        //updated walletBalance
        axios
          .put(`http://45.79.121.209:8000/api/v1/wallet/${walletInfo.id}/`, {
            availablePoint: updatedbal,
            wallet_id: walletInfo.wallet_id,
          })
          .then((res) => {
            console.log("Wallet_updated", res);

            //update AccountTxn
            axios
              .post(`http://45.79.121.209:8000/api/v1/account/`, {
                dabitedPoint: StackValue,
                description: GameOnBet.teamName,
                account_id: walletInfo.id,
              })
              .then((res) => {
                console.log("Account_updated", res);
                window.location.reload();
              })
              .then((err) => console.log("Account_updatedError", err));
          })
          .then((err) => console.log("Wallet_updatedError", err));
      })
      .catch((err) => {
        console.log("battingDataSentError", err);
      });
  }

  return (
    <>
      <Collapse accordion defaultActiveKey={["1", "2"]}>
        <Panel
          header="Place Bet"
          key="1"
          style={{
            padding: "0px 0px",
          }}
        >
          <table
            className="batting_place"
            style={{ backgroundColor: GameOnBet.bgcolor }}
          >
            <tr>
              <th colSpan="2">Bet For</th>
              <th>Odds</th>
              <th>Stake</th>
              <th>Profit</th>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  fontWeight: "600",
                }}
              >
                {GameOnBet.teamName}
              </td>
              <td
                style={{
                  fontWeight: "600",
                }}
              >
                {GameOnBet.batpoint}
              </td>
              <td
                style={{
                  fontWeight: "600",
                }}
              >
                {StackValue ? StackValue : 0}
              </td>
              <td
                style={{
                  fontWeight: "600",
                }}
              >
                {calProfit ? calProfit : 0}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 1000);
                }}
              >
                1000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 5000);
                }}
              >
                5000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 10000);
                }}
              >
                10000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 20000);
                }}
              >
                20000
              </td>

              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 50000);
                }}
              >
                50000
              </td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 100000);
                }}
              >
                100000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 250000);
                }}
              >
                250000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 500000);
                }}
              >
                500000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 1000000);
                }}
              >
                1000000
              </td>
              <td
                style={{
                  backgroundColor: GameOnBet.bgcolor,
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  getStackValue(e, 2500000);
                }}
              >
                2500000
              </td>
            </tr>
          </table>
          {showErrorMsg ? <p> Insuffecient Balance</p> : ""}
          {showSubmitBetBtn ? (
            <div className="odd_container">
              <div className="odd__teamName">
                <span>
                  <Button type="primary" style={{ fontWeight: "500" }}>
                    Reset
                  </Button>
                </span>
              </div>
              <div className="odd__point">
                <span> </span>
              </div>
              <div className="odd__point">
                <span>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "green", fontWeight: "500" }}
                    onClick={() => {
                      submitMybet();
                    }}
                  >
                    Submit
                  </Button>
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </Panel>
        <Panel header="My Bet" key="2">
          <p> no text to test </p>
        </Panel>
      </Collapse>
    </>
  );
}

export default BattingGrid;
