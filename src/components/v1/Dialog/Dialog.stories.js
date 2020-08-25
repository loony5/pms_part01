import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Dialog, { ConfirmDialog, AlertDialog } from "components/v1/Dialog";
import Button from "components/v1/Button";
import Typography from "components/v1/Typography";

storiesOf("v1/Dialog", module).add("Dialog Theme", () =>
	React.createElement(() => {
		const [dialog, setDialog] = useState(false);
		const [dialog02, setDialog02] = useState(false);

		const content = (
			<Typography variant="h2" color="white" style={{ fontWeight: "normal" }}>
				content
			</Typography>
		);

		return (
			<>
				<div style={{ margin: 20 }}>
					<Button
						bordered
						size="medium"
						color="white"
						onClick={() => {
							setDialog(true);
						}}
					>
						title
					</Button>
					<Dialog
						open={dialog}
						onClose={() => {
							setDialog(false);
						}}
						title="title"
						content={content}
						handleChangeSuccess={() => {
							setDialog(false);
						}}
						handleChangeCancel={() => {
							setDialog(false);
						}}
					></Dialog>
				</div>

				<div style={{ margin: 20 }}>
					<Button
						bordered
						size="medium"
						color="white"
						onClick={() => {
							setDialog02(true);
						}}
					>
						title
					</Button>
					<Dialog
						open={dialog02}
						onClose={() => {
							setDialog02(false);
						}}
						width={418.5}
						height={399}
						title="아래 내용으로 설정하시겠습니까?"
						content={content}
						handleChangeSuccess={() => {
							setDialog02(false);
						}}
						handleChangeCancel={() => {
							setDialog02(false);
						}}
					></Dialog>
				</div>
			</>
		);
	})
);
