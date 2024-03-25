import { RubyWrapper } from '.'
import { ENUMRubyTowerLevel, RubyTower } from '@components/ruby-tower'
import { FC } from 'react'

export const Ruby: FC = () => {
  return (
    <RubyWrapper>
      <RubyTower level={ENUMRubyTowerLevel.RED_2} />
    </RubyWrapper>
  )
}
