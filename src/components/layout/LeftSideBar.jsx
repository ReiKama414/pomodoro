import React from "react";

// Component
import TodoList from "../function/TodoList";

// Icon
import listIcon from "../../assets/icons/icon-list.svg";
import analysisIcon from "../../assets/icons/icon-analysis.svg";

/**
 * 一個用於左側功能選單的 React 組件
 * @component
 * @param {number} toggle - 當前的開合狀態
 * @param {function} handdleToggle - 切換狀態的函數
 * @param {Object} ToggleStatus - 狀態的枚舉物件
 * @returns {ReactElement} 返回一個 React 元素
 */
const LeftSideBar = ({ toggle, handdleToggle, ToggleStatus }) => {
	return (
		<div
			className={`relative h-screen bg-customBg flex items-start ${
				toggle === ToggleStatus.CLOSED ? "md:w-20 w-10" : "md:w-[50vw] w-[100vw]"
			} duration-300 shadow-[0_0_40px_#0000003D] overflow-hidden`}>
			{/* 白色操作區塊 */}
			<div className="flex flex-col items-center justify-center md:w-20 w-10 h-full relative bg-customText md:gap-0 gap-3">
				<button
					type="button"
					className={`inline-flex justify-center items-center md:w-20 w-10 aspect-square ${
						toggle === ToggleStatus.LIST ? "bg-white" : ""
					}`}
					onClick={() => {
						handdleToggle(ToggleStatus.LIST);
					}}>
					<img src={listIcon} className="md:w-fit w-full p-1 aspect-square" alt={"List Icon"} />
				</button>
				<button
					type="button"
					className={`inline-flex justify-center items-center md:w-20 w-10 aspect-square ${
						toggle === ToggleStatus.CHART ? "bg-white" : ""
					}`}
					onClick={() => {
						handdleToggle(ToggleStatus.CHART);
					}}>
					<img src={analysisIcon} className="md:w-fit w-full p-1 aspect-square" alt={"Analysis Icon"} />
				</button>
			</div>
			{toggle === ToggleStatus.LIST ? (
				<div className="flex-1 h-full flex flex-col items-center justify-center p-10 whitespace-nowrap">
					<TodoList />
				</div>
			) : toggle === ToggleStatus.CHART ? (
				<div className="flex-1 h-full flex flex-col items-center justify-center text-3xl">Wait</div>
			) : (
				<>None</>
			)}
		</div>
	);
};

export default LeftSideBar;
