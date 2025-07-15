import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

const WelcomeText = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.background};
  border-radius: 0.375rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SignupText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
`;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login');
            }

            // Salvar o token no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirecionar para o dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <FormContainer>
                <LogoContainer>
                    <Logo>
                        <LogoIcon />
                        <Title>ConnectPro</Title>
                    </Logo>
                    <WelcomeText>Welcome back</WelcomeText>
                </LogoContainer>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormGroup>

                    <StyledLink to="/forgot-password">
                        Forgot password?
                    </StyledLink>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Entrando...' : 'Login'}
                    </Button>

                    <SignupText>
                        Don't have an account?{' '}
                        <StyledLink to="/signup">
                            Sign up
                        </StyledLink>
                    </SignupText>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default Login;
