import React from 'react'

export default function GalleryImg({img,ord}) {
  return (
    <div className="singleImg" style={{ order: ord }}>
        <img src={img} alt="random stockImg" />
    </div>
  )
}
