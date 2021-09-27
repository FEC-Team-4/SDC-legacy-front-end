import React, {useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import OutfitEntry from './OutfitEntry.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const OutfitList = function({prodId}) {
  const [OutfitIDs, setOutfitIDs] = useState([]);
  const [OutfitInfo, setOutfitInfo] = useState([]);
  const [OutfitPhotos, setOutfitPhotos] = useState({});
  const [OutfitRatings, setOutfitRatings] = useState({});

  const calculateAverage = (ratings) => {
    let sum = 0;
    let numberOfReviews = 0;
    for (var rating in ratings) {
      numberOfReviews += Number(ratings[rating])
      sum += rating * ratings[rating];
    }

    return (sum / numberOfReviews).toPrecision(2);
  }

  const getOutfitIDs = () => {
    axios.get('/api/outfit/')
      .then(res => {
        console.log('get call to outfit result: ', res);
        setOutfitIDs([...OutfitIDs, ...res.data])
      })
      .catch(err => {
        console.error('Outfit fetch error to outfit serverside: ', err);
      })
  }

  const handleClick = () => {
    if (!OutfitIDs.includes(prodId)) {
      setOutfitIDs([...OutfitIDs, prodId])
    }
  }

  const getOutfitInfo = () => {
    if (OutfitIDs.length) {
      let stringOutfitInfo = JSON.stringify(OutfitInfo);
      for (var i = 0; i < OutfitIDs.length; i++) {
        if (OutfitIDs[i] !== undefined && !stringOutfitInfo.includes(JSON.stringify(OutfitIDs[i]))) {
          axios.get(`/api/products/${OutfitIDs[i]}`)
          .then(res => {
            //setOutfitInfo(OutfitInfo.filter(item => item.id !== res.data.id));
            setOutfitInfo(prevRelatedInfo => ([...prevRelatedInfo, {
              id: res.data.id,
              category: res.data.category,
              price: res.data.default_price,
              name: res.data.name
            }]));
          })
          .catch(err => {
            console.error('Outfit info error on axios call: ', err);
          })
        }
      }

      let data = OutfitIDs;
      let config = {
        method: 'post',
        url: '/api/outfit/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config)
        .then(res => {
          console.log(res);
        })
    }
  }
  const getOutfitPhotos = () => {
    for (var i = 0; i < OutfitIDs.length; i++) {
      axios.get(`/api/products/${OutfitIDs[i]}/styles`)
        .then(res => {
          if (res.data.results[0].photos[0].thumbnail_url !== null) {
            setOutfitPhotos(prevOutfitPhotos => ({...prevOutfitPhotos,
              [res.data.product_id]: res.data.results[0].photos[0].thumbnail_url
            }))
          } else {
            setOutfitPhotos(prevOutfitPhotos => ({...prevOutfitPhotos,
              [res.data.product_id]: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            }))
          }
        })
        .catch(err => {
          console.error('Error in outfit photo axios call: ', err);
        })
    }
  }
  const getOutfitRatings = () => {
    for (var i = 0; i < OutfitIDs.length; i++) {
      axios.get(`api/reviews/meta/${OutfitIDs[i]}`)
        .then(res => {
          if(Object.keys(res.data.ratings).length !== 0){
            setOutfitRatings(prevOutfitRatings => ({...prevOutfitRatings, [res.data.product_id]: calculateAverage(res.data.ratings)}))
          } else {
            setOutfitRatings(prevOutfitRatings => ({...prevOutfitRatings, [res.data.product_id]: "No ratings"}))
          }
        })
        .catch(err => {
          console.error('Error in ratings fetch: ', err);
        })
    }
  }

  const showOutfitIDs = () => {
    console.log('Outfit IDs locally: ', OutfitIDs);
  }

  useEffect(() => {
    showOutfitIDs();
    getOutfitInfo();
    getOutfitPhotos();
    getOutfitRatings();
  }, [OutfitIDs.length])

  useEffect(() => {
    getOutfitIDs();
  }, [])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const removeItem = (e) => {
    let itemID = Number(e.target.parentNode.getAttribute("id"));
    setOutfitIDs(OutfitIDs.filter(id => id !== itemID));
    setOutfitInfo(OutfitInfo.filter(item => item.id !== itemID));
  }

  function OutfitDisplay() {
    return (
      <Carousel responsive={responsive}>
        <a style={{ cursor: 'pointer' }} onClick={handleClick}>
          <Card style={{width: '10rem', flex: 1}}>
          <Card.Body>
            <Card.Title>
              +
            </Card.Title>
            <Card.Text>
            Add Current Item To Outfit
            </Card.Text>
          </Card.Body>
          </Card>
        </a>
        {OutfitInfo.map((product) => {
            return(
              <div id={product.id} style={{position: 'relative', display: 'inline-block', zIndex:5}}>
                <OutfitEntry product={product} key={product.id} rating={OutfitRatings[product.id]} removeItem={removeItem} photo={OutfitPhotos[product.id]}/>
                <Button variant="outline-secondary" onClick={(e) => removeItem(e)} style={{position: 'absolute', top:0, right:0, margin:0, zIndex:1000}}>Remove</Button>
              </div>
            )
          })
        }
      </Carousel>
    )
  }

  return (
    <div>
      <h2>Outfit</h2>
      <OutfitDisplay />
    </div>
  )
}

export default OutfitList;