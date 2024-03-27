import { LayoutAppWrapper } from '.'
import { ENUMRubyTowerLevel } from '@components/ruby-tower'
import { Ruby } from '@pages/ruby'
import React, { useState } from 'react'

/*
 * The wrapper of the entire application
 */
export const LayoutApp: React.FC = () => {
  const [rubyLevel, setRubyLevel] = useState<ENUMRubyTowerLevel | null>(null)

  // const getRubyLevel = useCallback(() => {
  //   console.log('rubyLevel', rubyLevel)
  // }, [rubyLevel])

  return (
    <LayoutAppWrapper>
      <Ruby level={rubyLevel} setLevel={setRubyLevel} />
    </LayoutAppWrapper>
  )
}
