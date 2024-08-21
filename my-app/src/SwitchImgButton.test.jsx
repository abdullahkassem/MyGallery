import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SwitchImgButton from './SwitchImgButton';
import leftArr from './assets/left-arrow.png';
import rightArr from './assets/right-arrow.png';
import crossSign from './assets/cross-sign.png';



describe('Button Component', () => {
    const setcurImgIdxMock = jest.fn();
    const setMoveByMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        document.body.innerHTML = `
        <div class="imageContainer">
          <div class="singleImg title="singleIMG"></div>
          <div class="singleImg"></div>
        </div>
      `;
    });

    test('renders a button with backwards direction and checks if image is correct', () => {
        const handleClick = jest.fn();
        const imageSrc = leftArr;
        const altText = 'direction signs';

        render(<SwitchImgButton direction="backwards" curImgIdx={0} imagesLength={6} setMoveBy={setMoveByMock} />);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);

    });

    test('renders a button with invalid direction value', () => {
        const handleClick = jest.fn();
        const imageSrc = crossSign;
        const altText = 'direction signs';

        render(<SwitchImgButton direction="gibberish" curImgIdx={0} imagesLength={6} setMoveBy={setMoveByMock} />);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);

    });

    test('test that clicking calls the handler for the backwards direction ', () => {
        
        const curImgIdx = 1;
        render(<SwitchImgButton direction="backwards" curImgIdx={curImgIdx} imagesLength={6} setMoveBy={setMoveByMock} />);
        const button = screen.getByTitle('navButtonTitle');

        fireEvent.click(button);

        expect(setMoveByMock).toHaveBeenCalledWith(-1);
        
        
      
    })

    test('renders a button with forwards direction and checks if image is correct', () => {
        const handleClick = jest.fn();
        const imageSrc = rightArr;
        const altText = 'direction signs';

        render(<SwitchImgButton direction="forwards" curImgIdx={0} imagesLength={6} setMoveBy={setMoveByMock}/>);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);


    });
    test('test that clicking calls the handler for the forwards direction ', () => {
        const curImgIdx = 1;
        render(<SwitchImgButton direction="forwards" curImgIdx={0}  setMoveBy={setMoveByMock}/>);
        const button = screen.getByTitle('navButtonTitle');

        fireEvent.click(button);

        expect(setMoveByMock).toHaveBeenCalledWith(1);

    })

    test('Test that the carousel will not go out of bounds, higher than num of images', () => {
        const curImgIdx = 5;
        render(<SwitchImgButton direction="forwards" curImgIdx={curImgIdx} imagesLength={6} setMoveBy={setMoveByMock}/>);
        const button = screen.getByTitle('navButtonTitle');
        fireEvent.click(button);

        expect(setMoveByMock).not.toHaveBeenCalled();

    })

    test('Test that the carousel will not go out of bounds, lower than 0', () => {
        const curImgIdx = 0;
        render(<SwitchImgButton direction="backwards" curImgIdx={curImgIdx} imagesLength={6} setMoveBy={setMoveByMock} />);
        const button = screen.getByTitle('navButtonTitle');
        fireEvent.click(button);

        expect(setMoveByMock).not.toHaveBeenCalled();

    })
});