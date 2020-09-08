import React, { Component } from "react";
import {DataContext} from "../data";
import Layout from "./Layout";
import {Link} from "react-router-dom";
import "../App.css"
import {MdDelete} from "react-icons/md"

export class Cart extends Component{
 
   static contextType = DataContext;

   componentDidMount(){
      this.context.getTotal();
   }

   //  const CartItems=props.list.CartItem.map(lis=>{
   //      return <div className="cart">
   //              <img src={lis.url} />
   //               <p>Item:{lis.name}</p>
   //          </div>
   //  })


   // const Totalprice=props.list.CartItem.reduce((acc,pre)=>{
   //    return acc+pre.price
   // },0)

   // const quantity=CartItems.length

   render(){
      const {cart,removeProduct,total,reduction,increase}=this.context;

      if(cart.length===0){
         return <Layout>
            <h2 style={{textAlign:"center"}}>
            Cart is Empty!!!
            </h2>
            </Layout>
      }else{
    
       return(
          <Layout>
        <div>
          {
             cart.map(item=>{
               return <div className="cart-container">
                      <img src={item.url} alt="/" className="cart-card" />
                      <ul className="Item-desList">
                       <li>ITEM  : {item.name}</li>
                       <li>ITEM-PRICE : ${item.price}</li>
                      </ul>
                      <div className="quantity">
                         <span>Quantity : </span>
                       <button className="count" onClick={() => reduction(item.id)} style={{marginRight:"5px"}}> - </button>
                       <span>{item.count}</span>
                       <button className="count" onClick={() => increase(item.id)}  style={{marginLeft:"5px"}}> + </button>
                     </div>
                     <div className="delete" 
                     onClick={() => removeProduct(item.id)}>
                      <MdDelete style={{color:"red",height:"50",width:"30"}}/> </div>
                    </div>
             })
          }
           <div className="total" style={{textAlign:"right"}}>
               <Link to="/payment">Payment</Link>
               <h3>Total: ${total}</h3>
             </div>
        </div>
        </Layout>
       );
      }
    }
}

export default Cart;

