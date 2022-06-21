/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";

const EditDish = (props) => {
	const nav = useNavigate();
	const { id } = useParams();
	const [type, setType] = useState([]);
	const [name, setName] = useState("");
	const [nameErr, setNameErr] = useState("");
	const [price, setPrice] = useState("");
	const [priceErr, setPriceErr] = useState("");
	const [description, setDescription] = useState("");
	const [typeId, setTypeId] = useState("");

	useEffect(() => {
		if (Object.keys(props.user).length === 0) {
			nav("/admin/login");
		}
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/dish/" + id)
			.then((res) => {
				console.log(res);
				setName(res.data.dish.name);
				setDescription(res.data.dish.description);
				setPrice(res.data.dish.price);
				setTypeId(res.data.typeId);
			})
			.catch((err) => console.log(err));
		axios
			.get("http://localhost:8080/api/type")
			.then((res) => {
				setType(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleName = (e) => {
		setName(e.target.value);
		if (e.target.value.length < 3) {
			setNameErr("Name must be at least 3 characters long!");
		} else {
			setNameErr("");
		}
	};

	const handlePrice = (e) => {
		if (isNaN(e.target.value)) {
			setPriceErr("Price must be a number!");
		} else {
			if (e.target.value < 0) {
				setPriceErr("Price must be at least 0!");
			} else {
				if (e.target.value.length === 0) {
					setPriceErr("Price cannot be blank!");
				} else {
					setPriceErr("");
				}
			}
		}
		setPrice(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put("http://localhost:8080/api/dish/" + id, {
				name,
				price,
				description,
				typeId,
			})
			.then((res) => {
				console.log(res);
				alert("Edit successfully!");
				nav("/admin/view");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<Header user={props.user} setUser={props.setUser}></Header>
			<h1 className="text-center">Edit Dish</h1>
			<form
				style={{ width: "80%", margin: "auto" }}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => handleName(e)}
					/>
					{nameErr && <p className="text-danger">{nameErr}</p>}
				</div>

				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price:
					</label>
					<input
						type="text"
						className="form-control"
						id="price"
						value={price}
						onChange={(e) => handlePrice(e)}
					/>
					{priceErr && <p className="text-danger">{priceErr}</p>}
				</div>

				<div className="mb-3">
					<label htmlFor="type" className="form-label">
						Type:
					</label>
					<select
						className="form-control form-select"
						id="type"
						onChange={(e) => setTypeId(e.target.value)}
					>
						{type.map((cat, idx) => {
							return cat.id === typeId ? (
								<option value={cat.id} key={cat.id} selected>
									{cat.name}
								</option>
							) : (
								<option value={cat.id} key={cat.id}>
									{cat.name}
								</option>
							);
						})}
					</select>
					{typeId.length === 0 && (
						<p className="text-danger">Please select a type!</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description (MAX 255 characters)
					</label>
					<textarea
						className="form-control"
						id="description"
						rows="3"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				{nameErr.length > 0 || priceErr.length > 0 || typeId.length === 0 ? (
					<input
						type="submit"
						value="Add"
						className="btn btn-secondary"
						style={{ marginRight: "20px" }}
						disabled
					/>
				) : (
					<input
						type="submit"
						value="Edit"
						className="btn btn-warning"
						style={{ marginRight: "20px" }}
					/>
				)}
			</form>
		</div>
	);
};

export default EditDish;
