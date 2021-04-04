import React from "react";
import { Card } from "antd";
import "../Components/HomeGameCards.css";

const { Meta } = Card;
const GameCards = (props) => {
  console.log("gameDetail=>", props);
  return (
    <div className="site-card-border-less-wrapper" hoverable>
      <Card
        hoverable
        style={{ width: 240 }}
        size={"default"}
        className="card__title"
        cover={<img alt="example" src={props.gameUrl} />}
      >
        <Meta
          title={props.gameTitle}

          // description="www.instagram.com"
        />
      </Card>
    </div>
  );
};
export default GameCards;
