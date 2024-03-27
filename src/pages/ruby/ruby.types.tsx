import { ENUMRubyTowerLevel } from '@components/ruby-tower'
import { Dispatch, SetStateAction } from 'react'

export interface RubyWrapperProps {
  children: React.ReactNode
}

export interface RubyProps {
  level: ENUMRubyTowerLevel | null
  setLevel: Dispatch<SetStateAction<ENUMRubyTowerLevel | null>>
}
