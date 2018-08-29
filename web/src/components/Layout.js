// Example uses styled-components, but styled-system works with most other css-in-js libraries as well
import styled from 'react-emotion'
import { Link as RouterLink } from '@reach/router'
import {
  space,
  width,
  height,
  fontSize,
  color,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  maxWidth,
  backgroundImage,
  textAlign,
  borderRadius
} from 'styled-system'
import { theme } from 'shared'

export const Box = styled('div')`
  position: relative;
  ${borderRadius}
  ${space}
  ${width}
  ${height}
  ${fontSize}
  ${color}
  ${maxWidth}
  ${backgroundImage}
  ${flex}
`

export const Flex = styled('div')`
  display: flex;
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
  ${width}
  ${height}
`
export const H1 = styled('h1')`
  font-weight: normal;
  color: ${p => (p.light ? theme.colors.white : theme.colors.black)};
  ${fontSize}
  ${color}
  ${space}
`

export const H2 = styled('h2')`
  font-weight: normal;
  color: ${p => (p.light ? theme.colors.white : theme.colors.black)};
  ${fontSize}
  ${color}
  ${space}
`

export const Text = styled('p')`
  font-weight: normal;
  color: ${p => (p.light ? theme.colors.white : theme.colors.black)};
  ${fontSize}
  ${color}
  ${space}
  ${textAlign}
`

export const Link = styled(RouterLink)`
  text-decoration: none;
`

export const CoverArt = styled('img')`
  width: 240px;
  height: 240px;
  border-radius: 4px;
`
