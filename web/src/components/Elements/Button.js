import React from 'react'
import styled, { css } from 'react-emotion'
import { Flex } from 'components'
import { theme } from 'shared/theme'

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

const unstyled = css({
  all: 'unset'
})

const clickable = css({
  cursor: 'pointer',
  '&:hover': {
    color: 'lightgrey'
  }
})

class SvgButton extends React.Component {
  state = {
    hover: false
  }

  handleMouseOver = () => {
    this.setState({ hover: true })
  }

  handleMouseOut = () => {
    this.setState({ hover: false })
  }

  render() {
    return (
      <button
        className={`${clickable} ${unstyled}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        {...this.props}
      >
        {React.cloneElement(this.props.children, {
          fill: this.state.hover ? theme.colors.jade : theme.colors.white
        })}
      </button>
    )
  }
}

export const PlayerButtons = ({ children }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" width={350}>
      {React.Children.map(children, child => {
        return (
          <SvgButton key={child.props['data-testid']} {...child.props}>
            {child}
          </SvgButton>
        )
      })}
    </Flex>
  )
}

export const Button = props => <StyledButton {...props} />
