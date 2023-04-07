import React from 'react';
import styled from 'styled-components';
import icSpinner from '../../../assets/icons/spinner.svg';
import icSpinnerWhite from '../../../assets/icons/spinner-white.svg';

const Spinner = ({ className, color }) => {
  return (
    <Wrapper className={className}>
      {color === 'white' ? (
        <img src={icSpinnerWhite} alt='spinner' />
      ) : (
        <img src={icSpinner} alt='spinner' />
      )}
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  height: 24px;
`;
