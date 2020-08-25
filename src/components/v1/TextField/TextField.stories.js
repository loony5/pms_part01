import React, { useEffect } from "react";
import TextFieldComponent from "./TextField";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

export default {
	title: "v1/TextField",
	component: TextFieldComponent,
	decorators: [withKnobs],
};

export const TextField = () => {
	const [value, setValue] = React.useState("");

	const extension = text("extension", "");
	const size = select("size", ["large", "medium", "small"]);
	const disabled = boolean("disabled", false);
	const fullWidth = boolean("fullWidth", false);
	const error = boolean("error", false);
	const icon = boolean("icon", false);
	const autoFocus = boolean("autoFocus", true);

	return (
		<div style={{ padding: 20 }}>
			<TextFieldComponent
				value={value || ""}
				onChange={(e) => setValue(e.target.value)}
				extension={extension}
				size={size}
				disabled={disabled}
				fullWidth={fullWidth}
				error={error}
				icon={icon}
				autoFocus={autoFocus}
			/>
		</div>
	);
};
