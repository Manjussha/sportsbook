import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Space, Spin } from "antd";
import "./BattingDash.css";
import BattingOdds from "./BattingOdds";
import gameWallpapers from "./gameHead.json";
const { Content, Footer } = Layout;
const delay = 3;
function BattingDash() {
  const [selectedGame, setSelectedGame] = useState({});
  const [showOdds, setOdds] = useState(false);
  const [show, setShow] = useState(false);
  const [sportWallpaper, setsportWallpaper] = useState("");
  let count = 0;

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), delay * 1000);
    async function getGameData() {
      const selectedGameString = await localStorage.getItem("selectedGame");
      const selectedGame = JSON.parse(selectedGameString);
      setSelectedGame(selectedGame);
      console.log("Selected Game on BatDash", selectedGame);
      setOdds(true);
      // grabSportURL(selectedGame.searchKey);
    }
    getGameData();
    // if (count === 0) {
    //   grabSportURL(selectedGame.searchKey);
    // }
    // count++;
    //
  }, []);

  // 10.60.10.113
  // 10.60.22.41

  function grabSportURL(key) {
    console.log("Wallpaper funtioncall", key);
    if (key) {
      let url = grabSportURL(key);
      // setsportWallpaper(grabSportURL(key));
      console.log("wallpaper", url);
    }
    // gameWallpapers.map((item) => {
    //   if (item.includes(key)) return item.wallpapers.img_url[0];
    // });
  }

  return show ? (
    <div className="batting__home ">
      <div className="batting__head ">
        <Layout className="site-layout  ">
          <Content style={{ margin: "0 0px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{selectedGame.sport_nice} </Breadcrumb.Item>
              <Breadcrumb.Item>
                {selectedGame.teams[0]} vs {selectedGame.teams[1]}
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* <Header className="site-layout-background" style={{ padding: 0 }}>
              <p>we can show here video stream if its needed !!</p>
            </Header> */}

            <div class="flex-container">
              {showOdds ? (
                <BattingOdds odds={selectedGame} />
              ) : (
                <div>Nothing to show BattingDash</div>
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    </div>
  ) : (
    <div className="loadingGameSpinner">
      {/* show is false, wait {delay}seconds */}
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}

export default BattingDash;
