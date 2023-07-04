import React, { useState } from "react";
import classes from "./AddNewPizza.module.css";
import AddNewPizzaForm from "./AddNewPizzaForm";

const AddNewPizza = (props) => {
  function Edit(e,item){}
  function Remove(id){}
  const [isAddActive, setIsAddActive] = useState(false);

  const onAddActive = () => {
    if (!isAddActive) setIsAddActive(true);
  };

  const onRemoveActive = () => {
    if (isAddActive) setIsAddActive(false);
  };
if(props.menuList!=null)
{
  return (
    <>
    <div
      className={
        isAddActive
          ? `${classes.container} ${classes.active}`
          : `${classes.container}`
      }
      onClick={onAddActive}
    >
      <h1>Add new menu position</h1>
      <p>+</p>
      {isAddActive && (
        <AddNewPizzaForm/>
      )}
    </div>
    <div className="container bg-white bo">
      {/* {props.menuList.map(item=>
          <div className="row align-items-center">
              <div className="col">
                <ul style={{listStyle:"none"}} key={item.id}>
                  <li className="text-danger fs-3">{item.name}</li>
                  <li>{item.ingredients}</li>
                  <li className="text-success"> {'$'+item.price}</li>
                </ul>
              </div>
              <div className="col-3 ">
                <span  onClick={(e)=>{Edit(e,item)}} className="btn btn-success me-2">Edit</span>
                <span  onClick={(e)=>{Remove(e,item.id)}} className="btn btn-success">Remove</span>
              </div>
          </div> 
        )} */}
    </div>
    </>
    
  );
}
  
};

export default AddNewPizza;
