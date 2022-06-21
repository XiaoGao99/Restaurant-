import React from "react";
import Header from "./Header";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Index = (props) => {
	const [dishes, setDishes] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/dish")
			.then((res) => {
				setDishes(res.data);
			})
			.catch((err) => console.log(err));
	}, []);


	return (
		<div>
			<Header user={props.user} setUser={props.setUser}></Header>
			<div
				className="bg-light"
				style={{ width: "80%", height: "75vh", margin: "auto" }}
			>
				<h2 className="mb-4 text-center">Menu</h2>
				<table
					className="table table-bordered"
					style={{ width: "80%", margin: "auto" }}
				>
					<thead>
						<tr>
							<th scope="col">Dish Name</th>
							<th scope="col">Dish Price</th>
							<th scope="col">Dish Type</th>
						</tr>
					</thead>
					<tbody>
						{dishes.map((dish, idx) => {
							return (
								<tr key={dish.dish.id}>
									<td>{dish.dish.name}</td>
									<td>{dish.dish.price}</td>
									<td>{dish.type}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Index;