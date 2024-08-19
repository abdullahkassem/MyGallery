import React from 'react'
import DotComponenet from './DotComponent'
import './styles/carouselNavDot.scss'

export default function CarouselNavDots({curImgIdx,setcurImgIdx,imagesLength,setMoveImages}) {

  const numberArr = Array(imagesLength).fill().map((_, i) => i);

  

  return (
    <div className='NavDotsContainer'>
      {numberArr.map((num,index)=>{
        if(curImgIdx === index)
        {
          return (  <DotComponenet rad={10} key={index} ind={index} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} setMoveImages={setMoveImages}/>)
        }else{
          return (  <DotComponenet  key={index} ind={index} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} setMoveImages={setMoveImages}/>)
          
        }
      })}
    </div>
  )
}
