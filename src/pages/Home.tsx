import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar
} from "@ionic/react";
import React from "react";

import useFirebaseUpload from "../hooks/useFirebaseUpload";

const Home: React.FC = () => {
  // setting up the hook to upload file and track its progress
  const [
    { data, isLoading, isError, progress },
    setFileData
  ] = useFirebaseUpload();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Firebase Upload Hook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* get error from hook and display if necessary */}
        {isError && <div>ERROR: {isError.message}</div>}

        {/* get loading information from hook and display progress if necessary */}
        {isLoading && progress && (
          <IonProgressBar value={progress.value}></IonProgressBar>
        )}
        <input
          type="file"
          onInput={(e: any) => {
            setFileData(e.target.files[0]);
          }}
        />
        <pre style={{ fontSize: "smaller" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
        {data && <img src={data.downloadUrl} alt={data.metaData.name} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
