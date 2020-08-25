import React, { useState, useEffect, useMemo } from "react";
import { LOAD_QUERY, DELETE_FACILITY_MUTATION, EXPORT_EXCELS, IMPORT_EXCEL } from "./modules/queries";
import { useMutation, useLazyQuery, useQuery } from "react-apollo";
import CustomTable from "components/v1/CustomTable";
import Button from "components/v1/Button";
import _ from "lodash";
import Progress from "components/Progress";
import SearchBar from "components/v1/SearchBar";
import UpdateFacilityDialog from "containers/SystemManage/components/UpdateFacilityDialog";
import util, { loadExcel } from "utils/util";
import { facilitiesToModel } from "helpers/facility";

import Grid from "@material-ui/core/Grid";
import ModelDialog from "containers/SystemManage/components/ModelDialog";
import useStore from "hooks/useStore";
import Dialog from "components/v1/Dialog";
import Select from "components/v1/Select";
import Excel from "containers/SystemManage/containers/ManufacturerPanel/excel/Excel"

const headers = [
	{
		id: "FACILITY_NAME",
		label: "제품명",
	},
	{
		id: "version",
		label: "버전",
	},
	{
		id: "facilitytype.name",
		label: "제품타입",
	},
];

export default function Manufacturer({ size }) {
	const [search, setSearch] = useState("");
	const [dialog, setDialog] = useState(false);
	const [downloadDialog, setDownloadDialog] = useState(false);
	const [uploadDialog, setUploadDialog] = useState(false);

	const [itemSelected, setItemSelected] = useState("");
	const [facilities, setFacilities] = useState([]);
	const uiStore = useStore("uiStore");

	const [selectedFacility, setSelectedFacility] = useState({});
	const [updateDialog, setUpdateDialog] = useState(false);
	const [children, setChildren] = useState(false);

	const { data, loading, error, refetch } = useQuery(LOAD_QUERY, {
		fetchPolicy: "network-only",
	});

	const [importExcel, importExcelResult] = useMutation(IMPORT_EXCEL, {
	});

	const [exportExcels, exportExcelResult] = useLazyQuery(EXPORT_EXCELS, {
		fetchPolicy: "network-only",

	});
	const [deleteFacility, deleteFacilityResult] = useMutation(
		DELETE_FACILITY_MUTATION,
		{
			refetchQueries: [{ query: LOAD_QUERY }],
		}
	);

	const exportData = useMemo(() => {
		if (!exportExcelResult.data || !exportExcelResult.data.excels) return {
			headers: [],
			data: []
		}
		const { data } = exportExcelResult;

		return data.excels;
	}, [exportExcelResult.data])

	useEffect(() => {
		setFacilities(
			facilitiesToModel(_.get(data, "facilities", [])).filter((o) =>
				util.search(o, search, [
					"FACILITY_NAME",
					"facilitytype.name",
					"version",
				])
			)
		);
	}, [data, search]);

	function handleDeleteFacilityClick(facility) {
		uiStore.confirm({
			description: "삭제하시겠습니까?",
			onSuccess: () =>
				deleteFacility({
					variables: {
						id: facility._id,
					},
				}),
		});
	}

	function handleUpdateFacilityClick(facility) {
		setSelectedFacility(facility);
		setUpdateDialog(true);
	}

	function handleSettingFacilityClick(facility) {
		// 설정클릭 - children 등록 dialog open
		setSelectedFacility(facility);
		setChildren(true);
		setUpdateDialog(true);
	}

	const onSubmit = () => {
		setUpdateDialog(false);
		setSelectedFacility({});
		refetch();
	};


	if (loading) return <Progress />;

	return (
		<>
			<Grid container alignItems="flex-end" justify="space-between">
				<Grid item>
					<SearchBar
						value={search}
						onChangeValue={(value) => setSearch(value)}
						onSubmit={(value) => setSearch(value)}
					/>
				</Grid>
				<Grid item>
					<Button
						bordered
						children="엑셀 다운로드"
						onClick={() => { setDownloadDialog(true) }}
					/>
					<Button
						bordered
						children="엑셀 업로드"
						onClick={() => { setUploadDialog(true) }}
					/>
				</Grid>
			</Grid>
			<Grid item>
				<CustomTable
					headers={headers}
					items={facilities}
					onEdit={handleUpdateFacilityClick}
					onDelete={handleDeleteFacilityClick}
					onSetting={handleSettingFacilityClick}
					style={{ height: size.height - 430, marginTop: 24, marginBottom: 24 }}
				/>
				<Button
					bordered
					onClick={() => {
						setDialog(true);
					}}
					children="추가"
				/>
			</Grid>
			<ModelDialog
				open={dialog}
				onClose={() => {
					setDialog(false);
					refetch();
				}}
				onCreate={handleUpdateFacilityClick}
			/>
			<UpdateFacilityDialog
				open={updateDialog}
				onClose={() => {
					setUpdateDialog(false);
					setSelectedFacility({});
					setChildren(false);
					refetch();
				}}
				_id={selectedFacility._id}
				onSubmit={onSubmit}
				children={children}
			/>
			<Dialog
				open={downloadDialog}
				width={352}
				onClose={() => { setDownloadDialog(false) }}
				title="엑셀다운로드"
				content={
					<div style={{ display: "inline-flex" }}>
						<Select
							items={[{ value: "model" }, { value: "commtype" }, { value: "unit" },]}
							value={itemSelected}
							unique="value"
							isDefault={false}
							view="value"
							size="medium"
							onChange={e => {
								setItemSelected(e);
								exportExcels({
									variables: {
										kind: e
									}
								}
								)
							}
							}
						/>
						<Excel {...exportData} name={itemSelected}>
							<Button
								bordered
								children="다운로드"
								style={{ marginLeft: 6 }}
							/>
						</Excel>
					</div>
				}
			/>
			<Dialog
				open={uploadDialog}
				width={352}
				onClose={() => { setUploadDialog(false) }}
				title="엑셀 업로드"
				content={
					<div style={{ display: "inline-flex" }}>
						<Select
							items={[{ value: "model" }, { value: "commtype" }, { value: "unit" },]}
							value={itemSelected}
							unique="value"
							isDefault={false}
							view="value"
							size="medium"
							onChange={e => {
								setItemSelected(e);
								exportExcels({
									variables: {
										kind: e
									}
								}
								)
							}
							}
						/>
						<Button
							bordered
							children="업로드"
							style={{ marginLeft: 6 }}
							type="file"
							onChange={async (e) => {
								const files = e.target.files;
								if (files && files[0]) {
									const res = await loadExcel(files[0]);
									importExcel({
										variables: {
											kind: itemSelected,
											data: res
										}
									})
								}
							}}
						/>
					</div>
				}
			/>
		</>
	);
}
