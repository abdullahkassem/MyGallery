import React, { useEffect, useRef, useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';



export default function Gallery({ imgDirArr }) {
  const [curImgIdx, setcurImgIdx] = useState(0); // state that tracks the image displayed.
  const [moveImages,setMoveImages] = useState(false); // will be set false when we do not want for automatic scrolling. 


  const imageContRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      const index = calcCurrIndex(imageContRef);
      if(index !== null){
        if (curImgIdx !== index) {
          console.log("image scrolled will change state.");
          setMoveImages(false);
          setcurImgIdx(() => index);
        }
      }
    };

    const carousel = imageContRef.current; // dom element 
    carousel.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [curImgIdx]);



//Automatic scrolling. 
  useEffect(() => { // Whenever curImgIdx changes, will scroll images.

    // if(moveImages === false){
    //   setMoveImages(true);
    //   return;
    // }

    const calculatedPos = calcCurrIndex(imageContRef);

    const ImagesArr = Array.from(imageContRef.current.children);
    // // check translate value of 1st picture, to know which image is displayed.
    // const firstImage = ImagesArr[0];
    // const firstImgStyle = window.getComputedStyle(firstImage);
    // // parsing string to get translateX value
    // const transform = firstImgStyle.transform;
    // const matrixValues = transform.replace('matrix(', '').replace(')', '').split(', ');
    // const translateX = matrixValues.map(Number)[5];

    // let calculatedPos = Math.round(-translateX / firstImage.offsetWidth);

    // if (isNaN(calculatedPos))
    //   calculatedPos = 0;

    if (calculatedPos !== curImgIdx) {
      ImagesArr.forEach((img) => {
        img.style.transform = `translate(${-100 * (curImgIdx)}%)`;
      })
    }
  }, [curImgIdx]);

  return (
    <div className='galleryContainer' >
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <div ref={imageContRef} className="imageContainer" >
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} ord={index} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />
      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />


    </div>
  )
}

function calcCurrIndex(imageContRef){
  if (imageContRef.current) {

    const { scrollLeft, offsetWidth } = imageContRef.current;
    const index = Math.round(scrollLeft / (offsetWidth - 1)); // I think A better option would be to compare an image posioton to its original position.
    return index;
  }
  return null;
}