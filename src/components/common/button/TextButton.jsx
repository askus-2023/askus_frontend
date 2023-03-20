import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme"

const TextButton = ({ type, children }) => {
  return (
    <Wrapper>
      <button type={type ?? 'button'}>
        {children}
      </button>
    </Wrapper>
  )
}

export default TextButton

const Wrapper = styled.div`
  background-color: white;
  border: none;
  border-radius: 6px;
  display: flex;
  
  button {
    padding: 12px 15px;
    color: ${theme.colors.green50};
    font-size: 16px;
    font-weight: bold;
    &:hover {
      color: ${theme.colors.green70};
    }
  }
`