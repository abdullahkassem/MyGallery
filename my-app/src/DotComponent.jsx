import * as React from "react";


const DotComponenet = ({ w = 20, h = 20, rad = 5, ind, curImgIdx, setcurImgIdx, setMoveBy }) => {

  const dotClickHandler = function () {
    const numOfMoves = (ind - curImgIdx); // calculate the numer of moves left or right. if +ve need to move forwards and vice versa
    setMoveBy(numOfMoves);
  }

  return (
    <svg width={w} height={h} xmlns="http://www.w3.org/2000/svg" onClick={dotClickHandler}>
      <circle cx={w / 2} cy={h / 2} r={rad} fill="white" />
    </svg>
  );
}
export default DotComponenet;