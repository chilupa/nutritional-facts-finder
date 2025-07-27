import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10b981', // Green theme for nutrition app
    },
    secondary: {
      main: '#059669',
    },
    background: {
      default: 'transparent',
    },
  },
  // Custom gradients
  gradients: {
    primary: 'linear-gradient(45deg, #10b981 30%, #059669 90%)',
    primaryHover: 'linear-gradient(45deg, #059669 30%, #047857 90%)',
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #fef7ff 0%, #f0f9ff 50%, #f0fff4 100%)',
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)
          `,
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
})

// Add gradients to theme
theme.gradients = {
  primary: 'linear-gradient(45deg, #10b981 30%, #059669 90%)',
  primaryHover: 'linear-gradient(45deg, #059669 30%, #047857 90%)',
}