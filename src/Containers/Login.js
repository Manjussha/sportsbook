import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import "../Containers/Login.css";
import { useHistory } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const Login = (props) => {
  let history = useHistory();
  const [Credential, setCredential] = useState({});
  const [showErrorMsg, setshowErrorMsg] = useState(false);
  const [storeUserData, setstoreUserData] = useState({});
  const [showLockAccountMsg, setshowLockAccountMsg] = useState(false);
  const FormButton = (props) => (
    <div id="button" className="row">
      <button>{props.title}</button>
    </div>
  );

  const FormInput = (props) => (
    <div className="row">
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder} />
    </div>
  );
  const onFinish = (values) => {
    console.log("Success:", values);
    setCredential(values);
    checkForLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkForLogin = (requestedData) => {
    axios
      .post("http://45.79.121.209:8000/api/v1/api-token-auth/", {
        username: requestedData.username,
        password: requestedData.password,
      })
      .then(
        (response) => {
          console.log("Successful", response, "resposeType", response.type);
          message.success(
            "Successful login !! just Wait for few Seconds to sync with your Account !!"
          );

          setshowErrorMsg(false);
          navigateToHome(response.data);
        },
        (error) => {
          console.log(error);
          if (error) {
            message.error("login  Failed !!");
            setshowErrorMsg(true);
          }
        }
      );
  };
  function navigateToHome(userData) {
    console.log("userInformation :", userData);
    const userType = userData.role;
    if (userType) {
      console.log("user role is ", userType);
      const selectedGameToStoreString = JSON.stringify(userData);
      localStorage.setItem("userDetails", selectedGameToStoreString);
      console.log("userInformationStored", selectedGameToStoreString);

      if (userType) {
        history.push(`/home/`);
      }
    } else {
      setshowLockAccountMsg(true);
    }
  }

  return (
    <>
      <div id="container" className="login__container">
        <div id="loginform">
          {console.log("cred", Credential)}
          <h2 id="headerTitle">Login form </h2>
          <div className="loginINForm">
            <Form
              {...layout}
              style={{ padding: "15px" }}
              // name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            {showErrorMsg ? (
              <span style={{ color: "red" }}>*please check your Password </span>
            ) : (
              ""
            )}
            {showLockAccountMsg ? (
              <span style={{ color: "red" }}>
                Your account is locked due to some unwanted Action were
                perfomrmed !! please contact with relavent autorized person !!
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// export default withRouter(Login);
export default Login;
