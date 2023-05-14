import React from 'react';
import styled from 'styled-components';
import icSpinner2 from '../../../assets/icons/spinner2.svg';

const Spinner2 = () => {
  return (
    <Wrapper>
      <img src={icSpinner2} alt='spinner' />
    </Wrapper>
  );
};

export default Spinner2;

const Wrapper = styled.div`
  height: 24px;
`;
