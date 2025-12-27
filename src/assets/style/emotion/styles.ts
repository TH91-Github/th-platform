import { css } from "@emotion/react";

// 🔹emotion 전용 style

// rem 
export const rem = (fontSize: number, useRem: boolean = true, base:number = 16): string => {
  return useRem ? `${fontSize / base}rem` : `${fontSize}px`;
};

// mixins.scss > scroll
type ScrollDirection = "x" | "y" | "both";

export const scroll = (
  direction: ScrollDirection = "x",
  width: number = 5
) => css`
  ${direction === "y" &&
  css`
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: ${width}px;
    padding-bottom: 0;
  `}

  ${direction === "x" &&
  css`
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: ${width}px;
    padding-right: 0;
  `}

  ${direction === "both" &&
  css`
    overflow: auto;
    padding-bottom: ${width}px;
    padding-right: 0;
  `}

  &::-webkit-scrollbar {
    width: ${width}px;
    height: ${width}px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-disabled);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray);
    border-radius: ${width / 2}px;
  }
`;



// mixins.scss > ellipsis
export const ellipsis = (
  lineClamp: number = 1,
  lineHeight: number = 1.5
) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lineClamp};
  line-height: ${lineHeight};
  text-overflow: ellipsis;
  max-height: ${lineClamp * lineHeight}em;
`;