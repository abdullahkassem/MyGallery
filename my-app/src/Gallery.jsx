import React, { useEffect, useRef, useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';




export default function Gallery({ imgDirArr }) {
  const [curImgIdx, setcurImgIdx] = useState(0); // state that tracks the image displayed.
  const [moveImages, setMoveImages] = useState(false); // will be set false when we do not want for automatic scrolling. 

  // console.log(curImgIdx)

  const imageContRef = useRef(null);
  const galleryRef = useRef(null);
  let startingX = 616;


  if (moveImages)
    translateImages(galleryRef.current, curImgIdx)

  useEffect(() => {
    const firstImage = Array.from(imageContRef.current.children)[0];
    const { x } = firstImage.getBoundingClientRect();
    startingX = x;
    // console.log('starting is ',x);
  }, [])


  useEffect(() => {
    const handleScroll = () => {

      const index = calcIndexPosition(imageContRef.current, startingX);
      // console.log(calcIndexPosition(imageContRef.current));
      if (index !== null && curImgIdx !== index) {
        console.log("image scrolled will change state.");
        setMoveImages(false);
        setcurImgIdx(() => index);

      }

    };

    const imageCont = imageContRef.current; // dom element 

    imageCont.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => {
      if (imageCont) {
        imageCont.removeEventListener('scroll', handleScroll);
      }
    };
  }, [curImgIdx]);


  return (
    <div className='galleryContainer' ref={galleryRef}>
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveImages={setMoveImages} />

      <div ref={imageContRef} className="imageContainer" >
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} ord={index} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveImages={setMoveImages} />
      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveImages={setMoveImages} />


    </div>
  )
}

export function translateImages(gallery, indexToShow) {
  if (gallery !== null) {
    const ImgContainer = gallery.querySelector("div.imageContainer");
    const ImagesArr = Array.from(ImgContainer.children);

    ImagesArr.forEach((img) => {
      img.style.transform = `translate(${-100 * (indexToShow)}%)`;
    })
  } else {
    // console.log("gall is null")
  }
}

function calcIndexScroll(imageContRef) {
  if (imageContRef.current) {
    const { scrollLeft, offsetWidth } = imageContRef.current;
    // console.log("scrollLeft ",scrollLeft)
    const index = Math.round(scrollLeft / (offsetWidth - 1)); // I think A better option would be to compare an image posioton to its original position.
    return index;
  }
  return null;
}

function calcIndexTransition(ImgContainer) {
  const ImagesArr = Array.from(ImgContainer.children);
  // check translate value of 1st picture, to know which image is displayed.
  const firstImage = ImagesArr[0];
  const firstImgStyle = window.getComputedStyle(firstImage);
  // parsing string to get translateX value
  const transform = firstImgStyle.transform;
  const matrixValues = transform.replace('matrix(', '').replace(')', '').split(', ');
  const translateX = matrixValues.map(Number)[5];

  let calculatedPos = Math.round(-translateX / firstImage.offsetWidth);

  if (isNaN(calculatedPos))
    calculatedPos = 0;
}

function calcIndexPosition(ImgContainer, startingXPos) {
  const ImagesArr = Array.from(ImgContainer.children);
  const firstImage = ImagesArr[0];
  const { x, width } = firstImage.getBoundingClientRect()
  const diff = -1*(x-startingXPos) ;
  // console.log(` ${x} - ${startingXPos}  = ${diff}`)
  const index = Math.round(diff / width);
  return index;
}