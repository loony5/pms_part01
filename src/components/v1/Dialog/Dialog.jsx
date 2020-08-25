import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "components/v1/Button";
import Typography from "components/v1/Typography";
import PropTypes from "prop-types";
import Scrollbars from "components/v1/Scrollbar";
import { DialogActions } from "@material-ui/core";

function DialogForm({
	onClose,
	open,
	height,
	width,
	title,
	content,
	handleChangeSuccess,
	handleChangeCancel,
	successText,
	cancelText,
	scroll,
}) {
	return (
		<Dialog
			onClose={onClose}
			open={open}
			PaperProps={{
				style: {
					backgroundColor: "#0d0f14",
					borderRadius: 20,
					boxShadow: "0 0 20px 0 rgba(0, 226, 255, 0.17)",
					height: height ? height : "auto",
					width: width ? width : 500,
					maxWidth: width ? width : 500,
					padding: 20,
				},
			}}
			// 다이얼로그 open 시 뒷 배경 스타일
			BackdropProps={{
				style: {
					// backgroundColor: "transparent",
				},
			}}
		>
			{title && (
				<DialogTitle
					style={{ textAlign: "center", padding: 0, marginBottom: 10 }}
				>
					<Typography color="white" variant="h2">
						{title}
					</Typography>
				</DialogTitle>
			)}
			<DialogContent
				style={{
					padding: 0,
					// textAlign: "center",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{scroll ? (
					<Scrollbars
						style={{
							height: height ? height : "auto",
							width: width ? width : 500,
						}}
					>
						<div
							style={{
								height: height ? height : "auto",
								width: width ? width - 20 : 480,
							}}
						>
							{content}
						</div>
					</Scrollbars>
				) : (
						<>{content}</>
					)}
				{/* <div
					style={{
						position: "absolute",
						bottom: 0,
						left: "50%",
						transform: "translate(-50%)",
					}}
				>
				
				</div> */}
			</DialogContent>
			{(handleChangeSuccess || handleChangeSuccess) && (
				<DialogActions style={{ display: "flex", justifyContent: "center" }}>
					{handleChangeSuccess && (
						<Button
							onClick={handleChangeSuccess}
							style={{ height: 50, width: 170, marginRight: 10 }}
						>
							{successText}
						</Button>
					)}
					{handleChangeCancel && (
						<Button
							onClick={handleChangeCancel}
							style={{ height: 50, width: 170 }}
							bordered
						>
							{cancelText}
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
}

DialogForm.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.func,
	height: PropTypes.number,
	width: PropTypes.number,
	title: PropTypes.string,
	content: PropTypes.element,
	handleChangeSuccess: PropTypes.func,
	handleChangeCancel: PropTypes.func,
	successText: PropTypes.string,
	cancelText: PropTypes.string,
	scroll: PropTypes.bool,
};

DialogForm.defaultProps = {
	successText: "예",
	cancelText: "아니오",
	scroll: false,
};

export default DialogForm;
