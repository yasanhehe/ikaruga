import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const links = [
		{
			id: 1,
			link: "home",
		},
		{
			id: 2,
			link: "about",
		},
		{
			id: 3,
			link: "contact",
		},
	];
};

export default Navbar;
