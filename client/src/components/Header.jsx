import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = (props) => {
	const navi = useNavigate();
  const {user, setUser} = props
	const handleLogOut = (e) => {
		e.preventDefault();
		setUser({});
		alert("You are successfuly logged out!");
		navi("/");
	};
	return (
		<div
			className="d-flex justify-content-around align-items-center"
			style={{ height: "20vh", width: "100vw", backgroundColor: "#AAAAAA" }}
		>
			<i className="fa-solid fa-bowl-food fa-4x"></i>

			<h1 className="text-light">My Yummy Restaurant</h1>

			<div>
				{Object.keys(user).length === 0 ? (
					<Link to={"/admin/login"}>Admin Login</Link>
				) : (
					<button className="btn btn-danger" onClick={(e) => handleLogOut(e)}>
						Log out
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
