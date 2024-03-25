import { LayoutAppWrapper } from '.'
import { Ruby } from '@pages/ruby'
import React from 'react'

/*
 * The wrapper of the entire application
 */
export const LayoutApp: React.FC = () => {
  return (
    <LayoutAppWrapper>
      <Ruby />
    </LayoutAppWrapper>
  )
}
