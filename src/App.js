import { Router, Switch, Route } from "react-router-dom";
import { history } from "./helpers/history.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Login from "./components/auth/login.component.js";
import Register from "./components/auth/register.component.js";
import Home from "./components/home/home.component.js";
import Tag from "./components/tag/tag.component.js";
import AddBoard from "./components/board/addBoard.component.js"
import UpdateBoard from "./components/board/updateBoard.component.js"
import AddTag from "./components/tag/addTag.component.js"
import UpdateTag from "./components/tag/updateTag.component.js"
import UpdateUser from "./components/user/user.component.js"

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path={["/", "/home"]} component={Home} />
        <Route path="/board/:idboard" component={Tag} />
        <Route path="/addboard" component={AddBoard} />
        <Route path="/addtag" component={AddTag} />
        <Route path="/updateboard/:idboard" component={UpdateBoard} />
        <Route path="/updatetag/:idtag" component={UpdateTag} />
        <Route path="/updateuser" component={UpdateUser} />
      </Switch>
    </Router>
  );
};

export default App;
