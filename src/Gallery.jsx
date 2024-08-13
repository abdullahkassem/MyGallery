import React, { useState, useEffect } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/Gallery.scss';
import GalleryImg from './GalleryImg';


export default function Gallery({ imgDirArr }) {

  
  const [numOfDisplayImgs, setNumOfDisplayImgs] = useState(Math.min(3, imgDirArr.length));

  // --> does not work as expected
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // console.log("tablet");
        setNumOfDisplayImgs(2);
      } else {
        // console.log("desktop");
        setNumOfDisplayImgs(3);
      }
    };

    handleResize(); // called to change the size on website load up

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [firstImgInd, setFirstImgInd] = useState(0); // first to be shown
  let displayImgs = getNextN(imgDirArr, firstImgInd, numOfDisplayImgs);

  return (
    <div className='galleryContainer'>
      <SwitchImgButton direction={"backwards"} setFirstImgInd={setFirstImgInd} imagesLength={imgDirArr.length} />

      <div className="imageContainer">
        {displayImgs.map((image, index) => {
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