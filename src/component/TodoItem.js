// src/features/todo/TodoItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../features/TodoSlices';
import { memo } from 'react';
import {  MDBBtn, MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newname, setNewname] = useState(todo.name);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    dispatch(editTodo({
      id: todo.id,
      name: newname,
    }));
    setIsEditing(false);
  };
  const handleCancel = () => {
    setNewname(todo.name);
    setIsEditing(false);
  };
  return (
<>
    {isEditing? (
        <>     
          <MDBTable align='middle' style={{ minWidth: '22rem' }} >
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>  
              <div className='ms-3'>
                <input
            type="name"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
          />
               </div>
            </div>
          </td>  
          <MDBBtn color='link' rounded size='sm' onClick={handleSave}>Save</MDBBtn>
          <MDBBtn color='link' rounded size='sm' onClick={handleCancel}>Cancel</MDBBtn>

        </tr> 
      </MDBTableBody>
    </MDBTable>
  
          </>
    ):(
        <>
 <MDBTable align='middle'>
      <MDBTableBody>
        <tr>
          <td className='table-data'>
            <div className='d-flex align-items-center'>       
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{todo.name}</p>
               </div>
            </div>
          </td> 
          <td>
            <MDBBtn class="btn btn-success" data-mdb-ripple-init rounded size='sm'  onClick={handleEdit} >
              Edit
            </MDBBtn>
          </td>
          <td>
            <MDBBtn class="btn btn-danger" data-mdb-ripple-init rounded size='sm' onClick={handleDelete}>
              Delete
            </MDBBtn>
          </td>   
        </tr>    
      </MDBTableBody>
    </MDBTable>
        </>
    )}   
</>
  );
};

export default memo(TodoItem);
