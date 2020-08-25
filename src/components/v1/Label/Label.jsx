import React from "react";
import PropTypes from "prop-types";
import Typography from "components/v1/Typography";
import Style from "./Label.module.scss";

/**
 *
 * @param { import("components/v1/Typography/Typography").TypographyPropType} param0
 */
function Label({ children, style, color = "brownishGrey", variant = "p2" }) {
	return (
		<Typography
			color={color}
			variant={variant}
			style={style}
			className={Style.Label}
		>
			{children || "　"}
		</Typography>
	);
}

Label.propTypes = {};

export default Label;
