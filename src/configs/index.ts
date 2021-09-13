import devConfig from "./development.json";
import prodConfig from "./production.json";

const config: Config =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;

export interface Config {
  firebase: FirebaseConfig;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
