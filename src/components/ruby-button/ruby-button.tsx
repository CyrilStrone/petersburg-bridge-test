import {
  RubyAnimationContainer,
  RubyButtonButton,
  RubyButtonHammer,
  RubyButtonProps,
  RubyButtonStand,
  RubyButtonWrapper,
  RubyInfoButton,
  RubyInfoContainer,
  RubyInfoText,
} from '.'
import RubyHammer from '@assets/library-picture/ruby-hammer.png'
import RubyStand from '@assets/library-picture/ruby-stand.png'
import { ENUMRubyTowerLevel } from '@components/ruby-tower'
import { SpanRobotoB14 } from '@styles/fonts/roboto'
import { FC, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

export const RubyButton: FC<RubyButtonProps> = memo((props) => {
  /****************************************** Another *************************************************/
  const { t } = useTranslation('ruby', { keyPrefix: 'button' })
  const theme = useTheme()

  /****************************************** useState *************************************************/
  const [text, setText] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('')

  /****************************************** Handle functions *************************************************/
  const handleOnClick = () => {
    if (props.level) {
      props.handleReset()
    } else {
      if (props.isStart) {
        props.handleHit()
      } else {
        props.handleStart()
      }
    }
  }

  /****************************************** useEffect *************************************************/
  useEffect(() => {
    if (props.level) {
      if (props.level === ENUMRubyTowerLevel.RED_2) {
        setText(t('text.level-high'))
      } else {
        setText(t('text.level-low'))
      }
      setButtonText(t('button.new-game'))
    } else {
      if (props.isStart) {
        setText(t('text.start'))
        setButtonText(t('button.hit'))
      } else {
        setText(t('text.first'))
        setButtonText(t('button.new-game'))
      }
    }
  }, [props.level, props.isStart, t])

  return (
    <RubyButtonWrapper>
      <RubyAnimationContainer>
        <RubyButtonHammer
          src={RubyHammer}
          $isActive={props.isActive}
          $isStart={props.isStart}
        />
        <RubyButtonButton
          $isActive={props.isActive}
          width="67"
          height="36"
          viewBox="0 0 67 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="first"
            d="M66.6253 8.92303H9.5153e-06V26.2387C3.17214e-06 26.241 0 26.2433 0 26.2456C0 26.2479 3.17214e-06 26.2502 9.5153e-06 26.2525V26.7691H0.0554831C1.05954 31.4929 15.5654 35.24 33.3126 35.24C51.0599 35.24 65.5657 31.4929 66.5698 26.7691H66.6253V8.92303Z"
            fill={theme.colors.other.c53030}
          />
          <path
            d="M66.6253 8.99441C66.6253 13.9619 51.7107 17.9888 33.3126 17.9888C14.9146 17.9888 0 13.9619 0 8.99441C0 4.02693 14.9146 0 33.3126 0C51.7107 0 66.6253 4.02693 66.6253 8.99441Z"
            fill={theme.colors.other.f65a5a}
          />
          <path
            d="M65.3126 8C65.3126 12.4183 50.9857 16 33.3126 16C15.6395 16 1.31262 12.4183 1.31262 8C1.31262 3.58172 15.6395 0 33.3126 0C50.9857 0 65.3126 3.58172 65.3126 8Z"
            fill="url(#paint0_linear_1809_3095)"
            fillOpacity="0.4"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1809_3095"
              x1="3.3125"
              y1="6.5"
              x2="39.3125"
              y2="6.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </RubyButtonButton>
        <RubyButtonStand src={RubyStand} alt="Stand" />
      </RubyAnimationContainer>
      <RubyInfoContainer>
        <RubyInfoText>
          <SpanRobotoB14 color={theme.colors.white[100]}>{text}</SpanRobotoB14>
          {props.level === ENUMRubyTowerLevel.RED_2 && (
            <SpanRobotoB14 color={theme.colors.other.ff4646}>
              {t('text.level-ruby')}
            </SpanRobotoB14>
          )}
        </RubyInfoText>
        <RubyInfoButton
          $isActive={props.isActive}
          $isStart={props.isStart}
          onClick={handleOnClick}
        >
          <SpanRobotoB14 color={theme.colors.white[100]}>
            {buttonText}
          </SpanRobotoB14>
        </RubyInfoButton>
      </RubyInfoContainer>
    </RubyButtonWrapper>
  )
})
