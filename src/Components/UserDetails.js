import React from "react";
import { Menu } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import Login from "../Containers/Login";
import GameTabs from "../Components/GameTabs";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const UserDetailsMenu = () => {
  const logoutEventTrigger = () => {
    console.log("logout");
    localStorage.clear();
    console.log("data are clear !!!");
  };
  return (
    <Menu style={{ padding: "5px" }}>
      <Menu.Item key="1">
        <Link to="/user/account/">Account Statement</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <a rel="noopener noreferrer" href="http://localhost:3000/">
          Unsetteled Bet
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a rel="noopener noreferrer" href="http://localhost:3000/">
          Profit / Loss
        </a>
      </Menu.Item>
      <Menu.Item key="4">
        <a rel="noopener noreferrer" href="http://localhost:3000/">
          Bet History
        </a>
      </Menu.Item>
      <Menu.Item key="5">
        <a rel="noopener noreferrer" href="http://localhost:3000/">
          Change Button Value
        </a>
      </Menu.Item>
      {/* <Menu.Item key="6" icon={<UserOutlined />}>
        <a
          
          rel="noopener noreferrer"
          href="http://localhost:3000/"
        >
          Change Password
        </a>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item
        key="7"
        icon={<IconFont type="icon-tuichu" />}
        onClick={logoutEventTrigger}
      >
        <Link to="/login/">Signout</Link>
      </Menu.Item>
      <Switch>
        <Route path="/login/">
          <Login />
        </Route>
      </Switch>
    </Menu>
  );
};

export default UserDetailsMenu;
