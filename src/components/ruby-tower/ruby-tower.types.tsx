export interface RubyTowerProps {
  level?: ENUMRubyTowerLevel | null
}

export enum ENUMRubyTowerLevel {
  GREEN_1 = 1,
  GREEN_2 = 2,
  GREEN_3 = 3,
  ORANGE_1 = 4,
  ORANGE_2 = 5,
  RED_1 = 6,
  RED_2 = 7,
}

export interface ILevelList {
  width: number | string
  height: number | string
  color: string
  defaultColor: string
  level: ENUMRubyTowerLevel
  getMaxPercent(): number
}
