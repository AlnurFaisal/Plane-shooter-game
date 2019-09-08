import * as firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};
firebase.initializeApp(config);
export const Database = firebase.database();
