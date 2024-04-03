import React, { useState } from "react";
import LeftSideBar from "./components/LeftSideBar";

const App = () => {
	const [toggle, setToggle] = useState(false);

	const handdleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="relative h-screen flex flex-row justify-start">
			{/* Left SideBar */}
			<LeftSideBar />
			{/* Main Content */}
			<div>123456</div>
		</div>
	);
};

export default App;
