import React, { useEffect, useState, useMemo } from "react";
import { CREATE_FACILITY, LOAD_MODELNAME_CHECK } from "./modules/queries";
import { useLazyQuery, useMutation } from "react-apollo";

import _ from "lodash";
import PropTypes from "prop-types";
import Dialog from "components/v1/Dialog";
import TextField from "components/v1/TextField";
import Label from "components/v1/Label";

export default function ModelDialog({ open, onClose, onCreate, parentId }) {
	const [name, setName] = useState("");

	const variables = parentId ? { parent: parentId, FACILITY_NAME: name } : { FACILITY_NAME: name }
	const [insertModel] = useMutation(CREATE_FACILITY, {
		variables: {
			data: variables,
		},
		onCompleted(data) {
			if (!data || !data.createFacility || !data.createFacility.facility)
				return;
			handleClose();

			onCreate(data.createFacility.facility);
		},
	});
	const [isExistsFacilityNames, { data, loading, error }] = useLazyQuery(
		LOAD_MODELNAME_CHECK
	);

	useEffect(() => {
		isExistsFacilityNames({
			variables: {
				names: [name],
			},
		});
	}, [name]);

	const isExist = useMemo(() => {
		if (!data) return false;
		return data.isExistsFacilityNames[name].isExist;
	}, [data]);

	const handleClose = () => {
		setName("");
		onClose();
	};

	if (!open) return <></>;

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			title={parentId ? "CHILDREN 추가" : "제품추가"}
			height={247}
			width={419}
			successText="추가"
			cancelText="취소"
			content={
				<>
					<Label>이름</Label>
					<TextField
						id="inputModel"
						autoFocus
						label="이름"
						type="text"
						fullWidth
						value={name || ""}
						error={isExist}
						helperText={isExist ? "중복되는 이름이 있습니다." : ""}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</>
			}
			handleChangeCancel={handleClose}
			handleChangeSuccess={insertModel}
		></Dialog>
	);
}

ModelDialog.propTypes = {
	onCreate: PropTypes.func,
};

ModelDialog.defaultProps = {
	onCreate: () => { },
};
