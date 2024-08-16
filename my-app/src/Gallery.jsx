import React, { useEffect, useRef, useState } from 'react'
import SwitchImgButton from './SwitchImgButton'
import './styles/gallery.scss';
import GalleryImg from './GalleryImg';
import CarouselNavDots from './CarouselNavDots';



export default function Gallery({ imgDirArr }) {
  // imgDirArr = imgDirArr.concat(imgDirArr);
  const [curImgIdx, setcurImgIdx] = useState(0); // first to be shown
  // console.log("curImgIndex:", curImgIdx);

  const imageContRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (imageContRef.current) {
        const { scrollLeft, offsetWidth } = imageContRef.current;
        // console.log({ scrollLeft, offsetWidth });
        const index = Math.floor(scrollLeft / (offsetWidth - 20)); // I think A better option would be to compare an image posioton to its original position.
        setcurImgIdx(() => index);
        // console.log("scrolling has happened by ", index, " images");
      }
    };

    const carousel = imageContRef.current; // dom element 
    carousel.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // if state changed and not in correct position move images.

    const childrenArr = Array.from(imageContRef.current.children);
    // check translate value of 1st picture.
    const first = childrenArr[0];
    const style = window.getComputedStyle(first);
    const transform = style.transform;
    const matrixValues = transform.replace('matrix(', '').replace(')', '').split(', ');

    console.log(transform);
    const [a, b, c, d, e, f] = matrixValues.map(Number);
    let calculatedPos = Math.round(-e / first.offsetWidth);

    console.log(`${-e} / ${first.offsetWidth}`)

    console.log("calculatedPos rounded: ",calculatedPos," orig: ",-e / first.offsetWidth);
    console.log("curImgIdx: ",curImgIdx);
    
    if(isNaN(calculatedPos))
      calculatedPos=0;

    if(calculatedPos != curImgIdx){
      childrenArr.forEach((img) => {
        img.style = `transform: translate(${-100 * (curImgIdx )}%)`;
      })
    }
  }, [curImgIdx]);

  return (
    <div className='galleryContainer' >
      <SwitchImgButton direction={"backwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <div ref={imageContRef} className="imageContainer">
        {imgDirArr.map((image, index) => {
          return (
            <GalleryImg key={index} img={image} />
          )
        })}
      </div>

      <SwitchImgButton direction={"forwards"} curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />

      <CarouselNavDots curImgIdx={curImgIdx} setcurImgIdx={setcurImgIdx} imagesLength={imgDirArr.length} />


    </div>
  )
}
