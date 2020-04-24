import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonButton,
  IonToast
} from "@ionic/react";
import React, { useEffect } from "react";

import useFirebaseUpload from "../hooks/useFirebaseUpload";
import { CameraResultType } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/dist/camera";

const Home: React.FC = () => {
  // setting up the hook to upload file and track its progress
  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError
  ] = useFirebaseUpload();

  const { photo, getPhoto } = useCamera();

  const handleTakePhoto = () => {
    if (availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
    }
  };

  // when the photo state changes, then call setFileData to upload
  // the image using firebase-hook
  useEffect(() => {
    setFileData(photo);
  }, [photo, setFileData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Firebase Upload Hook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        {/* get loading information from hook and display progress if necessary */}
        {isLoading && progress && (
          <IonProgressBar value={progress.value}></IonProgressBar>
        )}
        {availableFeatures.getPhoto ? null : (
          <input
            type="file"
            onChange={(e: any) => {
              setFileData(e.target.files[0]);
            }}
          />
        )}
        <pre style={{ fontSize: "smaller" }}>
          {JSON.stringify(dataResponse, null, 2)}
        </pre>
        {dataResponse && (
          <img
            src={dataResponse.downloadUrl}
            alt={dataResponse.metaData.name}
          />
        )}

        <div>
          <IonButton onClick={handleTakePhoto}>Take Photo</IonButton>
        </div>
        {/* <!-- the toast for errors --> */}
        <IonToast
          isOpen={isError ? true : false}
          onDidDismiss={() => clearError(false)}
          message={isError && isError.message}
          color="danger"
          position="bottom"
          buttons={[
            {
              text: "Done",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
