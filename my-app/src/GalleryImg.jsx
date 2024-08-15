import React from 'react'
import img from './assets/galleryImgs/stock1.jpg'


export default function GalleryImg({imgLink}) {
  console.log(imgLink);
  // const temp = require(imgLink);
  return (
    <div className="singleImg">
        <img src={img} alt="random stockImg" />
    </div>
  )
}
