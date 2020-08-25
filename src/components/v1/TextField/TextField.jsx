import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Style from "./TextField.module.scss";
import closeIcon from "images/icons/icon_close.png";
import Typography from "components/v1/Typography";

const CloseIcon = <img src={closeIcon} />;

/**
 * @typedef {{
 *  error: Boolean,
 *  value: string,
 *  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 *  extension: JSX.Element | string,
 *  size: "large" | "medium" | "small",
 *  disabled: Boolean,
 * fullWidth: Boolean,
 * icon: Boolean | JSX.Element
 * }} TextFieldPropsType
 */
/**
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & TextFieldPropsType } param0
 */

function TextField({
	value,
	error,
	onChange,
	extension,
	size,
	disabled,
	fullWidth,
	icon,
	autoFocus,
	required,
	helperText,
	placeholder,
	className,
	type,
	style
}) {
	/** @type {useRef<HTMLInputElement>()} */
	const inputRef = useRef();
	const [inputtingStyle, setInputtingStyle] = useState("");
	const IconComponent = typeof icon === "boolean" && icon ? CloseIcon : icon;

	const handleBlur = () => {
		setInputtingStyle("");
	};

	const handleChange = (event) => {
		setInputtingStyle(Style.inputting);
		onChange(event);
	};

	useEffect(() => {
		const inputElement = inputRef.current;

		inputElement.addEventListener("blur", handleBlur);

		return () => {
			inputElement.removeEventListener("blur", handleBlur);
		};
	}, []);
	return (
		<div>
			<div
				className={cn(
					Style.TextField,
					error ? Style.error : "",
					inputtingStyle,
					Style[size],
					disabled ? Style.disabled : "",
					fullWidth ? Style.fullWidth : "",
					className
				)}

				style={style}
			>
				<input
					value={value}
					className={cn(Style.input)}
					onChange={handleChange}
					ref={inputRef}
					autoFocus={autoFocus}
					placeholder={placeholder}
					required={required}
					type={"text" && type}
					disabled={disabled}
					style={{ backgroundColor: 'unset', WebkitTextFillColor: "white" }}
				></input>
				{extension && <span className={cn(Style.extension)}>{extension}</span>}
				{icon && value && (
					<div
						className={Style.icon}
						onClick={() => {
							const event = new Event("input", { bubbles: true });
							inputRef.current.value = "";
							inputRef.current.dispatchEvent(event);
							handleChange(event);
							setInputtingStyle("");
						}}
					>
						{IconComponent}
					</div>
				)}
			</div>
			{
				helperText &&
				<Typography className={Style.HelperText} color="red" variant="p2">
					{helperText}
				</Typography>
			}
		</div>
	);
}

TextField.propTypes = {
	value: PropTypes.string,
	/** input값의 변경이 있을때 호출되는 이벤트 */
	onChange: PropTypes.func,
	/** 에러 여부 표시에 사용 */
	error: PropTypes.bool,
	/** input값의 단위를 표시하기 위해서 사용 */
	extension: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
	/** 크기를 조절하는 용도 */
	size: PropTypes.oneOf(["large", "medium", "small"]),
	/** 부모의 크기만큼 채우기 위해 사용 */
	fullWidth: PropTypes.bool,
	required: PropTypes.bool,
	helperText: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
};

TextField.defaultProps = {
	value: "",
	onChange: (event) => { },
	error: false,
	size: "large",
	fullWidth: false,
	disabled: false,
	required: false,
	placeholder: "",
};

export default TextField;
