import React, { useEffect, useState } from "react";
import { List, Avatar, Button } from "antd";
import axios from "axios";
import "../Components/GameList.css";
import { Spin, Space } from "antd";
import { withRouter } from "react-router";

const GameList = (props) => {
  const [show, setShow] = useState(false);
  const [Games, setGames] = useState([]); //Data are use after clenning.
  const sportsKey = props.keyword;
  const setgamesSummary = [];
  const [GameData, setGameData] = useState([]);
  const apiUrl = `https://api.the-odds-api.com/v3/odds/?sport=${props.keyword}&region=uk&dateFormat=iso&mkt=h2h&apiKey=f1bd8f7e426b0deb2b68e4797ba764db`;
  //108a077908239ddbd43483687b29dc47
  const delay = 5;

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), delay * 1000);
    async function fetchData() {
      const request = await axios.get(apiUrl);
      setGameData(request.data.data);

      console.log("Games Request", request.data.data);
    }
    fetchData();
  }, [apiUrl]);
  useEffect(() => {
    GameData.map((v, n) => {
      // getting game details from GameArray one by one
      v.sites.map((a, i) => {
        // here we are cleaning up ODDS values use site_key as "betfair"
        // const oddsData = [];

        if (a.site_key.includes("betfair")) {
          if (a.odds) {
            const h2h_0 = setStringLength(a.odds.h2h[0]);
            const h2h_1 = setStringLength(a.odds.h2h[1]);
            const h2h_2 = a.odds.h2h[2] ? setStringLength(a.odds.h2h[2]) : "--";
            const h2h_lay0 = setStringLength(a.odds.h2h_lay[0]);
            const h2h_lay1 = setStringLength(a.odds.h2h_lay[1]);
            const h2h_lay2 = a.odds.h2h_lay[2]
              ? setStringLength(a.odds.h2h_lay[2])
              : "--";
            console.log("wwww", a.odds.h2h_lay);

            setgamesSummary.push({
              teams: v.teams,
              sport_nice: v.sport_nice,
              commence_time: v.commence_time,
              odds: {
                h2h: [h2h_0, h2h_1, h2h_2],
                h2h_lay: [h2h_lay0, h2h_lay1, h2h_lay2],
              },
              searchKey: props.keyword,
            });
            setGames(setgamesSummary);
          }
        }
      });
    });
    console.log("gameSummary", setgamesSummary);
  }, [GameData]);

  function AddMatchToEvent(Match) {
    console.log("Add Match as event", Match);
    console.log(
      "teamNice:",
      Match.sport_nice,
      "teamA:",
      Match.teams[0],
      "teamB:",
      Match.teams[1],
      "match_result:",
      1
    );
    // axios
    //   .post("http://45.79.121.209:8000/api/v1/match/check/", {
    //     teamNice: Match.sport_nice,
    //     teamA: Match.teams[0],
    //     teamB: Match.teams[1],
    //     match_result: 1,
    //   })
    //   .then((res) => {
    //     console.log("MatchEvent Inserted", res.data);
    //   })
    //   .then((err) => {
    //     console.log(err);
    //   });
  }

  //Click to navigate Game Schedule

  function navigateToGameDetails(selectedGame) {
    console.log("Selected Game :", selectedGame);
    const selectedGameToStoreString = JSON.stringify(selectedGame);
    localStorage.setItem("selectedGame", selectedGameToStoreString);
    console.log("gameStored", selectedGameToStoreString);
    AddMatchToEvent(selectedGame);
    props.history.push(
      `/game/live/${sportsKey}/${selectedGame.teams[0]}/vs/${selectedGame.teams[1]}`
    );
  }

  function setStringLength(value) {
    var Evalue = value.toString().split(".");
    if (Evalue[1] == null) return value.toString();
    //+ ".00";
    else if (Evalue[1].length > 2) return value.toString();
    //+ "0";
    else if (Evalue[1].length === 1) return value.toString(); // + "0";
    return value;
  }
  return show ? (
    <>
      {/* <div>show is true, {delay}seconds passed</div> */}
      <List
        className="game__Tabs"
        header={
          <div>
            <span className="game__header">Schedule Game Leading Board</span>
          </div>
        }
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        size="small"
        bordered
        dataSource={Games}
        renderItem={(item) => (
          <List.Item onClick={() => navigateToGameDetails(item)}>
            <List.Item.Meta
              key={item.id}
              avatar={<Avatar src={props.iconUrl} />}
              title={
                // <a
                //   href={`/game/live/${sportsKey}/${item.teams[0]}/vs/${item.teams[1]}`}
                // >
                <p>
                  {`${item.teams[0]} 
                    V/S ${item.teams[1]}  `}
                </p>
                // </a>
              }
              description={`${item.sport_nice}, Date: ${item.commence_time} IST`}
            />

            <>
              <div className="site-button-ghost-wrapper1">
                <table>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      1
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Button type="primary" size="middle">
                        {item.odds.h2h[1]}
                      </Button>
                    </td>
                    <td>
                      <Button type="primary" size="middle" danger>
                        {item.odds.h2h_lay[1]}
                      </Button>
                    </td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      X
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Button type="primary" size="middle">
                        {item.odds.h2h[2] == null ? "----" : item.odds.h2h[2]}
                      </Button>
                    </td>
                    <td>
                      <Button type="primary" danger size="middle">
                        {item.odds.h2h_lay[2] == null
                          ? "----"
                          : item.odds.h2h_lay[2]}
                      </Button>
                    </td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "center" }}>
                      2
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Button type="primary" size="middle">
                        {item.odds.h2h[0]}
                      </Button>
                    </td>
                    <td>
                      <Button type="primary" size="middle" danger>
                        {item.odds.h2h_lay[0]}
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>

              {/* <div className="site-button-ghost-wrapper1">
                <div className="site__title">
                  <span> X </span>
                </div>

                <div className="site__odds">
                  <Button type="primary" size="middle">
                    {item.odds.h2h[2] == null ? "----" : item.odds.h2h[2]}
                  </Button>
                  <Button type="primary" danger size="middle">
                    {item.odds.h2h_lay[2] == null
                      ? "----"
                      : item.odds.h2h_lay[2]}
                  </Button>
                </div>
              </div>
              <div className="site-button-ghost-wrapper1">
                <div className="site__title">
                  <span> 2 </span>
                </div>

                <div className="site__odds">
                  <Button type="primary" size="middle">
                    {item.odds.h2h[0]}
                  </Button>
                  <Button type="primary" size="middle" danger>
                    {item.odds.h2h_lay[0]}
                  </Button>
                </div>
              </div> */}
            </>
          </List.Item>
        )}
      />
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
export default withRouter(GameList);
