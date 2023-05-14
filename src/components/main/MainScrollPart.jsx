import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/Theme';
import recipe1 from '../../assets/images/mainPage/recipe1.png';
import recipe2 from '../../assets/images/mainPage/recipe2.png';
import recipe3 from '../../assets/images/mainPage/recipe3.png';
import logo from '../../assets/images/logo.png';
import recipebot from '../../assets/images/mainPage/recipebot.mp4';
import food1 from '../../assets/images/mainPage/foodImg/food1.png';
import food2 from '../../assets/images/mainPage/foodImg/food2.png';
import SlideX from './SlideXTransition';
import FontSizeUp from './FontSizeTransition';
import OpacityTransition from './OpacityTransition';
import FixedTransition from './FixedTransition';
import ScaleTransition from './ScaleTransition';

const MainScrollPart = () => {
  const [currentImage, setCurrentImage] = useState(1);

  const mediaRef = useRef(null);

  const translateX1 = SlideX(235, 1050, -20, 0);
  const translateX2 = SlideX(235, 1050, 0, -20);
  const translateX3 = SlideX(5200, 5600, 20, 0);
  const fontSize = FontSizeUp(1390, 2040, 125, 96);
  const opacity = OpacityTransition(2090, 2290);
  const c5Opacity = OpacityTransition(4490, 4690);
  const { position1, position2, top1, top2 } = FixedTransition(
    2350,
    2750,
    2974,
    3450,
    3550
  );
  const { c3Top, scale } = ScaleTransition(3600, 4000, 154, 1, mediaRef);

  const handleImageChange = (imageNumber) => {
    setCurrentImage(imageNumber);
  };

  return (
    <Container>
      <div className='content1'>
        <div>
          <Image1 src={food1} alt='food1' translateX={translateX1} />
        </div>
        <div>
          <Image2 src={food2} alt='food2' translateX={translateX2} />
        </div>
      </div>
      <div className='content2'>
        <Content1 fontSize={fontSize} className='contentAni contentDefault'>
          어떤 요리를
        </Content1>
        <Content1 fontSize={fontSize} className='contentAni contentDefault'>
          해볼까요?
        </Content1>
      </div>
      <div className='content3'>
        <Content2
          className='contentAni contentDefault'
          opacity={opacity}
          position={position1}
          top={top1}
        >
          원하는 레시피가 있으세요?
        </Content2>
        <Content3
          className='contentAni contentFontWeigth contentDefault'
          position={position2}
          top={top2}
        >
          레시피봇에게 물어보세요.
        </Content3>
      </div>
      <Content_4 top={c3Top || 154} className='content4'>
        <RecipebotVideo controls scale={scale} ref={mediaRef}>
          <source src={recipebot} type='video/mp4' />
        </RecipebotVideo>
        <div>
          <Content4 className='contentAni  contentDefault'>
            Chat GPT 기반으로
          </Content4>
          <Content4 className='contentAni contentDefault'>
            동작하는 혁신적인
          </Content4>
          <Content4 className='contentAni contentDefault'>챗봇</Content4>
        </div>
      </Content_4>
      <div className='content5'>
        <Content5 className='contentAni contentDefault' opacity={c5Opacity}>
          여러분의 요리를 돕기 위해
        </Content5>
        <Content5 className='contentAni contentDefault' opacity={c5Opacity}>
          모든 준비가 되었습니다!
        </Content5>
      </div>
      <div className='content6'>
        <NavContainer>
          <div className='recipeTitle'>« 트리 쿠키 만들기 레시피 »</div>
          <NavImage
            src={
              currentImage === 1
                ? recipe1
                : currentImage === 2
                ? recipe2
                : currentImage === 3
                ? recipe3
                : ''
            }
            alt={`recipe ${currentImage}`}
          />
          <div>
            <NavButton
              active={currentImage === 1}
              onClick={() => handleImageChange(1)}
            />
            <NavButton
              active={currentImage === 2}
              onClick={() => handleImageChange(2)}
            />
            <NavButton
              active={currentImage === 3}
              onClick={() => handleImageChange(3)}
            />
          </div>
        </NavContainer>

        <div>
          <Content6
            className='contentAni contentAniTran contentDefault'
            translateX={translateX3}
          >
            저희{' '}
            <span>
              <img src={logo} alt='logo'></img>
            </span>{' '}
            은 다양한 입맛을
          </Content6>
          <Content6
            className='contentAni contentAniTran contentDefault'
            translateX={translateX3}
          >
            돋우는 레시피를 <span className='emphasis'>제공</span>합니다.
          </Content6>
        </div>
      </div>
    </Container>
  );
};

