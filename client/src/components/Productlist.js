import React,{Component} from "react";
//import axios from "axios";
import Layout from "./Layout";
import {DataContext} from '../data';
import "../App.css";

export default class Productlist extends Component{

  static contextType = DataContext;

  // constructor(props){
  //   super(props);
  //   this.state={
  //     CartItem:[],
  //     Totalqty:0,
  //     Totalprice:0
  //   }
  //   this.addItemtoCart.bind(this);
  // }
  
  // addItemtoCart=(it)=>{
  //   console.log(it.name)
  //   console.log(it.price)
  //   this.setState({
  //     CartItem:this.state.CartItem.concat(it),
  //     Totalqty:1+this.state.Totalqty,
  //     Totalprice:this.state.Totalprice+it.price
  //   })
  // }
 

  render(){
    // console.log(this.state)
    const {products,addCart} = this.context

    const product=products.map((it)=>{
       return (
        <div className="item-container" key={it.name}>
           <img src={it.url} alt="img" className="image-cards" />
           <h5>{it.name}</h5>
           <p>Price: &#8377;{it.price}</p>
           <button onClick={()=>addCart(it.id)} className="add-btn">ADD</button>
       </div>
        )})

  return (
    <Layout>
      <div className="category-list">
       { product }
      </div>
    </Layout>
   );
  }
};

