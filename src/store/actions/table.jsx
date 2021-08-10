import {GET_TABLE, GET_TABLE_DATA} from "../actionTypes"
export const getTable = () => async dispatch => {
    const payload = {
        columns: [
            {
              id: 1,
              title: "Available",
              cards: [
                {
                  id: 1,
                  title: "Id",
                },
                
                {
                  id: 2,
                  title: "Birth Day",
                },
                {
                  id: 3,
                  title: "Number Phone",
                }
              ]
            },
            {
              id: 2,
              title: "Visible",
              cards: [
                {
                  id: 4,
                  title: "First Name",
                },
                {
                  id: 5,
                  title: "Last Name",
                },
                {
                  id: 6,
                  title: "Position",
                },
                {
                  id: 7,
                  title: "Email",
                }
              ]
            }
          ]
    }
    dispatch({type: GET_TABLE, payload})
}

export const getTableData = () => async dispatch => {

    const payload = [
        { id: 1, bDay: '18.02.18', firstName: 'Alisa', lastName: 'Webpack', numberPhone: '+380986758941',role: 'front-end', email: 'qwerty@gmail.com' },
        { id: 2, bDay: '01.02.18', firstName: 'Sasha', lastName: 'Components', numberPhone: '+380986758941',role: 'front-end', email: 'qwerty@gmail.com' },
        { id: 3, bDay: '15.01.18', firstName: 'Linda', lastName: 'Directives', numberPhone: '+380986758941',role: 'front-end', email: 'qwerty@gmail.com' },
        { id: 4, bDay: '28.12.17', firstName: 'Stasy', lastName: 'Services', numberPhone: '+380986758941',role: 'front-end', email: 'qwerty@gmail.com' },
        { id: 5, bDay: '29.11.17', firstName: 'Liza', lastName: 'Zone', numberPhone: '+380986758941',role: 'front-end', email: 'qwerty@gmail.com' },
      ]
      dispatch({type: GET_TABLE_DATA, payload})
}