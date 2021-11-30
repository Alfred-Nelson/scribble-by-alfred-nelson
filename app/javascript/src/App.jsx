import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import Dashboard from "components/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthHeaders(setLoading);
    registerIntercepts();
  }, []);

  if (loading) {
    return <p>Loading ... </p>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
