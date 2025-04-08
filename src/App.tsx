import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
