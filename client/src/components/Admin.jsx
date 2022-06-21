/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Admin = (props) => {
	const nav = useNavigate();

	useEffect(() => {
		if (Object.keys(props.user).length === 0) {
			nav("/admin/login");
		}
	}, []);

	return (
		<div className="text-center">
			<Header user={props.user} setUser={props.setUser}></Header>
			<Link to={"/admin/view"} style={{display:'block'}}>View All Dishes</Link>
			<Link to={"/admin/adddish"} style={{display:'block'}}>Add Dishes</Link>
			<Link to={"/admin/type"} style={{display:'block'}}>Manage Dish Type</Link>
		</div>
	);
};

export default Admin;
