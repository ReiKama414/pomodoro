import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

// Icons
import bellIcon from "../../assets/icons/icon-bell.svg";
import cencelIcon from "../../assets/icons/icon-cancel.svg";
import pauseGreenIcon from "../../assets/icons/icon-pause--green.svg";
import pauseOrangeIcon from "../../assets/icons/icon-pause--orange.svg";
import playGreenIcon from "../../assets/icons/icon-play--green.svg";
import playOrangeIcon from "../../assets/icons/icon-play--orange.svg";

// Image
import greenTomatoImage from "../../assets/images/tomato--green.svg";
import orangeTomatoImage from "../../assets/images/tomato--orange.svg";

// Sounds
import ringVoice from "../../assets/sounds/button01b.mp3";

const MainContent = () => {
	// 右上當天時間區塊
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	// 番茄鐘區塊
	const DEFAULTTIME = 25 * 60;
	const RESTTIME = 5 * 60;
	const [time, setTime] = useState(DEFAULTTIME);
	const [isRunning, setIsRunning] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const [audio] = useState(new Audio(ringVoice));

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

	useEffect(() => {
		if (isRunning) {
			const id = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime === 0) {
						clearInterval(intervalId);
						setIsRunning(false);
						playBellSound();
						return RESTTIME;
					}
					return prevTime - 1;
				});
			}, 1000);

			setIntervalId(id);

			return () => clearInterval(id);
		}
	}, [isRunning]);

	const playBellSound = () => {
		audio.loop = true;
		audio.play();
	};

	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	const resetTimer = () => {
		clearInterval(intervalId);
		setIsRunning(false);
		setTime(DEFAULTTIME);
	};

	const stopBellSound = () => {
		audio.pause();
		audio.currentTime = 0;
		audio.loop = false;
	};

	const formatTime = () => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

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
						<p className="leading-tight" style={{ fontSize: "max(12.5vw, 6.5rem)" }}>
							{formatTime()}
						</p>
						{/* Function */}
						<div className="flex gap-4 items-center">
							{/* Bell */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-14 md:h-14 w-12 h-12 border-2 rounded-full button-hover-animation"
								onClick={stopBellSound}>
								<img src={bellIcon} className="w-full aspect-square p-3" alt={"Bell Icon"} />
							</button>
							{/* Play x Pause */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-20 w-18 aspect-square bg-customText rounded-full"
								onClick={toggleTimer}>
								<img
									src={isRunning ? pauseOrangeIcon : playOrangeIcon}
									className="w-full aspect-square p-6"
									alt={"Play/Pause Icon"}
								/>
							</button>
							{/* Cencel */}
							<button
								type="button"
								className="inline-flex justify-center items-center md:w-14 md:h-14 w-12 h-12 border-2 rounded-full button-hover-animation"
								onClick={resetTimer}>
								<img src={cencelIcon} className="w-full aspect-square p-3" alt={"Cencel Icon"} />
							</button>
						</div>
					</div>
					<div className="md:block hidden px-12">{/* 待功能結合 */}</div>
				</div>
				{/* Tomato */}
				<img src={orangeTomatoImage} className="w-full md:px-[20vw] px-[10vw]" alt={"little tomato - Orange"} />
			</div>
		</>
	);
};

export default MainContent;
