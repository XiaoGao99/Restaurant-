import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";

const Type = (props) => {
	const [type, setType] = useState([]);
	const [name, setName] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:8080/api/type")
			.then((res) => {
				console.log(res);
				setType(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleAdd = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/api/type", {
				name,
			})
			.then((res) => {
				console.log(res);
				setName("");
				setType(type.concat([res.data]));
			})
			.catch((err) => {
				console.log("error", err.response);
			});
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this type?")) {
			axios
				.delete("http://localhost:8080/api/type/" + id)
				.then((res) => {
					console.log(res);
					const deletedAry = type.filter((item) => item.id !== id);
					setType(deletedAry);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div>
			<Header user={props.user} setUser={props.setUser}></Header>
			<div
				className="bg-light"
				style={{ width: "80%", height: "75vh", margin: "auto" }}
			>
				<h2 className="mb-4 text-center">Type Management</h2>
				<table
					className="table table-bordered"
					style={{ width: "80%", margin: "auto" }}
				>
					<thead>
						<tr>
							<th scope="col">Type Name</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{type.map((cat, idx) => {
							return (
								<tr key={cat.id}>
									<td>{cat.name}</td>
									<td className="d-flex">
										<button
											className="btn btn-danger"
											onClick={() => handleDelete(cat.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<form
					onSubmit={(e) => handleAdd(e)}
					style={{ width: "50%", marginLeft: "10%" }}
					className="mt-5"
				>
					<div className="d-flex justify-content-start">
						<input
							type="text"
							name="cate"
							id="cate"
							className="form-control"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<input
							type="submit"
							value="Add Type"
							className="btn btn-success"
							style={{ marginLeft: "20px" }}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Type;
