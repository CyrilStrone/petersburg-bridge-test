import { ENUMRubyTowerLevel, ILevelList } from '.'

const getMaxPercent = (height: number | string, index?: number) => {
  let pastParsedHeight = 0

  if (index !== undefined) {
    LevelList.forEach((level, levelIndex) => {
      if (levelIndex < index) {
        pastParsedHeight +=
          typeof level.height === 'number'
            ? level.height + LevelListGap
            : parseInt(level.height, 10) + LevelListGap
      }
    })
  }

  const parsedHeight =
    typeof height === 'number' ? height : parseInt(height, 10)
  return (
    ((parsedHeight + LevelListGap + pastParsedHeight) / LevelListHeightSum) *
    100
  )
}

export const LevelList: ILevelList[] = [
  {
    width: '74px',
    height: 50,
    color: '#00B047',
    defaultColor: '#254B9D',
    level: ENUMRubyTowerLevel.GREEN_1,
    getMaxPercent() {
      return getMaxPercent(this.height, 0)
    },
  },
  {
    width: '74px',
    height: 43,
    color: '#00D355',
    defaultColor: '#3A5CA5',
    level: ENUMRubyTowerLevel.GREEN_2,
    getMaxPercent() {
      return getMaxPercent(this.height, 1)
    },
  },
  {
    width: '74px',
    height: 38,
    color: '#91E508',
    defaultColor: '#5878BE',
    level: ENUMRubyTowerLevel.GREEN_3,
    getMaxPercent() {
      return getMaxPercent(this.height, 2)
    },
  },
  {
    width: '74px',
    height: 33,
    color: '#FFDF35',
    defaultColor: '#7593D6',
    level: ENUMRubyTowerLevel.ORANGE_1,
    getMaxPercent() {
      return getMaxPercent(this.height, 3)
    },
  },
  {
    width: '74px',
    height: 28,
    color: '#FFAE4E',
    defaultColor: '#94AADC',
    level: ENUMRubyTowerLevel.ORANGE_2,
    getMaxPercent() {
      return getMaxPercent(this.height, 4)
    },
  },
  {
    width: '74px',
    height: 23,
    color: '#FF784E',
    defaultColor: '#B7C8ED',
    level: ENUMRubyTowerLevel.RED_1,
    getMaxPercent() {
      return getMaxPercent(this.height, 5)
    },
  },
  {
    width: '74px',
    height: 18,
    color: '#F65A5A',
    defaultColor: '#D1DEFB',
    level: ENUMRubyTowerLevel.RED_2,
    getMaxPercent() {
      return getMaxPercent(this.height, 6)
    },
  },
]

export const LevelListGap = 2

export const LevelListHeightSum = LevelList.reduce((sum, level, index) => {
  const height =
    typeof level.height === 'number' ? level.height : parseInt(level.height, 10)
  return sum + (index === 0 ? height : height + LevelListGap)
}, 0)
