import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
