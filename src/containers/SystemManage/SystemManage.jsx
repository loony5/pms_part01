import React, { useState, useCallback } from "react";
import Tabs, { TabPanel } from "components/v1/Tabs";
import SearchBar from "components/SearchBar";
import Typography from "components/v1/Typography";
import ManufacturerPanel from "./containers/ManufacturerPanel";
import FacilityManagePanel from "./containers/FacilityManagePanel";
import FacilityCommTabPanel from "./containers/FacilityCommTabPanel";
import PointTabPanel from "./containers/PointTabPanel";
import OidPanel from "./containers/OidPanel";
import ServerManagePanel from "containers/SystemManage/containers/ServerManagePanel";
import SiteManagePanel from "containers/SystemManage/containers/SiteManagePanel";

const labels = [
	"제품관리",
	"장비관리",
	"통신채널",
	"상태포인트",
	"아날로그포인트",
	"OID",
	"서버관리",
	"사이트설정"
];

const SystemManage = props => {
	const [tab, setTab] = useState(0);
	const [isAnalogue, setIsAnalogue] = useState(false);

	const handleTabChange = value => {
		if (value === 3) {
			setIsAnalogue(false);
		} else if (value === 4) {
			setIsAnalogue(true);
		}
		setTab(value);
	};

	const tabPanelJsx = useCallback((size) => {
		switch (tab) {
			case 0:
				return <ManufacturerPanel size={size} />
			case 1:
				return <FacilityManagePanel size={size} />;
			case 2:
				return <FacilityCommTabPanel size={size} />;
			case 3:
			case 4:
				return <PointTabPanel isAnalogue={isAnalogue} size={size} />;
			case 5:
				return <OidPanel size={size} />
			case 6:
				return <ServerManagePanel size={size} />;
			case 7:
				return <SiteManagePanel size={size} />
		}
	}, [tab]);

	return (
		<>
			<Tabs
				labels={labels}
				value={tab}
				variant="rounded"
				onChange={handleTabChange}
			>
			</Tabs>
			<TabPanel variant="bordered" scrollbar={true}>
				<div style={{ width: props.size.width < 1920 && tab <= 4 && 1620 }}>
					{tabPanelJsx(props.size)}
				</div>
			</TabPanel>
		</>
	);
};
SystemManage.propTypes = {};

SystemManage.defaultProps = {};

export default SystemManage;
