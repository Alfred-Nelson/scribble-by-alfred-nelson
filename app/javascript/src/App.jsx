import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import Create from "components/Article/Create";
import Edit from "components/Article/Edit";
import Container from "components/Container";
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
      <Container>
        <Switch>
          <Route exact path="/article/new" component={Create} />
          <Route exact path="/article/:id/edit" component={Edit} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
