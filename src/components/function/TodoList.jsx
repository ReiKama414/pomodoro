import React, { useState, useEffect } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

// Icons
import editIcon from "../../assets/icons/icon-edit.svg";
import deleteIcon from "../../assets/icons/icon-delete.svg";

/**
 * TodoList 展示待辦事項列表
 * 使用者可以新增、編輯、刪除待辦事項，並且可以查看已完成的事項
 * @returns
 */
const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});
	const [completedTodos, setCompletedTodos] = useState(() => {
		const savedCompletedTodos = localStorage.getItem("completedTodos");
		return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
	});
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedTodoText, setEditedTodoText] = useState("");
	const [activeTab, setActiveTab] = useState("uncompleted");

	// 從本地儲存中取資料
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// 從本地儲存中取資料
	useEffect(() => {
		localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
	}, [completedTodos]);

	// 處理輸入框值的變化
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// 新增待辦事項
	const handleAddTodo = () => {
		if (inputValue.trim() !== "") {
			setTodos([...todos, { id: todos.length + 1, text: inputValue }]);
			setInputValue("");
		}
	};

	// 切換待辦事項的狀態（未完成 => 已完成）
	const handleToggleTodo = (todo) => {
		const updatedTodos = todos.filter((t) => t.id !== todo.id);
		setTodos(updatedTodos);
		setCompletedTodos([...completedTodos, todo]);
	};

	// 撤銷已完成的待辦事項
	const handleUndoTodo = (todo) => {
		const updatedCompletedTodos = completedTodos.filter((t) => t.id !== todo.id);
		setCompletedTodos(updatedCompletedTodos);
		setTodos([todo, ...todos]);
	};

	// 切換 Tab
	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	// 開始編輯待辦事項
	const handleStartEditTodo = (todo) => {
		setEditingTodoId(todo.id);
		setEditedTodoText(todo.text);
	};

	// 確認編輯待辦事項
	const handleConfirmEditTodo = (todo) => {
		const updatedTodos = todos.map((t) => {
			if (t.id === todo.id) {
				return { ...t, text: editedTodoText };
			}
			return t;
		});
		setTodos(updatedTodos);
		setEditingTodoId(null);
		setEditedTodoText("");
	};

	// 刪除待辦事項
	const handleDeleteTodo = (todo) => {
		const updatedTodos = todos.filter((t) => t.id !== todo.id);
		setTodos(updatedTodos);
	};

	// 輸入框快捷 Enter 動作
	const handleEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddTodo();
		}
	};

	return (
		<>
			<div className="flex md:flex-row flex-col items-center justify-between w-full mb-10 gap-2">
				{/* Title */}
				<h3 className="font-bold" style={{ fontSize: "max(2.5vw, 2.5rem)" }}>
					代辦清單
				</h3>
				{/* Tab */}
				<div className="inline-flex gap-4" style={{ fontSize: "max(1vw, 1rem)" }}>
					<button
						className={`${activeTab === "uncompleted" ? "" : "opacity-50"} px-4 py-1`}
						onClick={() => handleTabChange("uncompleted")}>
						未完成
					</button>
					<button
						className={`${activeTab === "completed" ? "" : " opacity-50"} px-4 py-1`}
						onClick={() => handleTabChange("completed")}>
						已完成
					</button>
				</div>
			</div>

			{/* 輸入框 */}
			<div className="relative flex mb-10 w-full">
				<input
					type="text"
					className="bg-white text-customBg rounded-full px-6 py-3.5 flex-1 leading-loose"
					style={{ fontSize: "max(1vw, 1rem)" }}
					placeholder="新增代辦事項"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleEnterKeyPress}
				/>
				<button
					className="absolute min-w-12 bg-customPrimary text-white text-[20px] px-4 py-1 right-2 inset-y-0 rounded-full my-2"
					onClick={handleAddTodo}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>

			{/* 未完成 */}
			<ul
				className="w-full h-[50vh] overflow-y-auto"
				style={{ display: activeTab === "uncompleted" ? "block" : "none" }}>
				{todos.map((todo, index) => (
					<li
						key={todo.id}
						className={`flex items-center py-5 min-h-10 border-t-[1px] border-white/25 pe-1 ${
							todos.length === index + 1 ? "border-b-[1px]" : ""
						}`}>
						{editingTodoId === todo.id ? (
							<>
								<input
									type="text"
									className="bg-transparent flex-1 mx-2 px-2 py-3"
									value={editedTodoText}
									onChange={(e) => setEditedTodoText(e.target.value)}
								/>
								<button className="text-white p-2" onClick={() => handleConfirmEditTodo(todo)}>
									<FontAwesomeIcon icon={faCheck} />
								</button>
							</>
						) : (
							<>
								<label className="form-control">
									<input type="checkbox" name="checkbox" onChange={() => handleToggleTodo(todo)} />
									<span className="leading-relaxed whitespace-break-spaces" style={{ fontSize: "max(1vw, 1rem)" }}>
										{todo.text}
									</span>
								</label>
								<button className="ml-auto text-white" onClick={() => handleStartEditTodo(todo)}>
									<img src={editIcon} />
								</button>
								<button className="ml-2 text-white" onClick={() => handleDeleteTodo(todo)}>
									<img src={deleteIcon} />
								</button>
							</>
						)}
					</li>
				))}
			</ul>

			{/* 已完成 */}
			<ul className="w-full h-[50vh] overflow-y-auto" style={{ display: activeTab === "completed" ? "block" : "none" }}>
				{completedTodos.map((todo, index) => (
					<li
						key={todo.id}
						className={`flex items-center py-5 min-h-10 border-t-[1px] border-white/25 pe-1 ${
							todos.length === index + 1 ? "border-b-[1px]" : ""
						}`}>
						<label className="form-control">
							<input type="checkbox" name="checkbox" checked onChange={() => handleUndoTodo(todo)} />
							<span
								className="line-through opacity-50 leading-relaxed whitespace-break-spaces"
								style={{ fontSize: "max(1vw, 1rem)" }}>
								{todo.text}
							</span>
						</label>
					</li>
				))}
			</ul>
		</>
	);
};

export default TodoList;
