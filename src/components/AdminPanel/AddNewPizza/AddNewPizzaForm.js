import React, { useState,forwardRef,useImperativeHandle, useRef } from "react";
import axios from 'axios'
import classes from "./AddNewPizza.module.css";

const AddNewPizzaForm = forwardRef ((props,ref)=> {
  const {menulist,seletedpizza}=props
  const [form,setForm]=useState({name:"",ingredients:"",price:""});
  // const id=seletedpizza.id
    function addMenuPositionHandler(e) {
      e.preventDefault()
      // console.log([nameref.current.value])
       props.addMenuPositionHandler(form)
   
    }
    
    function handlechange(e)
    {
      e.preventDefault()

        setForm({
          ...form,
          [e.target.name]:e.target.value,
        })
        console.log(form)
      
    }
    useImperativeHandle(ref, () => ({
      handleform(form)
      {
      setForm(form)
      }
    }))
  return (
    <>
      <div className="container">
        <div className="row text-center mt-4 pt-3">
            <div className="col"></div>
            <div className="col-6">
            <div className="">
              <form  onSubmit={addMenuPositionHandler}>
                  <label className="text-white d-block">Name</label>
                  <input type="text" 
                    name="name"
                    placeholder="Name"
                    onChange={handlechange} 
                    value={form.name} />
                  <label className="text-white d-block">Ingredients
                  </label>
                  <input  className="d-inline"
                    name="ingredients"
                    placeholder="Ingredients"
                    type="text"
                    onChange={handlechange}
                    value={form.ingredients}
                  />
                  <label className="text-white d-block">Price</label>
                  <input  type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handlechange}
                    value={form.price}
                  />
                  <section>
                    <button className=" btn btn-secondary ps-4 pe-4 fs-5" type="submit">Add</button>
                  </section>
              </form>
            </div>
            </div>
            <div className="col"></div>
        </div>
      </div>
      
    </>
      
  );
});


export default AddNewPizzaForm;
