import React, { useState,useEffect  } from "react";
import Header from "../Layout/Header";
import styles from "./AdminPanel.module.css";
import classes from "./AdminPanel.module.css";
import AddNewPizza from "./AddNewPizza/AddNewPizza";
import PizzasList from "./PizzasList/PizzasList";
import NewOrders from "./NewOrders/NewOrders";
import axios from "axios";
import AddNewPizzaForm from "./AddNewPizza/AddNewPizzaForm";
import {useNavigate} from "react-router-dom"

export default function AdminPanel (props) {
  const {menuList,isAdminSignedIn}=props
  const navigate=useNavigate()
   console.log(menuList)

  // const restartHandler = () => {
  //   setRestart(!restart);

  
  // };
  // axios.post("https://6470a7f73de51400f724b72c.mockapi.io/PizzaOrder",
  //             {"name":name,"ingredients":ingredients,"price":price})
  //       .then((res)=>{
        
  //       console.log(res)
  //       console.log("thành công")
  //       // setSignUp(false)
  //         })

function editmenu(item){
  props.editmenu(item)
}
function removeMenu(id){
  props.removeMenu(id)
} 
function logoutadmin()
{
  props.logoutadmin()
  navigate(`/`)
}

if(menuList!=null)
{
  return (
    <React.Fragment>
        {(isAdminSignedIn)?
          <div className="text-end">
          <button onClick={()=>logoutadmin()} className="me-4 btn btn-primary"> logout AdminPanel</button>
        </div>
          :false
        }
        <div className="text-center text-warning fs-1">Current menu</div>
        <div className="container bg-white bo">
            {menuList.map(item=>
                <div className="row align-items-center">
                    <div className="col-1 text-center">
                      <h4>{item.id}</h4>
                    </div>
                    <div className="col">
                      <ul style={{listStyle:"none"}} key={item.id}>
                        <li className="text-danger fs-3">{item.name}</li>
                        <li>{item.ingredients}</li>
                        <li className="text-success"> {'$'+item.price}</li>
                      </ul>
                    </div>
                    <div className="col-3 ">
                      <span  onClick={(e)=>{editmenu(item)}} className="btn btn-success me-2">Edit</span>
                      <span  onClick={(e)=>{removeMenu(item.id)}} className="btn btn-success">Remove</span>
                    </div>
                </div> 
            )}
        </div>
      <PizzasList  />
        <h1 className={classes.title}>New orders</h1>
      <NewOrders/>
  </React.Fragment>
    
  )
}
 
}


