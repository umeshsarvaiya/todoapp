// src/features/todo/AddTodo.js
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import  { addTodo } from '../features/TodoSlices';
import { nanoid } from 'nanoid';

const AddList = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addTodo({
        id: nanoid(),
        name: name.trim(),
      }));
      setName('');
    }
  };
  return (
    <>
          <form className='d-flex input-group w-100'  onSubmit={handleSubmit}>
          <div className='add-item-center'>
            <div class="pb-2" >
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-row align-items-center">
                    <input type="name" class="form-control form-control-lg" id="exampleFormControlInput1"
                      placeholder="Add Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                      <div>
                      <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary m-5">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </form>
    </>
  );
};

export default memo(AddList);
