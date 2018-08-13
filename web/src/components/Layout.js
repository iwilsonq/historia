// Example uses styled-components, but styled-system works with most other css-in-js libraries as well
import styled from 'react-emotion'
import {
  space,
  width,
  fontSize,
  color,
  flex,
  flexDirection,
  justifyContent,
  alignItems
} from 'styled-system'

export const Box = styled('div')`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`

export const Flex = styled('div')`
  display: flex;
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
`
export const H1 = styled('h1')`
  color: #fff;
  font-weight: normal;
  ${fontSize};
  ${color};
  ${space};
`
export const CoverArt = styled('img')`
  width: 240px;
  height: 240px;
  border-radius: 4px;
`
