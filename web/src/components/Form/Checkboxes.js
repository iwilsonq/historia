import React from 'react'
import { Box } from 'components'
import { StyledLabel } from './styles'

export const CheckboxItem = props => {
  console.log(props.light, typeof props.light)
  return (
    <Box>
      <StyledLabel htmlFor={props.name} light={props.light}>
        <input name={props.name} type="checkbox" {...props} />
        {props.label}
      </StyledLabel>
    </Box>
  )
}

export class Checkboxes extends React.Component {
  render() {
    const { name, options, value, onChange, light } = this.props
    if (!options) {
      return null
    }

    return (
      <Box>
        {options.map(game => (
          <CheckboxItem
            {...game}
            key={game.value}
            checked={value.includes(game.value)}
            onChange={onChange}
            name={name}
            light={light}
          />
        ))}
      </Box>
    )
  }
}
