export interface IRubyTowerProps {
  level?: RubyTowerLevel | null;
}

export enum RubyTowerLevel {
  GREEN_1 = 1,
  GREEN_2 = 2,
  GREEN_3 = 3,
  ORANGE_1 = 4,
  ORANGE_2 = 5,
  RED_1 = 6,
  RED_2 = 7,
}

export interface IRubyTowerLevelItem {
  width: number | string;
  height: number | string;
  color: string;
  defaultColor: string;
  level: RubyTowerLevel;
  getMaxPercent(): number;
}
