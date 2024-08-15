import React, { useEffect } from 'react';



export default function SwitchImgButton({ direction, curImgIdx, setcurImgIdx, imagesLength = 99 }) {

  let iconPath = './assets/cross-sign.png';
  let handler;


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

  if (direction == 'forwards') {
    iconPath = './assets/right-arrow.png';
    handler = clickHandlerIncrement;
  } else if (direction == 'backwards') {
    iconPath = './assets/left-arrow.png';
    handler = clickHandlerDecrement;
  }


  return (
    <button className='SwitchingButton' onClick={handler}>
      <img className='SwitchingImg' src={iconPath} alt="direction signs" />

    </button>
  )
}
