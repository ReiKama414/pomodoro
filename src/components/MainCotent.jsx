import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

// Icons
import bellIcon from "../assets/icons/icon-bell.svg";
import cencelIcon from "../assets/icons/icon-cancel.svg";
import pauseGreenIcon from "../assets/icons/icon-pause--green.svg";
import pauseOrangeIcon from "../assets/icons/icon-pause--orange.svg";
import playGreenIcon from "../assets/icons/icon-play--green.svg";
import playOrangeIcon from "../assets/icons/icon-play--orange.svg";

// Image
import greenTomatoImage from "../assets/images/tomato--green.svg";
import orangeTomatoImage from "../assets/images/tomato--orange.svg";

const MainContent = () => {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");

	const updateTime = () => {
		const now = new Date();
		const formattedDate = format(now, "yyyy.MM.dd", { locale: zhTW });
		const formattedTime = format(now, "EEEE HH:mm:ss", { locale: zhTW });
		setCurrentDate(formattedDate);
		setCurrentTime(formattedTime);

		// 進行重繪之前呼叫回調函數
		requestAnimationFrame(updateTime);
	};

	useEffect(() => {
		updateTime();
	}, []);

	return (
		<>
			{/* Time */}
			<div className="w-full">
				<div className="absolute md:top-6 md:right-8 top-4 right-6 whitespace-nowrap">
					<p className="inline-flex gap-7 text-white opacity-50">
						<span>{currentDate}</span>
						<span>{currentTime}</span>
					</p>
				</div>
			</div>
			<div className="absolute inset-y-0 main-wrapper flex flex-col justify-end pt-16">
				{/* Content */}
				<div className="flex-1 grid md:grid-cols-2 grid-cols-1">
					<div className="flex flex-col items-center justify-center">
						{/* Clock */}
						<p className="leading-tight" style={{ "font-size": "max(12.5vw, 6.5rem)" }}>
							19:48
						</p>
						{/* Function */}
						<div className="flex gap-4 items-center">
							{/* Bell */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-14 md:h-14 w-12 h-12 border-2 rounded-full button-hover-animation">
								<img src={bellIcon} className="w-full aspect-square p-3" alt={"Bell Icon"} />
							</button>
							{/* Play x Pause */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-20 w-18 aspect-square bg-customText rounded-full">
								<img src={playOrangeIcon} className="w-full aspect-square p-6" alt={"Play Orange Icon"} />
							</button>
							{/* Cencel */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-14 md:h-14 w-12 h-12 border-2 rounded-full button-hover-animation">
								<img src={cencelIcon} className="w-full aspect-square p-3" alt={"Cencel Icon"} />
							</button>
						</div>
					</div>
					<div className="md:block hidden px-12">123</div>
				</div>
				{/* Tomato */}
				<img src={orangeTomatoImage} className="w-full md:px-[20vw] px-[10vw]" alt={"little tomato - Orange"} />
			</div>
		</>
	);
};

export default MainContent;
