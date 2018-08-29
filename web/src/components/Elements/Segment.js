import React from 'react'
import { Box } from 'components'
import { theme } from 'shared'

export const Segment = props => (
  <Box p={16} bg={theme.colors.dark} borderRadius={4} {...props}>
    {props.children}
  </Box>
)
