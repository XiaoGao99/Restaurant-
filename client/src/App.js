import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { useState } from "react";
import Type from "./components/Type";
import Display from "./components/Display";
import AddDish from "./components/AddDish";
import EditDish from "./components/EditDIsh";
import Index from "./components/Index";
function App() {
	const [user, setUser] = useState({});
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Index user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin/login"
					element={<Login user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin"
					element={<Admin user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin/type"
					element={<Type user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin/view"
					element={<Display user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin/adddish"
					element={<AddDish user={user} setUser={setUser} />}
				></Route>

				<Route
					path="/admin/editdish/:id"
					element={<EditDish user={user} setUser={setUser} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
