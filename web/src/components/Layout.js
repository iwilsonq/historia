// Example uses styled-components, but styled-system works with most other css-in-js libraries as well
import styled from 'react-emotion'
import { Link as RouterLink } from '@reach/router'
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
export const Link = styled(RouterLink)`
  text-decoration: none;
`

export const CoverArt = styled('img')`
  width: 240px;
  height: 240px;
  border-radius: 4px;
`

export const FlipSide = styled('div')`
  animation: coin-rotate 0.5s both;

  @keyframes coin-rotate {
    from {
      transform: rotateY(${p => (p.reverse ? '90' : '0')}deg);
    }

    to {
      transform: rotateY(${p => (p.reverse ? '0' : '90')}deg);
    }
  }
`
