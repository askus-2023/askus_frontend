import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import icAdd from '../../assets/icons/add.svg';
import icGallery from '../../assets/icons/gallery.svg';
import icVideo from '../../assets/icons/video.svg';
import icEmbed from '../../assets/icons/embed.svg';
import icPart from '../../assets/icons/part.svg';

const InlineTooltip = forwardRef((props, ref) => {
  const [isOpenTooltip, openTooltip] = useState(false);

  const toggleTooltip = () => {
    openTooltip(!isOpenTooltip);
  };

  return (
    <Wrapper ref={ref}>
      <ButtonWrapper isOpen={isOpenTooltip}>
        <button className='btn-toggle' onClick={toggleTooltip}>
          <img src={icAdd} alt='toggle' />
        </button>
      </ButtonWrapper>
      {isOpenTooltip && (
        <TooltipWrapper>
          <ButtonWrapper>
            <button className='btn-gallery'>
              <label htmlFor='gallery'>
                <input id='gallery' type='file' accept='image/*' />
                <img src={icGallery} alt='gallery' />
              </label>
            </button>
          </ButtonWrapper>
          <ButtonWrapper>
            <button>
              <img src={icVideo} alt='video' />
            </button>
          </ButtonWrapper>
          <ButtonWrapper>
            <button>
              <img src={icEmbed} alt='embed' />
            </button>
          </ButtonWrapper>
          <ButtonWrapper>
            <button>
              <img src={icPart} alt='part' />
            </button>
          </ButtonWrapper>
        </TooltipWrapper>
      )}
    </Wrapper>
  );
});

export default InlineTooltip;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  gap: 1.6rem;
`;
const ButtonWrapper = styled.div`
  button {
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    border: 0.1rem solid ${theme.colors.grey90};
    border-radius: 50%;
    img {
      margin: auto;
    }
  }
  .btn-toggle {
    transition: all 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotateZ(45deg)' : '')};
  }
  .btn-gallery {
    label {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;
const TooltipWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;
