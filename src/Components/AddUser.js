import React, { useState, useEffect } from "react";
import { Form, Input, Button, Popconfirm, message, InputNumber } from "antd";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import GloablData from "../Containers/GloablData";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 32 },
};
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 32,
  },
};
function AddUser() {
  const [CurrentUser, setCurrentUser] = useState({});
  const [CurrentUserWallet, setCurrentUserWallet] = useState({});
  const [showAddUserForm, setshowAddUserForm] = useState(true);
  const [showAddAmount, setshowAddAmount] = useState(false);
  const [showAddAmountForm, setshowAddAmountForm] = useState(false);
  const [addedUserID, setaddedUserID] = useState("");
  const [NewUserInfo, setNewUserInfo] = useState({});
  const [NewUserWallet, setNewUserWallet] = useState({});
  // const [walletAmoutSet, setwalletAmoutSet] = useState();
  // const [walletMsg, setwalletMsg] = useState("");

  const history = useHistory();

  useEffect(() => {
    // let timer1 = setTimeout(() => setShow(true), delay * 1000);

    async function UserInfo() {
      const selecteduserString = await localStorage.getItem("userDetails");
      console.log("userString", selecteduserString);
      const walletInfoString = await localStorage.getItem("availableBalance");
      console.log("wallet", walletInfoString, typeof walletInfoString);
      if (selecteduserString) {
        const selectedUser = JSON.parse(selecteduserString);
        setCurrentUser(selectedUser);
        console.log("Selected User to Set", selectedUser);
        console.log("Selected User role", selectedUser.role);
        if (selectedUser.role === "Player" || selectedUser.role === null) {
          localStorage.clear();
          history.push("/login/");
        }
      } else {
        console.log("homeNoUserInformation");
        history.push("/login/");
      }
      if (walletInfoString) {
        const wallet = JSON.parse(walletInfoString);
        setCurrentUserWallet(wallet);
      }
    }
    UserInfo();
  }, []);

  const AddUserByAuthUser = (requestedData) => {
    let createRole = "";
    if (CurrentUser) {
      if (CurrentUser.role === "Admin") {
        createRole = "1"; //smdl
      } else if (CurrentUser.role === "SMDL") {
        createRole = "2"; //mdl
      } else if (CurrentUser.role === "MDL") {
        createRole = "3"; //dl
      } else if (CurrentUser.role === "DL") {
        createRole = "4"; //player
      }
      console.log("You are to Autorized to Create", createRole);
      console.log("You want to Create Account ", requestedData);

      axios
        .post("http://45.79.121.209:8000/api/v1/users/", {
          username: requestedData.username,
          password: requestedData.password,
          role: createRole,
        })
        .then(
          (response) => {
            console.log(
              "Successful User Added",
              response,
              "resposeType",
              response.type
            );
            message.success("Successful User Added");
            setNewUserInfo(response.data);
            setaddedUserID(response.data.id);
            setshowAddUserForm(false);
            setshowAddAmountForm(true);
            // setshowAddAmount(true);
            //   setshowErrorMsg(false);
            //   navigateToHome(response.data);
          },
          (error) => {
            console.log(error);
            if (error) {
              message.error("A user with that username already exists !!");
              setshowAddUserForm(true);
              setshowAddAmountForm(false);
              setshowAddAmount(false);

              // setshowErrorMsg(true);
            }
          }
        );
    }
  };

  const AddUserToWallet = (wallet) => {
    console.log(
      "walletInfo want to Assign",
      wallet,
      wallet.amount,
      wallet.message
    );
    console.log(
      "walletInfo want to type",
      typeof wallet,
      typeof wallet.amount,
      typeof wallet.message
    );
    console.log("Created User Id", NewUserInfo.id);
    console.log("Current User Id", CurrentUser.user_id);
    console.log("Current User only Id", CurrentUser.id);

    console.log(
      "Current User WalletBalance",
      CurrentUserWallet.availablePoint,
      typeof CurrentUserWallet.availablePoint,
      CurrentUserWallet.wallet_id,
      CurrentUserWallet.id
    );
    let current_bal = parseInt(CurrentUserWallet.availablePoint);

    if (wallet.amount <= current_bal) {
      console.log(
        "your balance is",
        current_bal,
        "you want to  add",
        wallet.amount
      );
      const remainingBal = current_bal - wallet.amount;
      console.log("remain bal", remainingBal);

      // // here we have added/Deduct  amount to/from boths users Accounts.
      // // 1. New User : here we add wallet and amount ==>Pass
      axios
        .post("http://45.79.121.209:8000/api/v1/wallet/", {
          availablePoint: wallet.amount,
          event_description: wallet.message,
          wallet_id: addedUserID,
          created_by: CurrentUser.user_id,
        })
        .then((res) => {
          debugger;
          console.log("successful response for new created user", res);

          setNewUserWallet(res.data);
          localStorage.setItem("newUser", res.data);
          message.success("Wallet Assign !!");

          // window.location.reload();
        })
        .then((err) => {
          console.log("error response", err);
          // message.error("Wallet is not Added !!");
        });
      //   // 2. Current User : here we deduct  amount from wallet.==>pass

      console.log("add", CurrentUser.user_id, CurrentUserWallet.wallet_id);
      axios
        .put(`http://45.79.121.209:8000/api/v1/wallet/${CurrentUserWallet.id}/`, {
          availablePoint: remainingBal,
          event_description: wallet.message,
          wallet_id: CurrentUserWallet.wallet_id,
        })
        .then((res) => {
          console.log("successful amount adjested !!", res);
          setNewUserWallet(res.data);
          message.success("Wallet Assign !!");

          // window.location.reload();
        })
        .then((err) => {
          console.log("error response", err);
          // message.error("Wallet is not Added !!");
        });

      // here we are adding Txn info in New User Account
      const newUserFromStorage = localStorage.getItem("newUser");
      console.log(
        "AccountTXN wID & ID",
        CurrentUserWallet.wallet_id,
        CurrentUserWallet.id
      );
      console.log(
        "AccountTXN new wID & ID",
        NewUserWallet.wallet_id,
        NewUserWallet.id,
        newUserFromStorage.id,
        newUserFromStorage.wallet_id
      );
      axios
        .post("http://45.79.121.209:8000/api/v1/account/", {
          creditedPoint: wallet.amount,
          description: wallet.message,
          account_id: newUserFromStorage.id,
        })
        .then((res) => {
          console.log("Wallet_updated AccountTXN", res);
          message.success("Your New Users Account Balance Added!!");
        })
        .then((err) => {
          console.log("Wallet_updated AccountTXN", err);
        });

      //pass
      //here we are deducting TXN insert into Account Statement.
      axios
        .post(`http://45.79.121.209:8000/api/v1/account/`, {
          dabitedPoint: wallet.amount,
          description: wallet.message,
          account_id: CurrentUserWallet.id,
        })
        .then((res) => {
          console.log("ActiveUsers Wallet_updated", res);
          message.info("Your Account is Balance is Adjusted !!");
        })
        .then((err) => {
          console.log("ActiveUsers Wallet_updated failed", err);
        });
    } else {
      message.error("You Dont have Enough Balance");
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    AddUserByAuthUser(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onAssignWallet = (values) => {
    console.log("Success:", values);
    AddUserToWallet(values);
  };

  const onAssignWalletFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div id="container" className="login__container">
        <div id="loginform">
          {console.log("cred", Credential)}

          {showAddUserForm ? (
            <>
              <div className="loginForm">
                <h2 id="">Add User </h2>

                <Form
                  {...layout}
                  style={{ padding: "5px" }}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Please input username!" },
                    ]}
                  >
                    <Input placeholder="Create Username" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input password!" },
                    ]}
                  >
                    <Input.Password placeholder="8 character long" />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          ) : (
            ""
          )}

          {showAddAmountForm ? (
            <div className="loginForm">
              <>
                <h2 id="">Add User Wallet </h2>
                <Form
                  {...layout}
                  style={{ padding: "5px" }}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onAssignWallet}
                  onFinishFailed={onAssignWalletFailed}
                >
                  <Form.Item
                    {...formItemLayout}
                    label="Amount"
                    name="amount"
                    rules={[
                      { required: true, message: "Please add some Point !!" },
                    ]}
                  >
                    <InputNumber placeholder="Enter Amount" />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      { required: true, message: "Please add some detail !!" },
                    ]}
                  >
                    <Input placeholder="Add some meaningful Message" />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            </div>
          ) : (
            ""
          )}
          {showAddAmount ? (
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <Link>Add Wallet Amount</Link>
            </Popconfirm>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default AddUser;
