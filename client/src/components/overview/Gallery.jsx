import "./image-gallery.scss";
import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';

const Gallery = ({style}) => {

  const [imgSets, setImgSets] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    var imagesSet = [];
    style.photos.map(photo => {
      imagesSet.push({
        original: photo.url,
        thumbnail: photo.thumbnail_url,
      })
    })
    setImgSets(imagesSet);
  }, [style])

  return (
    <div>
      <ImageGallery
        items={imgSets}
        infinite={false}
        showFullscreenButton={fullScreen}
        useBrowserFullscreen={false}
        onClick={e => setFullScreen(!fullScreen)}
        startIndex={index}
        onSlide={currentIndex => setIndex(currentIndex)}/>
        {console.log(style)}
    </div>

  )

}

export default Gallery;

/*
  return (
    <div>
      <ImageGallery items={imgSets} />
      {console.log(imgSets)}
    </div>

  )
-------------------------
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <p>Image Gallery</p>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={imgSets}
            time={2000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  )




  ``````````````````````````````````````````````````````


  import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';
//import { Carousel } from 'react-carousel-minimal';

const Gallery = ({style}) => {

  const [imgSets, setImgSets] = useState([])

  useEffect(() => {
    var imagesSet = [];
    style.photos.map(photo => {
      imagesSet.push({
        original: photo.url,
        thumbnail: photo.thumbnail_url,

      })
    })
    setImgSets(imagesSet);
  }, [style])

  return (
    <div>
      <ImageGallery items={imgSets} />
      {console.log(imgSets)}
    </div>

  )

}

export default Gallery;
*/