import { RubyTowerProps } from '@components/ruby-tower'

export interface RubyButtonProps extends RubyTowerProps {
  isActive?: boolean
  isStart?: boolean
  duration: number
  handleReset: () => void
  handleStart: () => void
  handleHit: () => void
}
