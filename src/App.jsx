import React, { useState, useRef, useEffect } from "react";

// Component
import LeftSideBar from "./components/LeftSideBar";

// Style
import "./app.sass";

// Image
import greenTomatoImage from "./assets/images/tomato--green.svg";
import orangeTomatoImage from "./assets/images/tomato--orange.svg";

const App = () => {
	const leftSideBarRef = useRef(null);
	// LeftSideBar 元件的狀態和函數
	const ToggleStatus = {
		CLOSED: 0, // 關閉
		LIST: 1, // 清單功能
		CHART: 2, // 分析圖表
	};
	// 表示當前開合狀態。
	const [toggle, setToggle] = useState(ToggleStatus.CLOSED);
	const handdleToggle = (mode) => {
		// 如果當前的狀態已經是要切換的狀態，則設置狀態為關閉
		// 否則設置狀態為要切換的狀態
		setToggle((prevToggle) => (prevToggle === mode ? ToggleStatus.CLOSED : mode));
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			// 檢查點擊事件的目標是否在 LeftSideBar 之外
			if (leftSideBarRef.current && !leftSideBarRef.current.contains(event.target)) {
				handdleToggle(ToggleStatus.CLOSED);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div className="relative h-screen flex flex-row justify-start overflow-hidden">
			{/* Left SideBar */}
			<div ref={leftSideBarRef}>
				<LeftSideBar toggle={toggle} handdleToggle={handdleToggle} ToggleStatus={ToggleStatus} />
			</div>
			{/* Main Content */}
			<div className="relative ">
				{/* Tomato */}
				<div className="absolute bottom-0 md:px-[20vw] px-[10vw] main-wrapper">
					<img src={orangeTomatoImage} className="w-full" alt={"little tomato - Orange"} />
				</div>
			</div>
		</div>
	);
};

export default App;
