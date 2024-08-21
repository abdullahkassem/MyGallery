import { React } from 'react';
import { render, screen, fireEvent, getByTestId, getByTitle } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Gallery from './Gallery';
import {img1,img2,img3,img4,img5,img6} from './image.jpg';

describe('Gallery Component', () => {

  test('Test rendering of component', () => {
    const imgNameArr = [img1, img2, img3, img4, img5, img6];
    const numOfImages = imgNameArr.length;
    render(<Gallery imgDirArr={imgNameArr}/>);
    const imgsElementArray = screen.getAllByAltText('random stockImg');
    expect(imgsElementArray.length).toEqual(numOfImages);
  });

  test('pressing forward button should move first image to the left', () => {
    const imgNameArr = [img1, img2, img3, img4, img5, img6];
    const numOfImages = imgNameArr.length;
    render(<Gallery imgDirArr={imgNameArr}/>);
    // screen.debug();
    const forwardButton = screen.getAllByTitle('navButtonTitle')[1];
    fireEvent.click(forwardButton);
    const imageContainer = screen.getByTestId('image-container');
    const imagArr = imageContainer.children;
    
    expect(imagArr[0]).toHaveStyle('transform: translate(-100%)');

  });

  test('pressing backwards button should not move', () => {
    const imgNameArr = [img1, img2, img3, img4, img5, img6];
    const numOfImages = imgNameArr.length;
    render(<Gallery imgDirArr={imgNameArr}/>);
    // screen.debug();
    const backwardButton = screen.getAllByTitle('navButtonTitle')[0];
    fireEvent.click(backwardButton);
    const imageContainer = screen.getByTestId('image-container');
    const imagArr = imageContainer.children;
    
    expect(imagArr[0]).toHaveStyle('transform: translate(0)');

  });

  test('pressing forwards then backwards button should ', () => {
    const imgNameArr = [img1, img2, img3, img4, img5, img6];
    const numOfImages = imgNameArr.length;
    render(<Gallery imgDirArr={imgNameArr}/>);
    // screen.debug();
    const forwardButton = screen.getAllByTitle('navButtonTitle')[1];
    const backwardButton = screen.getAllByTitle('navButtonTitle')[0];
    fireEvent.click(forwardButton);
    fireEvent.click(backwardButton);
    const imageContainer = screen.getByTestId('image-container');
    const imagArr = imageContainer.children;
    
    expect(imagArr[0]).toHaveStyle('transform: translate(0)');

  });

  test('pressing forward button twice should move the 2nd image to the left', () => {
    const imgNameArr = [img1, img2, img3, img4, img5, img6];
    const numOfImages = imgNameArr.length;
    render(<Gallery imgDirArr={imgNameArr}/>);
    // screen.debug();
    const forwardButton = screen.getAllByTitle('navButtonTitle')[1];
    fireEvent.click(forwardButton);
    fireEvent.click(forwardButton);
    const imageContainer = screen.getByTestId('image-container');
    const imagArr = imageContainer.children;
    
    expect(imagArr[1]).toHaveStyle('transform: translate(-100%)');

  });
  

});