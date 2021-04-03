const light_theme = {
  // Colors
  bgPrimary: '#e67e22',
  bgPrimaryDarken: '#d35400',

  btnPrimary: '#3498db',
  btnDanger: '#e74c3c',
  btnWarn: '#f1c40f',

  borderGray: '#bdc3c7',

  light: '#f0f6fb',
  dark: '#2c3e50'
}

const dark_theme = {
  // Colors
  bgPrimary: '#02040a',
  bgPrimaryDarken: '#161c23',

  btnPrimary: '#3498db',
  btnDanger: '#e74c3c',
  btnWarn: '#f1c40f',

  borderGray: '#bdc3c7',
  
  light: '#2c3e50',
  dark: '#f0f6fb'
}

export function getThemeColor(theme = 'light') {
  if(theme === 'light') return light_theme
  else return dark_theme
}