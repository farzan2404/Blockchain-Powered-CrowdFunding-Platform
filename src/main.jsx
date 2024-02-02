import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider, useStorageUpload } from "@thirdweb-dev/react";
import { ethers } from "ethers";
// using this to wrap our app with the context.
import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import { Sepolia } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    desiredChainId={Sepolia}
    activeChain={Sepolia}
    // signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
    clientId="a3d57d4c197738d9bb915bc52d9fcf01"
    >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