export default MainScrollPart;

const zoomOut = keyframes`
  from {
    transform: matrix(1.5, 0, 0, 1.5, 0, 97);
    left: 40px;
  }
  to {
    transform: matrix(1, 0, 0, 1, 0, 0);
    left: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  .content1 {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    margin-top: 20rem;
  }
  .content2 {
    margin: 33rem 0rem 38rem;
  }
  .content5 {
    position: relative;
    top: 195rem;
  }
  .content6 {
    position: relative;
    top: 236rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 6rem;
  }
  .contentAni {
    transition: transform 3s ease-out;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation: ${zoomOut} 1s linear;
  }
  .contentAniTran {
    transition: transform 0.5s ease-out;
    animation-duration: 1s;
  }
  .contentDefault {
    text-align: center;
    font-weight: 600;
  }
  .contentFontWeigth {
    font-weight: 400;
  }
`;

const Content1 = styled.h3`
  font-size: ${(props) => props.fontSize + 'px'};
  line-height: 0.9791666667;
`;

const Content2 = styled.h3`
  font-size: 96px;
  color: ${theme.colors.green70};
  opacity: ${(props) => props.opacity};
  position: ${(props) => props.position};
  top: ${(props) => props.top}rem;
  width: -webkit-fill-available;
  margin: auto;
  line-height: 0.9791666667;
`;

const Content3 = styled.h4`
  font-size: 75px;
  color: ${theme.colors.tomato};
  width: -webkit-fill-available;
  margin: auto;
  position: ${(props) => props.position};
  top: ${(props) => props.top}rem;
  font-weight: 400;
`;

const Content_4 = styled.div`
  display: flex;
  position: relative;
  top: ${(props) => `${props.top}rem`};
  justify-content: space-evenly;
`;

const Content4 = styled.h3`
  background: linear-gradient(to right top, ${theme.colors.tomato}, orange);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 7.5rem;
  line-height: 1.3;
`;

const Content5 = styled.h3`
  font-size: 7.5rem;
  line-height: 1.3;
  opacity: ${(props) => props.opacity};
`;

const Content6 = styled.h3`
  font-size: 5.5rem;
  line-height: 2;
  transform: ${(props) => `translateX(${props.translateX}%)`};
  .emphasis {
    background-color: ${theme.colors.green50};
    color: #fff;
  }
`;

const RecipebotVideo = styled.video`
  width: 28.8rem;
  height: 40rem;
  transform: ${(props) => `scale(${props.scale})`};
  transition: transform 0.5s ease-out;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;

const Image1 = styled.img`
  height: 45rem;
  transform: ${(props) => `translateX(${props.translateX}%)`};
  transition: transform 0.5s ease-out;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;

const Image2 = styled.img`
  margin-top: 2rem;
  height: 45rem;
  transform: ${(props) => `translateX(${props.translateX}%)`};
  transition: transform 0.5s ease-out;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;

const NavImage = styled.img`
  width: 30rem;
  height: 45rem;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 7rem;
  .recipeTitle {
    padding: 2rem 0 0;
    font-size: 1.6rem;
    background-color: #f9f1ea;
    color: ${theme.colors.grey70};
    width: 30rem;
    text-align: center;
    font-weight: 600;
  }
`;

const NavButton = styled.button`
  margin-top: 2rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: none;
  margin-right: 1rem;
  background-color: ${({ active }) =>
    active ? `${theme.colors.grey70}` : `${theme.colors.grey30}`};
`;
