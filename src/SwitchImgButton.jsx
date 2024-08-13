import React from 'react'
import errImg from './assets/cross-sign.png'
import forwardIcon from './assets/right-arrow.png'
import backwardIcon from './assets/left-arrow.png'


export default function SwitchImgButton({direction,setFirstImgInd,imagesLength=99}) {

  let iconPath = errImg;
  let handler;
  const clickHandlerIncrement = function(){
    setFirstImgInd((prev)=>{return(prev+1)%imagesLength});
  }

  const clickHandlerDecrement = function(){
    setFirstImgInd((prev)=>{return(prev-1)%imagesLength});
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
