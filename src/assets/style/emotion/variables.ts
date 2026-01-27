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
  white:'#fcfcfc',
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

export const colorsText = {
  titleB:'#353844',
  textB:'#42464d',
  descB:'#495057',
  subTextB:'#8d9095',
  titleW:'#f1f3f5',
  textW:'#e9ecef',
  descW:'#dee2e6',
  subTextW:'#adb5bd',
}

export const styleGlass = {
  borderW: 'linear-gradient(135deg,rgba(137,138,141,0.9) 0%,rgba(137,138,141,0.4) 15%,rgba(255,255,255, 0.15) 30%,rgba(255,255,255, 0.02) 85%,rgba(137,138,141,0.9) 100%',
  borderB:'linear-gradient(315deg,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.4) 15%,rgba(53,56,68,0.15) 30%,rgba(53,56,68,0.02) 85%,rgba(255,255,255,0.9) 100%'
}

export const styleShadow = {
  w: '0 4px 20px rgba(255, 255, 255, 0.2)',
  b: '0 2px 8px rgba(0, 0, 0, 0.15)',
}

export const timing = {
  out :'cubic-bezier(.16, 1, .3, 1)',
}