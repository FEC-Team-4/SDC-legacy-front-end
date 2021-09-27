import React from 'react';

const Style = ({styles, setStyle}) => {

  return (
    <div className='row row-cols-4' >
      {styles.map((style, index) => {
        return (
          <div className='col' key={index} style={{width:100, height:100, borderRadius: '50%'}}>
            <img className='img-thumbnail' src={style.photos[0].thumbnail_url} id={index} onClick={e => setStyle(styles[Number(e.target.id)])} key={index} style={{maxHeight:'100%', maxWidth:'100%'}}/>
          </div>
        )
      })}
    </div>
  )
}

export default Style;