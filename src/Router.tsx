import { createBrowserRouter } from "react-router-dom";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import App from "./App";
import Price from "./screens/Price";
import Chart from "./screens/Chart";
const router = createBrowserRouter([
  {
    path: "/nomadcoders-reactjs-challenge-crypto-tracker/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
