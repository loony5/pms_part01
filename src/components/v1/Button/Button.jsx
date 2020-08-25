import React, { useRef } from "react";
import defaultStyle from "./Button.module.scss";
import cn from "classnames";
import PropTypes from "prop-types";

/**
 *
 * @param {{color: "white" | "red" | "brownish-grey", size: "small" | "medium" | "large",bordered: Boolean} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} param0
 */
function Button({
	size,
	color,
	bordered,
	style,
	children,
	onClick,
	onChange,
	disabled,
	className,
	type,
	...rest
}) {
	const ref = useRef();
	const handleClick = () => {
		if (type == "file") {

			ref.current.click();
		}
		onClick();
	}

	const handleChange = (e) => {
		onChange(e);
	}
	return (
		<>
			{type === "file" ?
				<>
					<button
						{...rest}
						type="button"
						disabled={disabled}
						className={cn(
							defaultStyle.Button,
							defaultStyle[size],
							defaultStyle[color],
							bordered && defaultStyle.bordered,
							disabled && defaultStyle.disabled,
							className
						)}
						style={style}
						onClick={handleClick}
					>
						{children}
					</button>
					<input type="file" ref={ref} onChange={handleChange} onClick={(e) => e.target.value = null} style={{ display: "none" }}></input>
				</>
				:
				<button
					{...rest}
					type={type ? type:"button"}
					disabled={disabled}
					className={cn(
						defaultStyle.Button,
						defaultStyle[size],
						defaultStyle[color],
						bordered && defaultStyle.bordered,
						disabled && defaultStyle.disabled,
						className
					)}
					style={style}
					onClick={onClick}
				>
					{children}
				</button>
			}
		</>
	);
}

Button.propTypes = {
	/** 버튼의 크기를 결정합니다. */
	size: PropTypes.oneOf(["small", "medium", "large"]),
	/** 버튼의 색상을 결정합니다. */
	color: PropTypes.oneOf(["white", "red", "brownish-grey"]),
	/** 버튼의 타입을 결정합니다. */
	bordered: PropTypes.bool,
	/** 클릭 이벤트를 실행합니다. */
	onClick: PropTypes.func
}

Button.defaultProps = {
	size: "medium",
	color: "brownish-grey",
	bordered: false,
	onClick: () => { },
	onChange: (e) => { }
};

export default Button;
