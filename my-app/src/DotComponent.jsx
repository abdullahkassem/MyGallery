import * as React from "react";


const DotComponenet = ({ w = 20, h = 20, rad = 5, ind, curImgIdx, setcurImgIdx, setMoveBy }) => {

  const dotClickHandler = function () {
    const numOfMoves = (ind - curImgIdx); // calculate the numer of moves left or right. if +ve need to move forwards and vice versa
    const singleImgDivs = document.querySelectorAll(".imageContainer div.singleImg");
    if (numOfMoves > 1 || numOfMoves < -1) {
      console.log('Oh oh');
      // Hide inbetween images
      // move to correct index
      for (let i = Math.min(ind, curImgIdx) + 1; i < Math.max(ind, curImgIdx); i++) {
        // console.log("will hide images ", i);
        singleImgDivs[i].style.display = "none";
        singleImgDivs.forEach((img) => {
          img.style.transform = `translate(${-100 * ((ind > curImgIdx) ? curImgIdx + 1 : curImgIdx + -1)}%)`;
        })
        // Now make hidden images appear again

        // Listen to when the transition finishes - Will add on 1st image
        singleImgDivs[0].addEventListener('transitionend', () => {
          singleImgDivs.forEach((img) => {
            img.style.display = 'block';
            const origTransition = 'transform 1.5s ease;';
            img.style.transition = 'none';
            img.style.transform = `translate(${-100 * (ind)}%)`;
          })
        });


//      img.style.transform = `translate(${-100 * (indexToShow)}%)`;


      }
      setMoveBy(ind);

    } else {
      // one step move
      setMoveBy(ind); //update current index

    }

  }

  return (
    <svg width={w} height={h} xmlns="http://www.w3.org/2000/svg" onClick={dotClickHandler}>
      <circle cx={w / 2} cy={h / 2} r={rad} fill="white" />
    </svg>
  );
}
export default DotComponenet;