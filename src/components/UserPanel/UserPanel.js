import React, { useState } from "react";
import Header from "../Layout/Header";
import Pizzas from "../Meals/Pizzas";
import Cart from "../Cart/Cart";
import Footer from "../Layout/Footer";
import Checkout from "../Cart/Checkout";
import {useNavigate} from "react-router-dom"

const UserPanel = (props) => {
  const {menuList,pizzaOrder}=props
  const [order,setOder]=useState([1])
  const [state,setState]=useState(0)
  const navigate=useNavigate()
  // const newOrder = [...order]


  function handlechange(e)
  {
    console.log(order)
      setOder({
        ...order,
        [e.target.name]:e.target.value
      })
      
    
  }





  function addtocart(id,order,index){
    props.addtocart(id,order,index)
    console.log(pizzaOrder)
    setState(0)
    if(pizzaOrder){
      for(var i=0;i<pizzaOrder.length;i++){
        const tempState = state+parseInt(pizzaOrder[i].qty)
        setState(tempState)
        // console.log(tempState) 
      }
    }
  }
  
  function Checkoutoderlist(orderlist){
      props.Checkoutoderlist(orderlist)
      navigate(`/yourcart`)
      console.log("ckout",orderlist)
  }
  
  if(menuList!=null)
  return (
    <>
       <div className="container bg-white mt-5 pt-4 rounded-3">
            {menuList.map((item,index)=>
                <div key={item.id} className="row align-items-center">
                    <div className="col-1 text-center">
                      <h4>{item.id}</h4>
                    </div>
                    <div className="col">
                      <ul style={{listStyle:"none"}}>
                        <li className="text-danger fs-1">{item.name}</li>
                        <li className="fs-4">{item.ingredients}</li>
                        <li className="text-success fs-3"> {'$'+item.price}</li>
                      </ul>
                    </div>
                    <div className="col-3 ">
                      <span className=" pe-3 fs-4">Amount</span>
                      <input min={1} className="me-3 rounded-2 fs-4" style={{maxWidth:"60px"}} type="number" name={`${index}`}
                        onChange={handlechange} 
                        value={order[index]} />
                      <span  onClick={(e)=>{addtocart(item.id,order,index)}} className="fs-4 ps-3 pe-3 btn btn-success ">add</span>
                    </div>
                </div>
            )}
            <div>
          <button onClick={()=>Checkoutoderlist(pizzaOrder)} style={{width:"200px"}} className=" btn pe-3 ps-3 p-1 fs-2 rounded-5 bg-dark text-warning">Cart:{state}</button>
        </div>
        </div>
    </>
  );
};

export default UserPanel;
