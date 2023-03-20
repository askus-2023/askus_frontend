import React, { useState } from "react"
import styled from "styled-components"
import TextInput from "../../components/common/input/TextInput"
import ContainedButton from "../../components/common/button/ContainedButton"
import TextButton from "../../components/common/button/TextButton"
import OutlinedButton from "../../components/common/button/OutlinedButton"

const MainPage = () => {
  const [email, setEmail] = useState('')

 return (
  <Wrapper>
    <TextInput
      id='email'
      type='email'
      placeholder='이메일'
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      error={true}
      errMsg='에러메시지입니다'
    />
    <ContainedButton>Contained</ContainedButton>
    <TextButton>Text</TextButton>
    <OutlinedButton>Outlined</OutlinedButton>
  </Wrapper>
 )
}

export default MainPage

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`