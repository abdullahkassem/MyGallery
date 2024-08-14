import React, { useState, useEffect } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/Gallery.scss';
import GalleryImg from './GalleryImg';


export default function Gallery({ imgDirArr }) {

  const [firstImgInd, setFirstImgInd] = useState(0); // first to be shown

  return (
    <div className='galleryContainer'>
      <SwitchImgButton direction={"backwards"} setFirstImgInd={setFirstImgInd} imagesLength={imgDirArr.length} />

      <div className="imageContainer">
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} imgLink={image} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} setFirstImgInd={setFirstImgInd} imagesLength={imgDirArr.length} />


    </div>
  )
}



function getNextN(array, start, N) {
  const length = array.length;
  const result = [];

  for (let i = 0; i < N; i++) {
    let index = (start + i) % length;
    if (index < 0) index = length + index;
    result.push(array[index]);
  }

  return result;
}