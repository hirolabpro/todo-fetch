import React, { useState, useEffect } from "react";

export function Home() {
	const [task, setTask] = useState("");
	const [check, setCheck] = useState(false);
	const [list, setList] = useState([]);

	var url = "https://assets.breatheco.de/apis/fake/todos/user/hirolab";

	const loadTodo = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setList(data);
			})
			.catch(error => console.error("Error:", error.message));
	};
	const newTodo = () => {
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
			})
			.catch(error => console.error("Error:", error.message));
	};
	const updateTodo = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
			})
			.catch(error => console.error("Error:", error.message));
	};
	const deleteTodo = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				newTodo();
				alert(data.result);
			})
			.catch(error => console.error("Error:", error.message));
	};

	useEffect(() => {
		loadTodo();
	}, []);

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-10">
					<div className="card">
						<h1 className="display-8 text-secondary">
							Fetch To Do List
						</h1>
						<div className="card-header">
							<div className="row mt-4">
								<div className="col-sm-8 pb-3">
									<span>
										<i>My Todos</i>
									</span>
									<input
										className="form-control"
										type="text"
										value={task}
										onChange={e => {
											setTask(e.target.value);
										}}
									/>
								</div>

								<div className="col-sm-3 pb-3 d-flex align-items-end">
									<button
										type="button"
										className="form-control btn btn-secondary"
										onClick={() => {
											let obj = {
												label: task,
												done: check
											};
											setList(list.concat(obj));
											setCheck(false);
											setTask("");
										}}>
										Add Todo
									</button>
								</div>
							</div>
						</div>
						<div className="card-body text-primary">
							{!list
								? "loading..."
								: list.map((item, index) => {
										return (
											<label
												className="form-control text-left px-5"
												key={index}>
												{item.label}
											</label>
										);
								  })}
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<button
					type="button"
					className="btn btn-success"
					onClick={() => {
						updateTodo(list);
					}}>
					Update
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => {
						deleteTodo();
					}}>
					Delete
				</button>
			</div>
		</div>
	);
}
