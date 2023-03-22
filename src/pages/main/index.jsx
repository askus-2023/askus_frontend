import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../components/common/input/TextInput';
import ContainedButton from '../../components/common/button/ContainedButton';
import TextButton from '../../components/common/button/TextButton';
import OutlinedButton from '../../components/common/button/OutlinedButton';
import SearchInput from '../../components/common/input/SearchInput';

const MainPage = () => {
  const [email, setEmail] = useState('');

  return (
    <Wrapper>
      <TextInput
        id='email'
        type='email'
        placeholder='이메일'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <SearchInput />
      <ContainedButton>Contained</ContainedButton>
      <TextButton>Text</TextButton>
      <OutlinedButton>Outlined</OutlinedButton>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
