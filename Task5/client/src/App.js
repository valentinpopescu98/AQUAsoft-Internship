import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Employees from "./pages/employees";
import Projects from "./pages/projects";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/employees" component={Employees} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </Router>
  );
}

export default App;
