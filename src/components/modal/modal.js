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
    // const [value, setValue] = usrState('');
    // console.log(value)
    // const filteredColumns = columns.columns[0].cards.title.filter(() => {
    //   columns.columns[0].cards.title.toLowerCase().includes(search.toLowerCase())
    // })

    useEffect(() => {
        dispatch(getTable())
    }, [])

    useEffect(() => {
        if (columns) {
            setBoard(columns)
        }
    },[columns])

    const ControlledBoard = () => {
  
        function handleCardMove(_card, source, destination) {
          const updatedBoard = moveCard(controlledBoard, source, destination);
          setBoard(updatedBoard);
        }

        console.log("controlledBoard",controlledBoard)
    
        return (
          <Board onCardDragEnd={handleCardMove} disableColumnDrag>
            {controlledBoard}
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
            {/* <InputGroup size="sm" className="mb-3">
              <FormControl
                placeholder="Find coulumns..."
                aria-label="Find coulumns"
                // onChange={(event) => value.push(event.target.value)}
              />
              <Button variant="outline-dark" id="button-addon2" onClick={setValue(filteredColumns)}>
                Search
              </Button>
            </InputGroup> */}
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