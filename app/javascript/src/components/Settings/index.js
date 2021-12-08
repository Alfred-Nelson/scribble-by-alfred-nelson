import React from "react";

import { Redirect, Route, Switch } from "react-router";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirection from "./Redirection";
import SidePanel from "./SidePanel";

const Settings = () => {
  return (
    <div>
      <SidePanel>
        <Switch>
          <Redirect exact path="/settings" to="/settings/general" />
          <Route path="/settings/general" component={General} />
          <Route path="/settings/redirection" component={Redirection} />
          <Route
            path="/settings/manage-category"
            component={ManageCategories}
          />
        </Switch>
      </SidePanel>
    </div>
  );
};

export default Settings;
