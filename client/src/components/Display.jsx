/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Display = (props) => {
	const nav = useNavigate();
	const [type, setType] = useState([]);
	const [dishes, setDishes] = useState([]);

	useEffect(() => {
		if (Object.keys(props.user).length === 0) {
			nav("/admin/login");
		}
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/type")
			.then((res) => {
				setType(res.data);
			})
			.catch((err) => console.log(err));

		axios
			.get("http://localhost:8080/api/dish")
			.then((res) => {
				setDishes(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this dish?")) {
			axios
				.delete("http://localhost:8080/api/dish/" + id)
				.then((res) => {
					console.log(res);
					const deletedAry = dishes.filter((item) => item.dish.id !== id);
					setDishes(deletedAry);
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
				<h2 className="mb-4 text-center">All Dishes</h2>
				<table
					className="table table-bordered"
					style={{ width: "80%", margin: "auto" }}
				>
					<thead>
						<tr>
							<th scope="col">Dish Name</th>
							<th scope="col">Dish Price</th>
							<th scope="col">Dish Type</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{dishes.map((dish, idx) => {
							return (
								<tr key={dish.dish.id}>
									<td>{dish.dish.name}</td>
									<td>{dish.dish.price}</td>
									<td>{dish.type}</td>
									<td className="d-flex">
										<Link to={`/admin/editdish/${dish.dish.id}`}>
											<button className="btn btn-warning btn-sm">Edit</button>
										</Link>
										<button
											className="btn btn-danger btn-sm"
											style={{ marginLeft: "5px" }}
											onClick={() => handleDelete(dish.dish.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Display;
