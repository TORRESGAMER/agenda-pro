import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const theme = {
  colors: {
    primary: '#007AFF',
    background: '#F5F5F5',
    text: '#333333',
    error: '#FF3B30',
    success: '#34C759',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
  },
  space: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  }
};

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
`;

function App() {
  // Mock do estado de autenticação (substitua por sua lógica real de autenticação)
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Router>
          <Routes>
            {/* Rota pública */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
            />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
