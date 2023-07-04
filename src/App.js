import "./App.css";
import React, { useState,useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPanel from "./components/UserPanel/UserPanel";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import PizzaCarousel from "./components/Layout/PizzaCarousel";
import Header from "./components/Layout/Header";
import axios from "axios";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}from "react-router-dom"
import AddNewPizzaForm from "./components/AdminPanel/AddNewPizza/AddNewPizzaForm";
import Checkout from "./components/Cart/Checkout";
import CartItem from "./components/Cart/CartItem";

function App() {
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [menuList, setMenuList]=useState(null)
  const [selectedpizza,setSelectedPizza]=useState({})
  // const click=useCallback(()=>{
   const  formref=useRef()
  // })
  const [pizzaqty,setPizzaQty]=useState([])
  var fixpizza=undefined
  useEffect(()=>{
    axios.get("https://6470a7f73de51400f724b72c.mockapi.io/PizzaOrder")
    .then(res=>{
          setMenuList(res.data)
       })

    },[]) 

  function removeMenu(id){
    console.log(id)
    axios.delete(`https://6470a7f73de51400f724b72c.mockapi.io/PizzaOrder/${id}`)
    .then(res=>{
      console.log(res)
      setMenuList(menuList.filter(item=>item.id!==id))
      
    })
  }
  function editmenu(itemm){
      setSelectedPizza(itemm)
      formref.current.handleform({name:itemm.name,ingredients:itemm.ingredients,price:itemm.price})
    console.log(selectedpizza )
  }
  function addtocart(id,order,index){
    
      console.log(id,order[index])
    const pizza={idd:id,qty:parseInt(order[index])}
    console.log(pizza)
    fixpizza=pizza
    setPizzaQty([...pizzaqty,pizza])
    console.log(fixpizza)
    
    
    // var check=false
    // var pizza={idd:id,qty:parseInt(order)}
    // if(pizzaqty.length==0){
    //   pizzaqty.push(pizza)
    //     console.log(pizzaqty)
        
    // }else{
    //   for(let i=0; i<pizzaqty.length;i++){
    //     if(pizzaqty[i].idd==id){
    //       pizzaqty[i].qty+=parseInt(order)
    //         check=true
    //         return
    //     }
    //   }
    //   pizzaqty.push(pizza)

    // }
    // console.log(check)
    // console.log(pizzaqty)
    
    
  }
  function addMenuPositionHandler(form) {
    console.log(selectedpizza,form)        //dùng selectedpizza.id để  xác định khi nào sửa khi nào xóa
          if(selectedpizza.id!=undefined){
            axios.put(`https://6470a7f73de51400f724b72c.mockapi.io/PizzaOrder/${selectedpizza.id}`,{name:form.name,ingredients:form.ingredients,price:form.price})
            .then(res=>{
          const bList = [...menuList]
          const index = menuList.findIndex(item=>item.id===selectedpizza.id)
          bList[index] = {id:selectedpizza.id,...form}
          setMenuList(bList)
            form.name=''
            form.ingredients=''
            form.price=''
          setSelectedPizza({})
          
        })
          }else{

          axios.post('https://6470a7f73de51400f724b72c.mockapi.io/PizzaOrder',{"name":form.name,"ingredients":form.ingredients,"price":form.price})
          .then(res=>{
            setMenuList([...menuList,res.data])
            console.log("post",menuList)
            form.name=''
            form.ingredients=''
            form.price=''
          })
      }
        }  

    function setadminsignedin()
    {
      setIsAdminSignedIn(true)
    }
    function logoutadmin(){
      setIsAdminSignedIn(false)
      console.log(isAdminSignedIn)
    }
    function Checkoutoderlist(orderlist)
    {
      setIsAdminSignedIn(false)
    }
  return <>
            <Router>
              <Header pizzaOrder={pizzaqty}/>
              <PizzaCarousel/>
                {(isAdminSignedIn)? <AddNewPizzaForm choosepizza={selectedpizza} ref={formref} menuList={menuList }addMenuPositionHandler={addMenuPositionHandler}/>:false}
                {/* <AddNewPizzaForm  addMenuPositionHandler={addMenuPositionHandler}/> */}
              <Routes>
                <Route path="/" element={<UserPanel isAdminSignedIn={isAdminSignedIn} Checkoutoderlist={Checkoutoderlist} pizzaOrder={pizzaqty} addtocart={addtocart} menuList={menuList}/>}/>
                <Route path="/adminsite" element={<AdminPanel isAdminSignedIn={isAdminSignedIn} logoutadmin={logoutadmin}  editmenu={editmenu} menuList={menuList} removeMenu={removeMenu} /> } >
              </Route>
                <Route path="/yourcart" element={<CartItem menuList={menuList} pizzaqty={pizzaqty} isAdminSignedIn={isAdminSignedIn}/>}/>
                  <Route>
                  <Route path="/checkout" element={<Checkout menuList={menuList} pizzaqty={pizzaqty} isAdminSignedIn={isAdminSignedIn}/>}/>

                  </Route>
              </Routes>
              <div className="container">
                  <div className="row text-end pt-4">
                      <div className="col">
                        {(!isAdminSignedIn)?
                              <Link onClick={()=>setadminsignedin()} className="btn btn-danger text-mute" to="/adminsite">Admin Panel</Link>
                                :true}
                      </div>
                        
                  </div>
              </div>
            </Router>
            
        </>
}
export default App;
