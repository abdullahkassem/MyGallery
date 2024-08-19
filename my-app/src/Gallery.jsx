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


  useEffect(()=>{
    if (moveBy !== 0)
      translateImages(galleryRef.current, curImgIdx, setcurImgIdx, moveBy, setMoveBy)
  },[curImgIdx,moveBy])

  useEffect(() => {
    const ImagesArr = Array.from(imageContRef.current.children);
    positionImages(ImagesArr, 0)
  }, [])

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
  const newCurrent = curImgIdx+moveBy;
  setcurImgIdx(newCurrent);
  setMoveBy(0); //since we already handled the move we could reset it to zero
  const imgArray = Array.from( gallery.querySelectorAll('.imageContainer div') );

  positionImages(imgArray,newCurrent);

}


function positionImages(ImagesArr, curImgIdx) {
  console.log('Positioning images, current index is ', curImgIdx);
  ImagesArr.forEach((img, index) => {
    if (index < curImgIdx) {
      img.style.transform = 'translate(-100%)';
    } else if (index === curImgIdx) {
      img.style.transform = 'translate(0)';
      img.style.zIndex = 2;
    } else if (index > curImgIdx) {
      img.style.transform = 'translate(100%)';
    }
  })
}
