import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserDetailsMenu from "../Components/UserDetails";
import "../Containers/Layout.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MainLayout = (props) => {
  const [UserInformation, setUserInformation] = useState({});
  const [BalanceAvaliable, setBalanceAvaliable] = useState({});
  const [noWallet, setnoWallet] = useState(false);
  const [hideItems, sethideItems] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // let timer1 = setTimeout(() => setShow(true), delay * 1000);
    async function UserInfo() {
      const selecteduserString = await localStorage.getItem("userDetails");
      console.log("userString", selecteduserString);
      if (selecteduserString) {
        const selectedUser = JSON.parse(selecteduserString);
        setUserInformation(selectedUser);
        console.log("Selected User to Set", selectedUser);
        console.log("Selected User role", selectedUser.role);
        if (selectedUser.role !== "Player" || selectedUser.role === null) {
          sethideItems(false);
          console.log("show items");
        } else {
          sethideItems(true);
          console.log("hide items");
        }
      } else {
        console.log("homeNoUserInformation");
        history.push("/login/");
      }

      // grabSportURL(selectedGame.searchKey);
    }
    UserInfo();
    // if (count === 0) {
    //   grabSportURL(selectedGame.searchKey);
    // }
    // count++;
    //
  }, []);
  useEffect(() => {
    const user_id = UserInformation.user_id;
    if (user_id) {
      console.log("ballance Function called", user_id);
      async function userBalance() {
        await axios
          .get(`http://45.79.121.209:8000/api/v1/wallet/user/${user_id}/`)
          .then((res) => {
            console.log("balanceRes", res);
            setBalanceAvaliable(res.data[0]);
            const availableBalStored = JSON.stringify(res.data[0]);
            localStorage.setItem("availableBalance", availableBalStored);
            console.log("availableBalance", availableBalStored);
            setnoWallet(false);
          })
          .catch((err) => {
            console.log(err);
            setnoWallet(true);
          });
      }
      userBalance();
    }
  }, [UserInformation]);

  return (
    <Layout>
      {/* <div className="logo ant-layout-header1">
        {/* <h2 style={{ fontSize: "20px", color: "#08c" }}>Sports Battle</h2> */}

      <Layout>
        <Header
          className="ant-layout-header1"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            padding: "0px",
            top: "0px",
          }}
        >
          {/* <div className="ant-layout-header"> */}
          <Menu mode="horizontal">
            <Menu.Item style={{ fontSize: "20x", fontWeight: "700" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Sports Battle
              </span>
            </Menu.Item>
            <Menu.Item key="2" style={{ float: "right" }}>
              <Dropdown overlay={UserDetailsMenu}>
                <div>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    href="/"
                  >
                    {
                      <UserOutlined
                        style={{ fontSize: "20px", color: "#08c" }}
                      />
                    }
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        paddingRight: "5px",
                      }}
                    >
                      {UserInformation.username}
                    </span>
                    <DownOutlined />
                  </a>
                </div>
              </Dropdown>
            </Menu.Item>
            <Menu.Item key="1" style={{ float: "right" }}>
              <DollarCircleOutlined
                style={{ fontSize: "20px", color: "#08c" }}
              />
              <span
                style={{ fontSize: "16px", color: "#08c", fontWeight: "600" }}
              >
                {noWallet
                  ? "0.00"
                  : BalanceAvaliable
                  ? BalanceAvaliable.availablePoint
                  : "0.00"}
              </span>
            </Menu.Item>
            <Menu.Item key="3" style={{ float: "right" }} hidden={hideItems}>
              <a href="/user/add/">
                <UserAddOutlined style={{ fontSize: "20px", color: "#08c" }} />
                Add User
              </a>
            </Menu.Item>
            {/* <Menu.Item key="2">
                <span>
                  {<BellOutlined style={{ fontSize: "20px", color: "#08c" }} />}

                  <span>Notification</span>
                </span>
              </Menu.Item> */}
          </Menu>
          {/* </div> */}
        </Header>
      </Layout>
      <Header className="header" style={{ padding: "0 1px", marginTop: 64 }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          {/* <Menu.Item key="1">
            <img src={img_url} alt="sportsBattle" className="header__logo" />
          </Menu.Item> */}
          <Menu.Item key="1" href="/home/">
            <a href="/home/">
              <HomeOutlined />
            </a>
          </Menu.Item>
          <Menu.Item key="16">CRICKET</Menu.Item>
          <Menu.Item key="2">TENNIS</Menu.Item>
          <Menu.Item key="3">FOOTBALL</Menu.Item>
          <Menu.Item key="4">LUDO</Menu.Item>
          <Menu.Item key="5">LIVE ROULETTE</Menu.Item>
          <Menu.Item key="6">BINARY</Menu.Item>
          <Menu.Item key="7">MAHABHARAT</Menu.Item>
          <Menu.Item key="8">PASAGALI/DESAWAR</Menu.Item>
          <Menu.Item key="9">LUCKY 7</Menu.Item>
          <Menu.Item key="10">32CARDS</Menu.Item>
          <Menu.Item key="11">LIVE TEENPATTI</Menu.Item>
          <Menu.Item key="12">ANDAR BAHAR</Menu.Item>
          <Menu.Item key="13">ANDAR BAHAR B</Menu.Item>
          <Menu.Item key="14">BBACCARAT</Menu.Item>
          <Menu.Item key="15">DICE</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          hidden
          // collapsed
          style={{ border: "1px dotted red" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu title="All Sports" />
            <SubMenu key="sub1" icon={<UserOutlined />} title="CRICKET">
              <Menu.Item key="1" href="/game/live">
                <a href="/game/live"> Live Game</a>
              </Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="FOOTBALL">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="TENNISH">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 5,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
