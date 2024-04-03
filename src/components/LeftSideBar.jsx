import React from "react";

const LeftSideBar = () => {
	const [toggle, setToggle] = React.useState(false);

	const handdleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div
			className={`h-screen bg-light flex items-start ${
				// toggle ? "w-20" : "w-1/2"
				"w-1/2"
			} duration-300 shadow-[0_0_40px_#0000003D]`}>
			<div className="flex w-20 h-full relative bg-customText"></div>
		</div>
	);
};

export default LeftSideBar;
