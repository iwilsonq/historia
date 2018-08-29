import styled from 'react-emotion'
import { theme } from 'shared'

export const StyledLabel = styled('label')({}, ({ light }) => ({
  color: light ? theme.colors.white : theme.colors.dark
}))
