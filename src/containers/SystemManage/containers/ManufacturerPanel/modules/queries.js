import {
  DEFAULT_FACILITY_FRAGMENT,
  DEFAULT_FACILITYTYPE_FRAGMENT
} from "schemas/fragments";
import { getFragment } from "utils/apollo";
import { gql } from "apollo-boost";

const facilityFragment = getFragment(DEFAULT_FACILITY_FRAGMENT);

const facilityTypeFragment = getFragment(DEFAULT_FACILITYTYPE_FRAGMENT);

export const LOAD_QUERY = gql`
  query {
    facilities (where: {isModel: true}){
      ...${facilityFragment[0]}
      parent {
        _id
      }
      
      facilitytype {
        ...${facilityTypeFragment[0]}
      }
      
    }
  }
  ${facilityFragment[1]}
  ${facilityTypeFragment[1]}
`;

export const DELETE_FACILITY_MUTATION = gql`
	mutation deleteFacility($id: ID!) {
		deleteFacility(_id: $id, deep: true) {
			facility {
				_id
			}
		}
	}
`;

export const EXPORT_EXCELS = gql`
  query excels($kind:String) {
    excels(kind:$kind)
  }
`

export const IMPORT_EXCEL = gql`
  mutation importExcel($kind:String,$data:[JSON]) {
    importExcel(kind:$kind,data:$data)
  }
`