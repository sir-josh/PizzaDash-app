import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
	return (
		<header>
			<Link to="/">PizzaDash Co.</Link>
			<SearchOrder />
			<p>Mirabel</p>
		</header>
	);
}

export default Header;
