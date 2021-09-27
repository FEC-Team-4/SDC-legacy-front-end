import React, {useState, useEffect} from 'react';

const Cart = ({style, setStyle, prodId}) => {

  const [selSize, setSelSize] = useState('Select Size');  //selected size
  const [selQuantity, setSelQuantity] = useState('-');    //selected quantity
  const [selSkus, setSelSkus] = useState({});             //available size and quantity
  const [sku, setSku] = useState(0);                      //sku code of selected size
  const [available, setAvailable] = useState(0);          //available quantity of selected size

  //update style once style has been passed down
  useEffect(() => {
    setSelSkus(JSON.parse(JSON.stringify(style.skus)));

  },[style])


  //update available quantity and sku once size has been selected
  useEffect(() => {
    const keyArr = Object.keys(selSkus);
    const valueArr = Object.values(selSkus);
    var skuIndex = 0;
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i].size === selSize) {
        skuIndex = i;
        setAvailable(valueArr[i].quantity);
      }
    }
    setSku(keyArr[skuIndex]);
    setSelQuantity(1);

  },[selSize])


  const CheckStock = () => {
    if (Object.keys(selSkus)[0]==='null') {
      return (
        <OutOfStock />
        );
    } else {
      return (
        <InStock />
        );
    }
  }

  const OutOfStock = () => {
    return (
      <select className='size' >
        <option>OUT OF STOCK</option>
      </select>
    )
  };

  const InStock = () => {
    return (
      <select className='size' value={selSize} onChange={e => setSelSize(e.target.value)}>
        <option>Select Size</option>
        {Object.values(selSkus).map((sku, index) => {
          return (
            <option key={index} >{sku.size}</option>
          )
        })}
      </select>
    )
  };


  const SelectQuan = () => {
    if (selSize === 'Select Size') {
      return (
        <UnSelected />
      )
    } else {

      if (available < 15){
        var arr = [...Array(available).keys()];
      } else {
        var arr = [...Array(15).keys()];
      }

      return (
        <Selected arr={arr}/>
      )
    }
  }

  const UnSelected = () => {
    return (
      <select className='quantity' >
        <option>-</option>
      </select>
    )
  }

  const Selected = ({arr}) => {
    return (
      <select className='quantity' value={selQuantity} onChange={e => setSelQuantity}>
        <option>1</option>
        {arr.map((num, index) => {
          return (
            <option key={index}>{num+1}</option>
          )
        })}
      </select>
    )
  }


  return(
    <div>
      <CheckStock />
      <SelectQuan />
    </div>
  )
}


export default Cart;

//for unavailable size, not sure it will still appear on skus
//or just quantity be 0

//will implement prior case


/*
for (const [key, value] of Object.entries(skus)) {
      return (
      <option id={key}>{value.size}</option>
      )
    }

Object.values(style.skus).map((sku, index) => {
            return (
              <option key={index}>{sku.size}</option>
            )
          })

<select className='size' value={selSize} onChange={e => setSelSize(e.target.value)}>
      <option>Select Size</option>
    </select>



    onChange={e => setSelSize(e.target.value)}
*/