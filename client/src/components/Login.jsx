import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const [username, setUsername] = useState("");
	const [usernameErr, setUsernameErr] = useState("");
	const [password, setPassword] = useState("");
	const [pwErr, setPwErr] = useState("");
	const nav = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get(`http://localhost:8080/api/admin/${username}/${password}`)
			.then((res) => {
				props.setUser({
					email: res.data.email,
					username: res.data.username,
				});
				nav("/admin");
			})
			.catch((err) => console.log(err));
	};

	const handleUsername = (e) => {
		setUsername(e.target.value);
		if (e.target.value.length < 3) {
			setUsernameErr("Username must be at least 3 characters long!");
		} else {
			setUsernameErr("");
		}
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length < 8) {
			setPwErr("Password must be at least 8 characters long!");
		} else {
			setPwErr("");
		}
	};
	return (
		<div>
			<h1 className="text-center text-primary">Welcome to admin panel!</h1>
			<div style={{ width: "50%", margin: "auto" }}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Username:
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							value={username}
							onChange={(e) => handleUsername(e)}
						/>
						{usernameErr && <p className="text-danger">{usernameErr}</p>}
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password:
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => handlePassword(e)}
						/>
						{pwErr && <p className="text-danger">{pwErr}</p>}
					</div>
					{pwErr.length > 0 || usernameErr.length > 0 ? (
						<input
							type="submit"
							value="Login"
							className="btn btn-secondary"
							disabled
						/>
					) : (
						<input type="submit" value="Login" className="btn btn-primary" />
					)}
					<h3>Username: admin</h3>
					<h3>Password: 12345678</h3>
				</form>
				
			</div>
		</div>
	);
};

export default Login;
