import React from 'react'
import styled from 'react-emotion'

const StyledButton = styled('button')({
  backgroundColor: '#fff',
  padding: '12px 24px',
  border: 'none',
  borderRadius: 30,
  cursor: 'pointer',
  '&:hover,&:focus': {
    backgroundColor: '#b0b0b0'
  }
})

export const Button = props => <StyledButton {...props} />
