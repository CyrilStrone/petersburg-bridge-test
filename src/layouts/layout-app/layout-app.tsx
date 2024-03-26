import { LayoutAppWrapper } from '.'
import { Ruby, RubyWrapper } from '@pages/ruby'
import React from 'react'

/*
 * The wrapper of the entire application
 */
export const LayoutApp: React.FC = () => {
  return (
    <LayoutAppWrapper>
      <RubyWrapper>
        <Ruby />
      </RubyWrapper>
    </LayoutAppWrapper>
  )
}
