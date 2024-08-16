import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SwitchImgButton from './SwitchImgButton';
import leftArr from './assets/left-arrow.png';
import rightArr from './assets/right-arrow.png';
import crossSign from './assets/cross-sign.png';



describe('Button Component', () => {
    const setcurImgIdxMock = jest.fn();

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

        render(<SwitchImgButton direction="backwards" curImgIdx={0} setcurImgIdx={setcurImgIdxMock} />);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);

    });

    test('renders a button with invalid direction value', () => {
        const handleClick = jest.fn();
        const imageSrc = crossSign;
        const altText = 'direction signs';

        render(<SwitchImgButton direction="gibberish" curImgIdx={0} setcurImgIdx={setcurImgIdxMock} />);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);

    });

    test('test that clicking calls the handler for the backwards direction ', () => {

        render(<SwitchImgButton direction="backwards" curImgIdx={0} setcurImgIdx={setcurImgIdxMock} />);
        const button = screen.getByTitle('testingGallery');

        fireEvent.click(button);

        expect(setcurImgIdxMock).toHaveBeenCalled();
        expect(setcurImgIdxMock).toHaveBeenCalledWith(expect.any(Function));

        setcurImgIdxMock.mock.calls; // Simulate decrement to -1
        const singleImgDivs = document.querySelectorAll('.imageContainer .singleImg');
        singleImgDivs.forEach((img, index) => {
            expect(img).toHaveStyle(`transform: translate(${-100*(0)+100}%)`);
            
        });
    })

    test('renders a button with forwards direction and checks if image is correct', () => {
        const handleClick = jest.fn();
        const imageSrc = rightArr;
        const altText = 'direction signs';

        render(<SwitchImgButton direction="forwards" curImgIdx={0} setcurImgIdx={setcurImgIdxMock} />);

        // Check if the image is rendered
        const imgElement = screen.getByAltText(altText);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', imageSrc);


    });
    test('test that clicking calls the handler for the forwards direction ', () => {

        render(<SwitchImgButton direction="forwards" curImgIdx={0} setcurImgIdx={setcurImgIdxMock} />);
        const button = screen.getByTitle('testingGallery');

        fireEvent.click(button);

        expect(setcurImgIdxMock).toHaveBeenCalled();
        expect(setcurImgIdxMock).toHaveBeenCalledWith(expect.any(Function));

        setcurImgIdxMock.mock.calls; // Simulate increment to 1
        const singleImgDivs = document.querySelectorAll('.imageContainer .singleImg');
        singleImgDivs.forEach((img, index) => {
            expect(img).toHaveStyle(`transform: translate(${-100 * (0+1)}%)`);
        });
    })
});