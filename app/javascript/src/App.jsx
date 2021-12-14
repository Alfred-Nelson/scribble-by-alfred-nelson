import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import Create from "components/Article/Create";
import Edit from "components/Article/Edit";
import Container from "components/Container";
import Dashboard from "components/Dashboard";
import Public from "components/Public";
import Login from "components/Public/Login";
import Settings from "components/Settings";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(null);

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
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              redirectToLogin={redirectToLogin}
              setRedirectToLogin={setRedirectToLogin}
            />
          )}
        />
        <Route
          path="/public"
          component={() => (
            <Public
              redirectToLogin={redirectToLogin}
              setRedirectToLogin={setRedirectToLogin}
            />
          )}
        />
        <Container>
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route exact path="/article/new" component={Create} />
            <Route exact path="/article/:id/edit" component={Edit} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Container>
      </Switch>
    </Router>
  );
};

export default App;
