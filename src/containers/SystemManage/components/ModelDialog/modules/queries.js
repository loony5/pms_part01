import {
	DEFAULT_FACILITYTYPE_FRAGMENT,
	DEFAULT_FACILITY_FRAGMENT,
} from "schemas/fragments";
import { getFragment } from "utils/apollo";
import { gql } from "apollo-boost";

const facilityTypeFragment = getFragment(DEFAULT_FACILITYTYPE_FRAGMENT);
const facilityFragment = getFragment(DEFAULT_FACILITY_FRAGMENT);

export const CREATE_FACILITY = gql`
	mutation createFacility($data:FacilityInput) {
		createFacility(input:{data:$data}) {
			facility {
				...${facilityFragment[0]}
			}
		}
	}

	${facilityFragment[1]}	
`;

export const LOAD_MODELNAME_CHECK = gql`
	query isExistsFacilityNames($names: [String]) {
		isExistsFacilityNames(FACILITY_NAMES: $names)
	}
`;
