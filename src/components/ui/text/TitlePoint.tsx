import { rem } from "@/assets/style/emotion/styles";
import { cn } from "@/utils/common";
import styled from "@emotion/styled";

// 🔹 타이틀 포인트 - 스타일 이모션
interface TitlePointPropsType {
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
  title: string,
  pointType?: 'underline' | 'circle' | 'bar',
  className?: string,
  $display?: 'inline-block' | 'block',
  $fontRem?: boolean,
  $fontSize?: number,
  $fixFontSize?:number,
  $activeColor?: string,
}

export const TitlePoint = ({
  titleTag = 'p',
  title,
  pointType = 'circle',
  className,
  $display = 'block',
  $fontRem = false,
  $fontSize = 18,
  $fixFontSize,
  $activeColor
}: TitlePointPropsType) => {
  return (
    <StyleWrap
      $display={$display}
      $fontSize={$fontSize}
      $fixFontSize={$fixFontSize}
      $fontRem={$fontRem}
      className={cn(className, titleTag === 'p' ? 'tit' : 'title', pointType)}
      $activeColor={$activeColor}
      as={titleTag}
    >
      <span>{title}</span>
    </StyleWrap>
  );
};

interface StyleWrapPropsType {
  $display: string;
  $fontRem: boolean
  $fontSize: number;
  $fixFontSize?: number;
  $activeColor?: string;
}

const StyleWrap = styled.div<StyleWrapPropsType>`
  ${({ $display, $fontSize, $fixFontSize, $fontRem, $activeColor }) => {
    const fontSizeValue = $fixFontSize
      ? `${$fixFontSize}px`
      : rem($fontSize, $fontRem);

    return `
      display: ${$display};
      font-size: ${fontSizeValue};

      & > span {
        font-size: inherit;
      }

      &.circle {
        position: relative;
        padding-left: ${
          $fixFontSize
            ? `${$fixFontSize}px`
            : rem($fontSize, $fontRem)
        };

        &::before,
        &::after {
          position: absolute;
          top: ${
            $fixFontSize
              ? `${Math.floor($fixFontSize * 0.42 * 1.3)}px`
              : rem(Math.floor($fontSize * 0.42 * 1.4), $fontRem)
          };
          left: ${
            $fixFontSize
              ? `${Math.floor($fixFontSize * 0.25)}px`
              : rem(Math.floor($fontSize * 0.25), $fontRem)
          };
          width: ${
            $fixFontSize
              ? `${Math.floor($fixFontSize * 0.3)}px`
              : rem(Math.floor($fontSize * 0.3), $fontRem)
          };
          height: ${
            $fixFontSize
              ? `${Math.floor($fixFontSize * 0.3)}px`
              : rem(Math.floor($fontSize * 0.3), $fontRem)
          };
          
          border-radius: 50%;
          background-color: ${$activeColor ?? 'var(--color-point)'};
          content: '';
        }

        &::before {
          animation: titleCircleAni 1s ease infinite;
        }
      }

      &.bar {
        position: relative;
        padding-left: 10px;

        &::before {
          position: absolute;
          top: ${
            $fixFontSize
              ? `${Math.floor($fixFontSize * 0.75)}px`
              : rem(Math.floor($fontSize * 0.75), $fontRem)
          };
          width: 4px;
          height: 2px;
          left: 0;
          background-color: ${$activeColor ?? 'var(--color-point)'};
          content: '';
        }
      }

      &.underline {
        span {
          display: inline-block;
          position: relative;

          &::before {
            position: absolute;
            bottom: 3px;
            left: 0;
            width: calc(100% + 5px);
            height: ${
              ($fixFontSize ?? $fontSize) >= 32 ? 4 : 3
            }px;
            border-radius: 3px;
            background-color: ${$activeColor ?? 'var(--color-point)'};
            opacity: 0.5;
            content: '';
          }
        }
      }

      @keyframes titleCircleAni {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(2.1);
        }
      }
    `;
  }}
`;
