import { RubyTowerLevel } from '@local/components/ruby-tower/ruby-tower.types';
import { publicAsset } from '@local/core/functions';
import { SpanRobotoB14 } from '@local/styles/fonts/roboto';

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import {
  RubyAnimationContainer,
  RubyButtonButton,
  RubyButtonHammer,
  RubyButtonStand,
  RubyButtonWrapper,
  RubyInfoButton,
  RubyInfoContainer,
  RubyInfoText,
} from './ruby-button.styles';
import { IRubyButtonProps } from './ruby-button.types';

const HAMMER_PICTURE = publicAsset('library-picture/ruby-hammer.png');
const STAND_PICTURE = publicAsset('library-picture/ruby-stand.png');

export const RubyButton: FC<IRubyButtonProps> = memo((props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'game' });
  const theme = useTheme();

  const isRubyLevel = props.level === RubyTowerLevel.RED_2;

  let text = t('first');
  let buttonText = t('newGame');

  if (props.level) {
    text = isRubyLevel ? t('levelHigh') : t('levelLow');
    buttonText = t('newGame');
  } else if (props.isStart) {
    text = t('start');
    buttonText = t('hit');
  }

  const handleOnClick = () => {
    if (props.level) {
      props.handleReset();
    } else if (props.isStart) {
      props.handleHit();
    } else {
      props.handleStart();
    }
  };

  return (
    <RubyButtonWrapper>
      <RubyAnimationContainer>
        <RubyButtonHammer src={HAMMER_PICTURE} $isActive={props.isActive} $isStart={props.isStart} />

        <RubyButtonButton
          $isActive={props.isActive}
          width='67'
          height='36'
          viewBox='0 0 67 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            id='first'
            d='M66.6253 8.92303H9.5153e-06V26.2387C3.17214e-06 26.241 0 26.2433 0 26.2456C0 26.2479 3.17214e-06 26.2502 9.5153e-06 26.2525V26.7691H0.0554831C1.05954 31.4929 15.5654 35.24 33.3126 35.24C51.0599 35.24 65.5657 31.4929 66.5698 26.7691H66.6253V8.92303Z'
            fill={theme.colors.other.c53030}
          />
          <path
            d='M66.6253 8.99441C66.6253 13.9619 51.7107 17.9888 33.3126 17.9888C14.9146 17.9888 0 13.9619 0 8.99441C0 4.02693 14.9146 0 33.3126 0C51.7107 0 66.6253 4.02693 66.6253 8.99441Z'
            fill={theme.colors.other.f65a5a}
          />
          <path
            d='M65.3126 8C65.3126 12.4183 50.9857 16 33.3126 16C15.6395 16 1.31262 12.4183 1.31262 8C1.31262 3.58172 15.6395 0 33.3126 0C50.9857 0 65.3126 3.58172 65.3126 8Z'
            fill='url(#paint0_linear_1809_3095)'
            fillOpacity='0.4'
          />
          <defs>
            <linearGradient
              id='paint0_linear_1809_3095'
              x1='3.3125'
              y1='6.5'
              x2='39.3125'
              y2='6.5'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='white' />
              <stop offset='1' stopColor='white' stopOpacity='0' />
            </linearGradient>
          </defs>
        </RubyButtonButton>
        <RubyButtonStand src={STAND_PICTURE} alt='Stand' />
      </RubyAnimationContainer>
      <RubyInfoContainer>
        <RubyInfoText>
          <SpanRobotoB14 color={theme.colors.white[100]}>{text}</SpanRobotoB14>
          {isRubyLevel && <SpanRobotoB14 color={theme.colors.other.ff4646}>{t('levelRuby')}</SpanRobotoB14>}
        </RubyInfoText>
        <RubyInfoButton $isActive={props.isActive} $isStart={props.isStart} onClick={handleOnClick} type='button'>
          <SpanRobotoB14 color={theme.colors.white[100]}>{buttonText}</SpanRobotoB14>
        </RubyInfoButton>
      </RubyInfoContainer>
    </RubyButtonWrapper>
  );
});
