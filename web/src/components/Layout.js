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
  alignItems,
  maxWidth,
  backgroundImage,
  textAlign
} from 'styled-system'

export const Box = styled('div')`
  position: relative;
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${maxWidth}
  ${backgroundImage}
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
  ${fontSize}
  ${color}
  ${space}
`

export const Text = styled('p')`
  color: #fff;
  font-weight: normal;
  ${fontSize}
  ${color}
  ${space}
  ${textAlign}
`
export const CoverArt = styled('img')`
  width: 240px;
  height: 240px;
  border-radius: 4px;
`
