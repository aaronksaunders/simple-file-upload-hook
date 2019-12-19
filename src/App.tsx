import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

import useAuth from "./hooks/useFirebaseAuth";

const App: React.FC = () => {
  const [{ authCheckDone }] = useAuth();
  debugger;
  return authCheckDone ? (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <IonRouterOutlet>
            <PrivateRoute path="/home" component={Home} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </Switch>
      </IonReactRouter>
    </IonApp>
  ) : (
    <IonLoading isOpen={!authCheckDone} />
  );
};

export default App;
