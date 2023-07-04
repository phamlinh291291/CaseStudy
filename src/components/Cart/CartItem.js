import classes from "./CartItem.module.css";
import React from "react";
import Checkout from "./Checkout";
import {useNavigate} from "react-router-dom"
const CartItem = (props) => {
const {menuList,pizzaqty}=props
const navigate=useNavigate()
function Pay(){
  navigate(`/checkout`)
}
return (
    <>
    <div className="bg-light container">
    {pizzaqty.map(item=>
      <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{item.idd}</span>
          <span className={classes.amount}>x {item.qty}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
     
    </li>
    )}
       <div className="d-flex ">
          <button onClick={(e)=>Pay()} className=" fs-4 btn btn-warning ps-3 pe-3"> Checkout</button>
      </div>
    </div>
    </>
  );
};

export default CartItem;
