import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonLoading
} from "@ionic/react";
import { useHistory , RouteComponentProps } from "react-router-dom";

import useAuth from "../hooks/useFirebaseAuth";

const LoginPage: React.FC<any> = (props: RouteComponentProps<any>) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [
    { authUser, isError, isLoading },
    { signInWithEmailAndPassword }
  ] = useAuth();

  const login = async () => {
    let res = await signInWithEmailAndPassword(username, password);
    if (res) history.replace("/home");
    console.log(authUser);
    return res;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Firebase Upload Hook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={isLoading} />
        {isError ? <p>{isError.message}</p> : null}
        <IonItem lines="none">
          <IonLabel>In Login Page</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            value={username}
            onIonInput={e => setUsername((e.target as HTMLInputElement).value)}
            style={{
              width: "94%"
            }}
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Password</IonLabel>
          <IonInput
            value={password}
            onIonInput={e => setPassword((e.target as HTMLInputElement).value)}
            type="password"
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={login}>
          Login
        </IonButton>
        <IonButton expand="full">Create Account</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default LoginPage;
