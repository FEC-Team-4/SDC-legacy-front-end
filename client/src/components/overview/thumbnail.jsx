import React, {useState, useEffect, useCallback} from 'react';


const ThumbnailDisplay = ({thumbnailIndex, setThumbnailIndex, style}) => {
  
  const thumbLeftNav = () => {

    if (thumbnailIndex <  Math.ceil(style.photos.length/7)-1) {
      return  <button
                className='thumbnail-left-nav'
                onClick={() => setThumbnailIndex(thumbnailIndex-1)}>
                  left L
              </button>
    }
  }

  const thumbRightNav = () => {
    if (thumbnailIndex > 0) {
      return  <button
                className='thumbnail-right-nav'
                onClick={() => setThumbnailIndex(thumbnailIndex+1)}>
                  right R
              </button>
    }
  }


  return (
    <div className='thumbnail-bar'>
      {thumbLeftNav()}
      <div className='row row-cols-7'>
        {style.photos.map((photo, index) => {
          return (
            <div className='col ' key={index} style={{height:150, width: 150}} >
              <img className='align-items-center' src={photo.thumbnail_url}  id={index} onClick={e => setIndex(Number(e.target.id))} style={{maxHeight: '100%', maxWidth: '100%'}} />
            </div>
          )
        })}
      </div>
      {thumbRightNav()}
    </div>
  )
}

export default ThumbnailDisplay;