import fruit1 from "./Images/Banana.jpg";
import fruit2 from "./Images/orange.jpg";
import fruit3 from "./Images/strawberry.jpg";
import fruit4 from "./Images/watermelon.jpeg";
//import fruit5 from "./Images/watermelon1.jpg";
import dairy1 from "./Images/cheese.jpeg";
import dairy2 from "./Images/eggs.jpg";
import dairy3 from "./Images/milk.jpg";
import dairy4 from "./Images/yogurt.jpg";
//import dairy5 from "./Images/milkmaid.jpg";
import snack1 from "./Images/goodday.png";
import snack2 from "./Images/lays.jpg";
import snack3 from "./Images/peanut.jpg";
import snack4 from "./Images/soanpapdi.jpg";
//import snack5 from "./Images/Wafer-Rolls.jpg";
import bev1 from "./Images/maaza.jpg";
import bev2 from "./Images/thumsup.jpg";
import bev3 from "./Images/tinbev.jpg";
import bev4 from "./Images/tang.jpg"
//import bev5 from "./Images/tajmahal.jpg"
import pcare1 from "./Images/dettol.jpg"
import pcare2 from "./Images/perfume.jpg";
import pcare3 from "./Images/shampoo.jpeg";
import pcare4 from "./Images/toothbrush.jpg";
//import pcare5 from "./Images/toothpaste.jpg";
import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component{
  state={
  products:[
    {
    id:1,
    url:fruit1,
    name:"Banana",
    price:20,
    count:1
   },
  {
    id:2,
    url:fruit2,
    name:"Orange",
    price:10,
    count:1
  },
  {
    id:3,
    url:fruit3,
    name:"StrawBerry",
    price:25,
    count:1
  },
  {
    id:4,
    url:fruit4,
    name:"Watermelon",
    price:40,
    count:1
  },
  {
    id:5,
    url:dairy1,
    name:"Cheese",
    price:35,
    count:1
  },
  {
    id:6,
    url:dairy2,
    name:"Eggs",
    price:60,
    count:1
  },
  {
    id:7,
    url:dairy3,
    name:"Milk",
    price:20,
    count:1
  },
  {
    id:8,
    url:dairy4,
    name:"Yogurt",
    price:30,
    count:1
  },
  {
    id:9,
    url:snack1,
    name:"GoodDay",
    price:20,
    count:1
  },
  {
    id:10,
    url:snack2,
    name:"Lays",
    price:30,
    count:1
  },
  {
    id:11,
    url:snack3,
    name:"Peanut Butter",
    price:50,
    count:1
  },
  {
    id:12,
    url:snack4,
    name:"Soanpapdi",
    price:40,
    count:1
  },
  {
    id:13,
    url:bev1,
    name:"Maaza",
    price:20,
    count:1
  },
  {
    id:14,
    url:bev2,
    name:"Thumsup",
    price:20,
    count:1
  },
  {
    id:15,
    url:bev3,
    name:"Coke",
    price:15,
    count:1
  },
  {
    id:16,
    url:bev4,
    name:"Tang",
    price:20,
    count:1
  },
  {
    id:17,
    url:pcare1,
    name:"Dettol Soap",
    price:30,
    count:1
  },
  {
    id:18,
    url:pcare2,
    name:"Axe bodyspray",
    price:50,
    count:1
  },
  {
    id:19,
    url:pcare3,
    name:"Shampoo",
    price:40,
    count:1
  },
  {
    id:20,
    url:pcare4,
    name:"Toothbrush",
    price:30,
    count:1
  }
 ],
 cart: [],
 total: 0
}

addCart=(id)=>{
const {products,cart}=this.state;
const check = cart.every(item =>{
  return item.id !== id
})
if(check){
  const data = products.filter(product =>{
      return product.id === id
  })
  this.setState({cart: [...cart,...data]})
}
}

reduction = id =>{
  const { cart } = this.state;
  cart.forEach(item =>{
      if(item.id === id){
          item.count === 1 ? item.count = 1 : item.count -=1;
      }
  })
  this.setState({cart: cart});
  this.getTotal();
};

increase = id =>{
  const { cart } = this.state;
  cart.forEach(item =>{
      if(item.id === id){
          item.count += 1;
      }
  })
  this.setState({cart: cart});
  this.getTotal();
};


removeProduct = id =>{
      const {cart} = this.state;
      cart.forEach((item, index) =>{
          if(item.id === id){
              cart.splice(index, 1)
          }
      })
      this.setState({cart: cart});
      this.getTotal();
 
};


getTotal = ()=>{
  const{cart} = this.state;
  const res = cart.reduce((prev, item) => {
      return prev + (item.price*item.count);
  },0)
  this.setState({total: res})
};

componentDidUpdate(){
  localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
  localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
};

componentDidMount(){
  const dataCart = JSON.parse(localStorage.getItem('dataCart'));
  if(dataCart !== null){
      this.setState({cart: dataCart});
  }
  const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
  if(dataTotal !== null){
      this.setState({total: dataTotal});
  }
}


render() {
  const {products, cart,total} = this.state;
  const {addCart,reduction,increase,removeProduct,getTotal} = this;
  return (
      <DataContext.Provider 
      value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
          {this.props.children}
      </DataContext.Provider>
  )
 }

}
  
