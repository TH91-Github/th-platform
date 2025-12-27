// 🔹emotion 전용 style

export const bp = { // breakpoints
  maxPc: 1920,
  pc : 1440,
  tablet : 1140,
  mob : 768,
  smallMob: 450,
}

export const media = {
  // ~ 1920
  maxPc:`@media screen and (max-width:${bp.maxPc}px)`,
  // 1440 ~
  largePc:`@media screen and (min-width:${bp.pc}px)`,
  // 1140 ~ 
  pc: `@media screen and (min-width:${bp.tablet}px)`,
  // 1140 ~ 1439
  smailPc : `@media screen and (min-width:${bp.tablet}px) and (max-width:${bp.pc-1}px)`,
  // 768 ~
  tabletPc: `@media screen and (min-width:${bp.mob}px)`,
  // 768 ~ 1139
  tablet: `@media screen and (min-width:${bp.mob}px) and (max-width:${bp.tablet-1}px)`,
  // ~ 1139
  tabletMob: `@media screen and (max-width:${bp.tablet-1}px)`,
  // ~ 767
  mob: `@media screen and (max-width:${bp.mob-1}px)`,
  // ~ 450
  smallMob: `@media screen and (max-width:${bp.smallMob-1}px)`
}

export const colors = {
  black:'#050b21',
  white:'#f5f5ff',
  gray:'#898a8d',
  red:'#e8392c',
  green:'#0C9463',
  yellow:'#ffb000', 
  yellowBg:'#f6f3ee',
  blue:'#395acc',
  blueBg:'#e3e4fc',
  navy:'#333A73',
  darkNavy:'#03053a',
  disabled:'#e7ebee',
  line:'#dbdbdb',
  lineBlack:'#40444b',
  darkBg:'#2a2d3e',
  darkBgOn:'#454864',
}

