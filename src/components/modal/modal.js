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
    const [value, setValue] = useState('');

    const [controlledBoard, setBoard] = useState(columns);
  

    useEffect(() => {
        dispatch(getTable())
    }, [])

    useEffect(() => {
        if (columns) {
            setBoard(columns)
        }
    },[columns])



    const filteredColumns = () => {
      const cols = columns?.columns?.[0]?.cards;
      
      return cols && cols.length !== 0 ? columns.columns[0].cards.filter((el) => {
        return el.title.toLowerCase().includes(value.toLowerCase())
      }) : [];
    }
    console.log(filteredColumns(),'1111');

    const ControlledBoard = () => {
  
        function handleCardMove(_card, source, destination) {
          const updatedBoard = moveCard(controlledBoard, source, destination);
          setBoard(updatedBoard);

          if (updatedBoard.columns[1].cards.length !== columns.columns[1].cards.length){
              if (updatedBoard.columns[1].cards.length > columns.columns[1].cards.length){
                for (let i = 0;i<updatedBoard.columns[1].cards.length;i++){
                  let is_duble = false;
                  for (let j = 0;j<columns.columns[1].cards.length;j++){
                  if (columns.columns[1].cards[j] == updatedBoard.columns[1].cards[i]){
                    is_duble = true;
                    break;
                  }
                }
                if (! is_duble){
                  columns.columns[0].cards.splice(columns.columns[0].cards.indexOf(updatedBoard.columns[1].cards[i]), 1);
                  columns.columns[1].cards.splice(i,0,updatedBoard.columns[1].cards[i]);
                }
              }
              }else{
                for (let i = 0;i<columns.columns[1].cards.length;i++){
                  let is_duble = false;
                  for (let j = 0;j<updatedBoard.columns[1].cards.length;j++){
                  if (columns.columns[1].cards[i] == updatedBoard.columns[1].cards[j]){
                    is_duble = true;
                    break;
                  }
                }
                if (! is_duble){
                  columns.columns[0].cards.splice(updatedBoard.columns[0].cards.indexOf(columns.columns[1].cards[i]),0,columns.columns[1].cards[i]);
                  columns.columns[1].cards.splice(columns.columns[1].cards.indexOf(columns.columns[1].cards[i]), 1);
                }
              }
              }
          }
          
        }
    
        let clmn = JSON.parse(JSON.stringify(controlledBoard));
        clmn.columns[0].cards =  filteredColumns();
        return (
          <Board onCardDragEnd={handleCardMove} disableColumnDrag>
            {clmn}
          </Board>
        );
    }

    const onClickHandler = () => {
        console.log("eyaifa")
        setLgShow(false)
        setValue('');
        dispatch({type: GET_TABLE, payload: controlledBoard})
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
                placeholder="Find coulumns..."
                aria-label="Find coulumns"
                onChange={(event) => setValue(event.target.value)}
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