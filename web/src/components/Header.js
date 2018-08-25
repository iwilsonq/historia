import React from 'react'
import styled from 'react-emotion'
import { H1, Flex, Box } from 'components/Layout'
import { CreateStation } from 'components/CreateStation'

const TopBar = styled('header')({
  width: '100%',
  minWidth: 666
})

export const Header = () => {
  return (
    <TopBar>
      <Box m="0 auto" p={16} maxWidth={1000}>
        <Flex justifyContent="space-between" alignItems="center">
          <CreateStation />
          <H1 color="#000">Historia</H1>
        </Flex>
      </Box>
    </TopBar>
  )
}
