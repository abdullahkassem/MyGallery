import React from 'react';
import crossSign from './assets/cross-sign.png';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';


export default function SwitchImgButton({ direction, curImgIdx, setcurImgIdx, imagesLength = 99 , setMoveImages}) {

  let iconPath = crossSign;
  let handler = function () { console.log("Wrong direction used.") };

  const clickHandlerIncrement = function (event) {
    setMoveImages(true);
    if (curImgIdx < (imagesLength - 1)) {
      setcurImgIdx((prev) => { return (prev + 1) % (imagesLength) }); // increment state, so we can keep track of position
    }else {
      console.log("outofBounds");
    }

  }

  const clickHandlerDecrement = function () {
    setMoveImages(true);
    if (curImgIdx > 0) {
      setcurImgIdx((prev) => { return (prev - 1) % (imagesLength) });
    } else {
      console.log("outofBounds");
    }
  }

  if (direction === 'forwards') {
    iconPath = rightArrow;
    handler = clickHandlerIncrement;
  } else if (direction === 'backwards') {
    iconPath = leftArrow;
    handler = clickHandlerDecrement;
  }


  return (
    <button className='SwitchingButton' onClick={handler} title='testingGallery'>
      <img className='SwitchingImg' src={iconPath} alt="direction signs" />
    </button>
  )
}
