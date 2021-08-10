import {GET_TABLE, GET_TABLE_DATA} from "../actionTypes"
const INITIAL_STATE = {
    columns: {},
    tableData: [],
}
export default function tableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TABLE: 
            return {
                ...state,
                columns: action.payload
            }
        case GET_TABLE_DATA:
            console.log("GET_TABLE_DATA")
            return {
                ...state,
                tableData: action.payload
            }
      default:
        return state
    }
  }