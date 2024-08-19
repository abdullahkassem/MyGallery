import React, { useEffect, useRef, useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';




export default function Gallery({ imgDirArr }) {
  const [curImgIdx, setcurImgIdx] = useState(0); // state that tracks the image displayed.
  const [moveBy, setMoveBy] = useState(0); // 1 is forwards, -1 is backwards

  // console.log(curImgIdx)

  const imageContRef = useRef(null);
  const galleryRef = useRef(null);
  let startingX = 616;


  if (moveBy !== 0)
    translateImages(galleryRef.current, curImgIdx, setcurImgIdx, moveBy, setMoveBy)

  useEffect(() => {
    const ImagesArr = Array.from(imageContRef.current.children);
    positionImages(ImagesArr, curImgIdx)
  }, [])

  // useEffect(() => {
  //   // Adding a lister for transition finish
  //   const transitionedHandler = () => {
  //     // remove transforms 
  //     // elements before curImgIdx are leftSideImg, current image is currentImg, ....
  //     const ImagesArr = Array.from(imageContRef.current.children);
  //     positionImages(ImagesArr, curImgIdx);
  //   };

  //   imageContRef.current.addEventListener('transitionend', transitionedHandler);


  //   return ()=>{
  //     imageContRef.current.addEventListener('transitionend',transitionedHandler);
  //   }
  // }, [curImgIdx])



  return (
    <div className='galleryContainer' ref={galleryRef}>
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveBy={setMoveBy} />

      <div ref={imageContRef} className="imageContainer" >
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} ord={index} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveBy={setMoveBy} />
      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} setMoveBy={setMoveBy} />


    </div>
  )
}

export function translateImages(gallery, curImgIdx, setcurImgIdx, moveBy, setMoveBy) {
  // if index is higher, move to the right then scroll forwards
  // Make curImgIdx be current.

  if (gallery !== null && moveBy !== 0) {
    setMoveBy(0);
    setcurImgIdx((prev) => prev + moveBy);
    const isForwards = (moveBy > 0) ? 1 : -1;
    console.log(`current index is ${curImgIdx} want to move in the ${(moveBy > 0 ? 'forwards' : 'backwards')} next index is ${curImgIdx + moveBy}`)
    const ImgContainer = gallery.querySelector("div.imageContainer");
    const ImagesArr = Array.from(ImgContainer.children);

    const curImg = ImagesArr[curImgIdx];
    const nextImage = ImagesArr[curImgIdx + moveBy];

    console.log('curImg is', curImg)
    console.log('nextImage is', nextImage)

    if (curImgIdx === 0 ){
      console.log('first image')
      curImg.style.transform = `translate(${-100 * (isForwards)}%)`;
    }
    else{
      curImg.style.transform = `translate(${-200 * (isForwards)}%)`;
    }
    
    nextImage.style.transform = `translate(${-100 * (isForwards)}%)`;



    setTimeout(() => {
      curImg.style.translate = '100%';
      curImg.classList = `singleImg ${(isForwards) ? 'leftSideImg' : 'rightSideImg'}`;
      nextImage.style.translate = '100%';
      nextImage.classList = 'singleImg currentImg';
    }, 1500)
    // curImg.classList = `singleImg ${(isForwards) ? 'leftSideImg' : 'rightSideImg'}`;
    // nextImage.classList = 'singleImg currentImg';

    // img.style.transform = `translate(${-100 * (indexToShow)}%)`;
  } else {
    // console.log("gall is null")
  }
}


function positionImages(ImagesArr, curImgIdx) {
  console.log('Positioning images, current index is ', curImgIdx);
  ImagesArr.forEach((img, index) => {
    if (index < curImgIdx) {
      img.classList.add('leftSideImg');
    } else if (index === curImgIdx) {
      img.classList.add('currentImg');
    } else if (index > curImgIdx) {
      img.classList.add('rightSideImg');
    }
  })
}


function getTranslateX(curImg) {
  const transformValue = window.getComputedStyle(curImg).transform;
  let translateX = 0;

  console.log('transformValue', curImg.style.transform)

  if (transformValue !== 'none') {
    const matrixValues = transformValue.match(/matrix\(([^)]+)\)/)[1].split(', ');
    translateX = parseFloat(matrixValues[4]);
  }
  return translateX;
}