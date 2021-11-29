import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div className="w-full flex justify-center m-10">Home</div>} />
      </Switch>
    </Router>
  );
};

export default App;