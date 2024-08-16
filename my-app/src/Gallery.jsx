import React, { useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';



export default function Gallery({ imgDirArr }) {
  // imgDirArr = imgDirArr.concat(imgDirArr);
  const [curImgIdx, setcurImgIdx] = useState(0); // first to be shown
  console.log("curImgIndex:",curImgIdx);

  
  return (
    <div className='galleryContainer' >
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <div className="imageContainer">
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length}/>


    </div>
  )
}
