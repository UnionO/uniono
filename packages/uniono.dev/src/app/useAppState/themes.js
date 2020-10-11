import { createMuiTheme } from '@material-ui/core/styles'

export const classic = () => createMuiTheme({
  palette: {
    background: { main: '#ffffff', contrastText: '#000000' }
  }
})
export const dark = () => createMuiTheme({
	palette: {
    type: 'dark',
    primary: { main: '#242526' },
    secondary: { main: '#3578e5' },
    background: { main: '#18191a', contrastText: '#ffffff' }
  }
})

export default {
  classic,
  dark
}