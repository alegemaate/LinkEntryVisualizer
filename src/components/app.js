import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./header";
import HomeView from "../views/home";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={HomeView} />
        </Switch>
      </main>
    </div>
  );
}
