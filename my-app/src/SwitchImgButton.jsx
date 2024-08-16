import React from 'react';
import crossSign from './assets/cross-sign.png';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';


export default function SwitchImgButton({ direction, curImgIdx, setcurImgIdx, imagesLength = 99 }) {

  let iconPath = crossSign;
  let handler = function() {console.log("Wrong direction used.")};


  const clickHandlerIncrement = function (event) {
    setcurImgIdx((prev) => { return (prev + 1) % imagesLength }); // increment state, so we can keep track of position
    const singleImgDivs = document.querySelectorAll(".imageContainer div.singleImg");
    singleImgDivs.forEach((img)=>{
      img.style = `transform: translate(${-100*(curImgIdx+1)}%)`;
    })

  }

  const clickHandlerDecrement = function () {
    setcurImgIdx((prev) => { return (prev - 1) % imagesLength });
    const singleImgDivs = document.querySelectorAll(".imageContainer div.singleImg");
    singleImgDivs.forEach((img)=>{
      img.style = `transform: translate(${-100*(curImgIdx)+100}%)`;
    }) 
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
