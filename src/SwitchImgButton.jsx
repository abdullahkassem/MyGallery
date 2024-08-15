import React, { useEffect } from 'react'
import errImg from './assets/cross-sign.png'
import forwardIcon from './assets/right-arrow.png'
import backwardIcon from './assets/left-arrow.png'

// function stackImgs(imagesLength){
//   const AllImgs = document.querySelectorAll(".imageContainer div.singleImg");
//   AllImgs.forEach((img)=>{
//     img.
//   });
// }

export default function SwitchImgButton({direction,curImgIdx,setcurImgIdx,imagesLength=99}) {

  let iconPath = errImg;
  let handler;

  // useEffect(()=>{
  //   stackImgs(imagesLength);
  // },[]);
  
  const clickHandlerIncrement = function(event){
    setcurImgIdx((prev)=>{return(prev+1)%imagesLength}); // increment state, so we can keep track of position

    const curImg = document.querySelector('.imageContainer').children[curImgIdx];
    const prevImg = document.querySelector('.imageContainer').children[curImgIdx-1];
    const nextImg = document.querySelector('.imageContainer').children[curImgIdx+1];

    console.log(curImg)

    curImg.style.animation = "2s slideToRight forwards";
    if(prevImg)
      prevImg.style.animation = "2s slideToRight forwards";
    if(nextImg)
      nextImg.style.animation = "2s slideToRight forwards";

    // const nextSibiling;
    // console.log(event.target)
    // nextSibiling.style.animation = "2s slideToRight forwards";
    // event.target.style.animation = "2s slideToRight forwards";
  }

  const clickHandlerDecrement = function(){
    setcurImgIdx((prev)=>{return(prev-1)%imagesLength});
    const singleImgDivs = document.querySelectorAll(".imageContainer div.singleImg");
    singleImgDivs.forEach((d)=>{
      d.style.animation = "2s slideToLeft forwards";
    });
  }
  
  if(direction == 'forwards'){
    iconPath = forwardIcon;
    handler = clickHandlerIncrement;
  }else if(direction == 'backwards'){
    iconPath = backwardIcon;
    handler = clickHandlerDecrement;
  }

  
  return (
    <button className='SwitchingButton' onClick={handler}>
      <img className='SwitchingImg' src={iconPath} alt="direction signs" />

    </button>
  )
}
