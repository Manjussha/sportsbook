import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Containers/Login";
import MainLayout from "./Containers/Layout";
import GameTabs from "./Components/GameTabs";
import BattingDash from "./Components/BattingDash";
import AddUser from "./Components/AddUser";
import AccountStatements from "./Components/AccountStatements";
import "./App.css";
import "antd/dist/antd.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login/" history={"login"}>
            <Login />
          </Route>
          <div>
            <MainLayout>
              <Route exact path="/">
                <Redirect to="/home/" />
              </Route>
              <Route path="/home/" component={GameTabs} />
              <Route path="/user/add/" component={AddUser} />
              <Route path="/user/account/" component={AccountStatements} />

              <Route path="/game/live/" component={BattingDash} />
              {/* <Route exact path="/">
                <Redirect to="/home/" />
              </Route>
              <Route path="/home/">
                <GameTabs />
              </Route>
              <Route path="/game/live/">
                <BattingDash />
              </Route> */}
            </MainLayout>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
