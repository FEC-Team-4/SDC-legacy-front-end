import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cart from './Cart.jsx';
import Style from './Style.jsx';
import Gallery from './Gallery test.jsx';

const Overview = ({prodInfo}) => {

  const [prodStyle, setProdStyle] = useState([]);
  const [selStyle, setSelStyle] = useState({skus:{}, photos: [{url: null, thumbnail_url: null}]});


  useEffect(() => {
    const getStyle = () => {
      axios.get(`/api/products/${prodInfo.id}/styles`)
        .then(res => {
          setProdStyle(res.data.results);
          setSelStyle(res.data.results[0]);
        })
        .catch(err => {
          console.error(err);
        })
    }
    getStyle();
  }, [prodInfo]);

  const discounPrice = () => {
    if (selStyle.sale_price === null) {
      return (
        <h3 className='price'>{`$ ${selStyle.original_price}`}</h3>
      )
    } else {
      return (
        <h3 className='price'>{`$ ${selStyle.sale_price}`}</h3>
      )
    }
  }


  return (
    <div className='container' style={{height: 1200, width: window.innerWidth, backgroundColor: '#92a8d1'}}>
      <div className='row'>
        <div className='col-8'>
          <div className='images'>
            <Gallery style={selStyle}/>
          </div>
        </div>

        <div className='col-4'>
          <div className='info'>
            <div className='rating'>
              <div className='rate star'></div>
              <div className='all review'></div>
            </div>
            <h4 className='category'>{prodInfo.category}</h4>
            <h1 className='title'>{prodInfo.name}</h1>
            {discounPrice()}
            <h6 className='selected style'>{`STYLE > ${selStyle.name}`}</h6>
            <div className='style seletcer'>
              <Style styles={prodStyle} setStyle={setSelStyle}/>
            </div>
            <div className='cart'>
              <Cart style={selStyle} prodId={prodInfo.id}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;

