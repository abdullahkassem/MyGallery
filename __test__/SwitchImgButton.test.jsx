import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SwitchImgButton from '../src/SwitchImgButton';

describe('Switching button for carousel',()=>{
    test('renders the button with the correct text', () => {
        render(<SwitchImgButton>Click Me</SwitchImgButton>);
        const buttonElement = screen.getByText(/click me/i);
        expect(buttonElement).toBeInTheDocument();
      });
      
})

