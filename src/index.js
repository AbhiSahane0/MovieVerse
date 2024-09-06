import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      messages={[
        "terebal",
        "okay",
        "good",
        "great",
        "awsom",
        "5terebal",
        "6okay",
        "7good",
        "8great",
        "9awsom",
      ]}
    /> */}
  </React.StrictMode>
);
