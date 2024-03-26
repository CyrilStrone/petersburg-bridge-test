import styled, { css } from 'styled-components'

export interface FontProps {
  color?: string
  cursor?: 'pointer'
}

const Roboto = css<FontProps>`
  font-family: Roboto;
  font-style: normal;
  line-height: normal;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.other.c53030};
  cursor: ${(props) => props.cursor && props.cursor};
`

export const RobotoB14 = css`
  ${Roboto};
  font-size: 14px;
  font-weight: 700;
`
export const SpanRobotoB14 = styled.span<FontProps>`
  ${RobotoB14};
`

export const RobotoB32 = css`
  ${Roboto};
  font-size: 32px;
  font-weight: 700;
`
export const SpanRobotoB32 = styled.span<FontProps>`
  ${RobotoB32};
`

export const RobotoB40 = css`
  ${Roboto};
  font-size: 40px;
  font-weight: 700;
`
export const SpanRobotoB40 = styled.span<FontProps>`
  ${RobotoB40};
`
export const RobotoR12 = css`
  ${Roboto};
  font-size: 12px;
  font-weight: 400;
`
export const SpanRobotoR12 = styled.span<FontProps>`
  ${RobotoR12};
`

export const RobotoR14 = css`
  ${Roboto};
  font-size: 14px;
  font-weight: 400;
`
export const SpanRobotoR14 = styled.span<FontProps>`
  ${RobotoR14};
`

export const RobotoR16 = css`
  ${Roboto};
  font-size: 16px;
  font-weight: 400;
`
export const SpanRobotoR16 = styled.span<FontProps>`
  ${RobotoR16};
`

export const RobotoR18 = css`
  ${Roboto};
  font-size: 18px;
  font-weight: 400;
`
export const SpanRobotoR18 = styled.span<FontProps>`
  ${RobotoR18};
`

export const RobotoM12 = css`
  ${Roboto};
  font-size: 12px;
  font-weight: 500;
`
export const SpanRobotoM12 = styled.span<FontProps>`
  ${RobotoM12};
`

export const RobotoM14 = css`
  ${Roboto};
  font-size: 14px;
  font-weight: 500;
`
export const SpanRobotoM14 = styled.span<FontProps>`
  ${RobotoM14};
`

export const RobotoM15 = css`
  ${Roboto};
  font-size: 15px;
  font-weight: 500;
`
export const SpanRobotoM15 = styled.span<FontProps>`
  ${RobotoM15};
`

export const RobotoM16 = css`
  ${Roboto};
  font-size: 16px;
  font-weight: 500;
`
export const SpanRobotoM16 = styled.span<FontProps>`
  ${RobotoM16};
`

export const RobotoSB16 = css`
  ${Roboto};
  font-size: 16px;
  font-weight: 600;
`
export const SpanRobotoSB16 = styled.span<FontProps>`
  ${RobotoSB16};
`
