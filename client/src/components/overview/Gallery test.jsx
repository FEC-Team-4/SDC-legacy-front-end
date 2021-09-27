import React, {useState, useEffect, useCallback} from 'react';
import ImgSSR from './SSR.jsx';

const Gallery = ({style}) => {
  //image gallery
  const [index, setIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  //fullscreen
  const [fullScreen, setFullScreen] = useState(false);
  const [fullScreenZoom, setFullScreenZoom] = useState(false);

  //zoom feature
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[offX, offY], setOff] = useState([0, 0]);

  //image nev button
  const leftNav = (style) => {
    if (index > 0) {
      return (
          <button
            className='main-image-left-nav'
            onClick={() => setIndex(index-1)}>
              left
          </button>

      )

    }
  }
  const rightNav = (style) => {
    if (index < style.photos.length-1) {
      return (
        <button
          className='main-image-right-nav'
          onClick={() => setIndex(index+1)}>
            right
        </button>
      )
    }
  }

  //thumbnail
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

  const thumbnailDisplay = () => {
    return (
      <div className='thumbnail-bar'>
        {/* {thumbLeftNav()} */}
        <div className='row row-cols-7'>
          {style.photos.map((photo, index) => {
            return (
              <div className='col ' key={index} style={{height:150, width: 150}} >
                <img className='align-items-center' src={photo.thumbnail_url}  id={index} onClick={e => setIndex(Number(e.target.id))} style={{maxHeight: '100%', maxWidth: '100%'}} />
              </div>
            )
          })}
        </div>
        {/* {thumbRightNav()} */}
      </div>
    )
  }


  //fullScreen

  const fullScreenFunc = () => {
    return (
      <div
        style={{
          display: fullScreen ? "" : "none",
          position: "absolute",
          zIndex: 1,
          height: 1200,
          width: 1400,
          backgroundColor: '#92a8d1'
        }}
        >
        <div
          style={{
            height: 1000,
            width: 1400,
          }}
          >
          <img
            className='rounded mx-auto d-block'
            src={style.photos[index].url}
            onClick={e => setFullScreen(false)}
            style={{
              maxHeight: '100%',
              maxWidth: '100%'
            }}
            />
        </div>

        {thumbnailDisplay()}
      </div>
    )
  }





  const imgSection = () => {
    if (style.photos[0].thumbnail_url === null && style.photos[0].url === null) {
      return <p className='no-img-placeholder'>The selected style does not have image</p>
    } else {
      return (
        <div>
          {fullScreenFunc()}

          <div className='app' style={{height: 800, width: 700}}>
            <div className='row row-cols-3 align-items-center' style={{height:750, width: 600}}>
              <div className='col-sm-1'>
                {leftNav(style)}
              </div>
              <div className='col-sm-10'>
                <div>
                  <img
                    className='rounded mx-auto d-block'
                    src={style.photos[index].url}
                    onMouseEnter={(e) => {
                      const elem = e.currentTarget;
                      const { width, height } = elem.getBoundingClientRect();
                      setSize([width, height]);
                      setShowMagnifier(true);
                    }}
                    onMouseLeave={() => {
                      setShowMagnifier(false);
                    }}
                    onMouseMove={(e) => {
                      const elem = e.currentTarget;
                      const { top, left } = elem.getBoundingClientRect();

                      const x = e.pageX - left - window.pageXOffset;
                      const y = e.pageY - top - window.pageYOffset;
                      setXY([x, y]);
                      setOff([top, left]);
                    }}
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                    onClick={e => setFullScreen(true)}
                  />

                  <div
                    style={{
                      display: showMagnifier ? "" : "none",
                      position: "absolute",
                      left: offX,
                      top: offY,
                      // prevent magnifier blocks the mousemove event of img
                      pointerEvents: "none",
                      // set size of magnifier
                      height: `250px`,
                      width: `250px`,
                      // move element center to cursor pos
                      top: `${y-250/2}px`,
                      left: `${x-250/2}px`,
                      opacity: "1", // reduce opacity so you can verify position
                      border: "1px solid lightgray",
                      backgroundColor: "white",
                      backgroundImage: `url('${style.photos[index].url}')`,
                      backgroundRepeat: "no-repeat",

                      //calculate zoomed image size
                      backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,

                      //calculate position of zoomed image.
                      backgroundPositionX: `${-x * 1.5 + 250 / 2}px`,
                      backgroundPositionY: `${-y * 1.5 + 250 / 2}px`
                    }}
                  ></div>
                </div>

              </div>
              <div className='col-sm-1'>
                  {rightNav(style)}
              </div>
            </div>
            <div className='row align-items-end'>
              {thumbnailDisplay()}
            </div>

          </div>

        </div>
      )

    }
  }

  return (
    // ImgSSR()
    imgSection()
  )
}
export default Gallery;