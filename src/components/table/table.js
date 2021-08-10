import React, {useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';
import { useSelector, useDispatch } from 'react-redux';
import {getTable, getTableData} from "../../store/actions/table"

const TableParagraf = (prop) => {
    let thTitles = [];
    prop.colName.cards.forEach(element => {
        thTitles.push(<th>{element.title}</th>)
    });
    return (
        <tr>
            {thTitles}
        </tr>
    )
}

const TableString = (props) => {
    const nameParagraf = { id: 'Id', bDay: 'Birth Day', firstName: 'First Name', lastName: 'Last Name', numberPhone: 'Number Phone',role: 'Position', email: 'Email' };
    const {columns} = useSelector(store => store.table)
    let row=[];
    columns.columns[1].cards.forEach(e => {
        for (let key in nameParagraf) {
            if (e.title == nameParagraf[key]) {
                row.push(<td>{props.str[key]}</td>)
            }
        }
        
    });

    return (
        <tr>
            {row}
        </tr>
    )
}



const CreateTable = () => {

    const dispatch = useDispatch()

    const {columns, tableData} = useSelector(store => store.table)
    console.log(tableData);

    useEffect(() => {
        dispatch(getTableData())
    }, [])


    useEffect(() => {
        dispatch(getTable())
    }, [])


    let rows = [];
    tableData.forEach((element) => {
        rows.push(<TableString key={element.id} str={element} />)
    });

    return (
        <>
            {
                rows.length ? (
                    <Table striped bordered hover variant="dark" >
                        <thead>
                            <TableParagraf  colName={columns.columns[1]} />
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                ) : <p>Preloader</p>
            }
        </>
    )
}

export default CreateTable;