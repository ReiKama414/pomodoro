import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/tailwindcss.sass";
import App from "./App";

// Style
import "./index.sass";

// Router
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <>ErrorMessage</>,
	},
	{
		element: <>404</>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
