import Routes from 'routes';
import { AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return <ThemeProvider theme={theme}>
    <AppBar elevation={1} title="Code Challange"  >
      <Toolbar />
    </AppBar>
    <main style={{ marginTop: '92px' }}>
      <Routes />
    </main>
  </ThemeProvider >;
};

export default App;
