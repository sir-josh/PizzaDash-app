import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

const AppLayout = ({ children }) => {
	return (
		<div>
			<Header />

			<main><Outlet /></main>

			<CartOverview />
		</div>
	);
};

export default AppLayout;
