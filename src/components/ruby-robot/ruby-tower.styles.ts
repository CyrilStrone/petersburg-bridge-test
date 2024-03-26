import styled from 'styled-components'

/****************************************** RubyRobot *************************************************/
export const RubyRobotWrapper = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.theme.colors.other['0a0e68']};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.white[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`

export const RubyRobotImg = styled.img`
  width: 100px;
  height: 100px;
`
