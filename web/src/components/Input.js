import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { Box } from 'components'

const StyledInput = styled('input')({
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  borderBottom: '1px solid #fff',
  width: '100%',
  '::placeholder': {
    color: 'transparent'
  },
  '&:focus::placeholder': {
    color: '#fff'
  }
})

const StyledLabel = styled('label')(
  {
    position: 'absolute',
    color: '#fff',
    transition: '0.15s'
  },
  ({ floating }) => ({
    top: floating ? -24 : 0
  })
)

export class Input extends React.Component {
  state = {
    focused: false
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleBlur = () => {
    this.setState({ focused: false })
  }

  render() {
    const { focused } = this.state
    const { label, name, ...props } = this.props
    return (
      <Box>
        <StyledLabel htmlFor={name} floating={focused || props.value !== ''}>
          {label}
        </StyledLabel>
        <StyledInput
          type="text"
          id={name}
          name={name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...props}
        />
      </Box>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string
}
