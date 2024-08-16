import React, { useEffect, useRef, useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';



export default function Gallery({ imgDirArr }) {
  // imgDirArr = imgDirArr.concat(imgDirArr);
  const [curImgIdx, setcurImgIdx] = useState(0); // first to be shown
  console.log("curImgIndex:",curImgIdx);

  const carouselRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, offsetWidth } = carouselRef.current;
        console.log({ scrollLeft, offsetWidth });
        const index = Math.floor(scrollLeft / (offsetWidth-20));
        setcurImgIdx(index);
        console.log("scrolling has happened by ",index," images");
      }
    };
  
    const carousel = carouselRef.current; // dom element 
    carousel.addEventListener('scroll', handleScroll);
  
    // Clean up function
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  return (
    <div className='galleryContainer' >
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <div ref={carouselRef} className="imageContainer">
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} />
          )
        })}

      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length}/>


    </div>
  )
}
