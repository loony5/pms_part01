import React from "react";
import TypographyComponent from "./Typography";
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
	title: "v1/Typography",
	component: TypographyComponent,
	decorators: [withKnobs],
};

export const Typography = () => {
	const color = select("color", [
		"almostBlack",
		"dark",
		"darkTwo",
		"black",
		"brownishGrey",
		"brownGrey",
		"white",
		"orangeYellow",
		"brightAqua",
		"red",
		"vibrantGreen",
	]);

	const variant = select(
		"variant",
		["h1", "h2", "h3", "h4", "p1", "p2", "p3", "p4"],
		"h1"
	);
	return (
		<TypographyComponent variant={variant} color={color}>
			Typography
		</TypographyComponent>
	);
};
