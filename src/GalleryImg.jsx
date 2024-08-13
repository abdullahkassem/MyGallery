import React from 'react'

export default function GalleryImg({imgLink}) {
  return (
    <div className="singleImg">
        <img src={imgLink} alt="random stockImg" />
    </div>
  )
}
