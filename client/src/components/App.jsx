// import React, { useState, useEffect} from 'react';
// import axios from 'axios';

// import Overview from './overview/Overview.jsx';
// import QandA from './Q_and_A/Q_and_A.jsx';
// import Reviews from './Rating_and_Reviews/Rating_and_Reviews.jsx';
// import RelatedList from './Related_and_Outfit/RelatedList.jsx';
// import OutfitList from './Related_and_Outfit/OutfitList.jsx';


// const App = () => {
//   const [prodId, setProdId] = useState(42370);
//   const [prodInfo, setProdInfo] = useState({id:prodId});

//   useEffect(() => {
//     const getInfo = () => {
//       axios.get(`/api/products/${prodId}`)
//         .then(res => {
//           setProdInfo(res.data);
//         })
//         .catch(err => {
//           console.error(err);
//         })
//     }
//     getInfo();
//   }, [prodId]);

//   return (
//     <div>
//       <Overview prodInfo={prodInfo} />
//       <QandA prodId={prodId} />
//       <Reviews prodId={prodId} />

//       <RelatedList prodId={prodId} setProdId={setProdId}/>
//       <OutfitList prodId={prodId} />
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect, useMemo } from 'react';
import Overview from './overview/Overview.jsx';
import QandA from './Q_and_A/Q_and_A.jsx';
import Reviews from './Rating_and_Reviews/Rating_and_Reviews.jsx';
import RelatedList from './Related_and_Outfit/RelatedList.jsx';
import OutfitList from './Related_and_Outfit/OutfitList.jsx';

import NavBar from './NavBar.jsx';
import { ProductContext } from './productContext.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [prodId, setProdId] = useState(42366);
  const [prodInfo, setProdInfo] = useState({id:prodId});
  const [viewMode, setViewMode ] = useState(false);

  const getProdInfo = () => {
    axios.get(`/api/products/${prodId}`)
        .then(res => {
          console.log('app side axios call');
          setProdInfo(res.data);
        })
        .catch(err => {
          console.error('Error in info fetch: ', err);
        })
  }
  useEffect(() => {
    getProdInfo();
  }, [prodId])
  const value = useMemo(() => ({prodInfo, setProdInfo}), [prodInfo, setProdInfo]);
  return (
    <div>
      <NavBar viewMode={ viewMode } setViewMode={ setViewMode }/>
      <Overview prodId={prodId} prodInfo={prodInfo}/>
      <ProductContext.Provider value={value}>
        <RelatedList prodId={prodId} setProdId={setProdId} />
        <OutfitList prodId={prodId} />
      </ProductContext.Provider>
      <QandA prodId={prodId} prodInfo={prodInfo}/>
      <Reviews prodId={prodId} prodInfo={prodInfo} />
    </div>
  );
};
export default App;