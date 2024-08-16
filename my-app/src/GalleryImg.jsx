import React from 'react'

export default function GalleryImg({img}) {
  return (
    <div className="singleImg">
        <img src={img} alt="random stockImg" />
    </div>
  )
}
