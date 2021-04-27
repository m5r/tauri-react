import type { FunctionComponent } from "react";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: FunctionComponent = () => {
	return (
		<section>
			<h1 className="text-2xl">Hello worldHello world</h1>
			<Link to="/asd">lezgo</Link>
		</section>
	);
};

export default HomePage;
