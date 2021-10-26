import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Employees from "./pages/employees";
import Projects from "./pages/projects";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/employees" component={Employees} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </Router>
  );
}

export default App;
