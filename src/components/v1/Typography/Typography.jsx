import React from "react";
import PropTypes from "prop-types";
import Style from "./Typography.module.scss";
import cn from "classnames";
/**
 *
 * @typedef {"almostBlack" | "dark" | "darkTwo" | "black" | "brownishGrey" | "brownGrey" | "white" | "orangeYellow" | "brightAqua" | "red" | "vibrantGreen"} TypographyColorType
 * @typedef {"h1" | "h2" | "h3" | "h4" | "p1" | "p2" |  "p3" | "p4"} TypographyVariantType
 * @typedef {{
 * 	color: TypographyColorType,
 * 	variant: TypographyVariantType,
 * 	children: JSX.Element
 * }} TypographyPropType
 *
 */
/**
 *
 * @param { import("@material-ui/core").TypographyProps | TypographyPropType} param0
 */
function Typography({ color, children, variant, style, className }) {
	return (
		<div
			className={cn(Style.Typography, Style[color], Style[variant], className)}
			style={style}
		>
			{children}
		</div>
	);
}

Typography.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,

	/** 글자의 크기를 결정합니다. */
	variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p1", "p2", "p3", "p4"]),

	/** 글자의 색깔을 결정합니다. */
	color: PropTypes.oneOf([
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
		"green",
		"yellow",
	]),
};

Typography.defaultProps = {
	color: "black",
	variant: "p1",
};

export default Typography;
