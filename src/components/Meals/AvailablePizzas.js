import { useEffect, useCallback, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailablePizzas.module.css";
import PizzaItem from "./PizzaItem/PizzaItem";
import axios from "axios"
const AvailablePizzas = () => {
  const [menuList, setMenuList] = useState([]);
  
  
  const pizzasList = menuList.map((pizza) => (
    <PizzaItem
      id={pizza.id}
      key={pizza.id}
      name={pizza.name}
      ingredients={pizza.ingredients}
      price={pizza.price}
    />
  ));

  return (
    <>
      
    {menuList.map(item=>{
          <ul key={item.id}>
              <li>{item.name}</li>
              <li>{item.ingredients}</li>
              <li>{item.price}</li>
          </ul>
          })
        }
        </>
        
     
  );
};

export default AvailablePizzas;
