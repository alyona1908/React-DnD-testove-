import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Board, { moveCard } from  '@asseinfo/react-kanban';
import './modal.css'
import React, { useEffect, useState } from 'react';
import { GET_TABLE } from '../../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getTable } from '../../store/actions/table';


function ModalWind() {

    const {columns} = useSelector(store => store.table);
    const dispatch = useDispatch()
    const [lgShow, setLgShow] = useState(false);
    const [controlledBoard, setBoard] = useState(columns);
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(getTable())
    }, [])

    useEffect(() => {
        if (columns) {
            setBoard(columns)
        }
    },[columns])


    // let filteredColumns;
    // if (Object.keys(columns).length !== 0) {
    //   filteredColumns = columns.columns[0].cards.filter((el) => {
    //     el.title.toLowerCase().includes(value.toLowerCase())
    //   })
    // }
    // const cols = columns && columns.columns && columns.columns[0] && columns.columns[0].cards;

    // const filteredColumns = () => {
    //   const cols = columns?.columns?.[0]?.cards;
    //   return cols && cols.length !== 0 ? columns.columns[0].cards.filter((el) => {
    //     return el.title.toLowerCase().includes(value.toLowerCase())
    //   }) : [];
    // }

    const ControlledBoard = () => {
      function handleCardMove (_card, source, destination) {
        const updatedBoard = moveCard(controlledBoard, source, destination);
        setBoard(updatedBoard);
      }

      const filteredColumns = () => {
        const cols = controlledBoard?.columns?.[0]?.cards;
        return cols && cols.length !== 0 ? controlledBoard?.columns?.[0]?.cards.filter((el) => {
          return el.title.toLowerCase().includes(value.toLowerCase())
        }) : [];
      }

      // const cloned = JSON.parse(JSON.stringify(controlledBoard));
      const nc = () => {
        return (
          {...controlledBoard, columns: [
            ...controlledBoard.columns.map((item) => {
              if (item.id === 1) {
                item = {...item, cards: filteredColumns()}
              }
              return item;
            })
          ]}
        )
      }

      return (
        <Board onCardDragEnd={handleCardMove} disableColumnDrag>
          {nc()}
        </Board>
      );
    }

    const onClickHandler = () => {
        console.log("eyaifa")
        dispatch({type: GET_TABLE, payload: controlledBoard})
        setLgShow(false)
    }



    return (
      <>
        <Button type='button' variant="outline-dark"className='btn' onClick={() => setLgShow(true)}>
          Select Grid Columns
        </Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Select columns for the grid
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Find columns..."
                aria-label="Find columns"
                onChange={(event) => setValue(event.target.value)}
                value={value}
              />
            </InputGroup>
            <ControlledBoard />
          </Modal.Body>
          <Modal.Footer>
            <Button type='button' variant="outline-dark" size="lg" className='btn' onClick={() => onClickHandler()}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalWind
