import React from 'react';
import crossSign from './assets/cross-sign.png';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';


export default function SwitchImgButton({ direction, curImgIdx, imagesLength = 99 , setMoveBy}) {

  let iconPath = crossSign;
  let handler = function () { console.log("Wrong direction used.") };

  const clickHandlerIncrement = function (event) {
    if (curImgIdx < (imagesLength - 1)) {
      setMoveBy(1); // increment state, so we can keep track of position
    }else {
      console.log("outofBounds");
    }

  }

  const clickHandlerDecrement = function () {
    if (curImgIdx > 0) {
      setMoveBy(-1);
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
    <button className='SwitchingButton' onClick={handler} title='navButtonTitle'>
      <img className='SwitchingImg' src={iconPath} alt="direction signs" />
    </button>
  )
}
