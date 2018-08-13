import React from 'react'
import styled from 'react-emotion'

const Input = styled('input')({
  borderRadius: 16,
  border: 'none',
  padding: '8px 12px'
})

export const CreateStation = props => (
  <div>
    <label hidden htmlFor="station">
      Create Station
    </label>
    <Input name="station" type="text" placeholder="Create Station" {...props} />
  </div>
)
