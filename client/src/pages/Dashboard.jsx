import { useState } from 'react';
import { Calendar, Users, Plus } from 'lucide-react';
import styled from 'styled-components';

const Header = styled.header`
  border-bottom: 1px solid ${props => props.theme.colors.background};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ProfileImage = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatsCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

const StatsLabel = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
`;

const StatsValue = styled.p`
  font-size: 1.875rem;
  font-weight: 600;
  margin-top: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'secondary' 
    ? props.theme.colors.background 
    : props.theme.colors.primary};
  color: ${props => props.variant === 'secondary' 
    ? props.theme.colors.text 
    : 'white'};
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Dashboard = () => {
    const [userData] = useState({
        name: 'João Silva',
        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
    });

    const [stats] = useState({
        totalClients: 120,
        upcomingAppointments: 5
    });

    return (
        <AppWrapper>
            <Header>
                <HeaderContent>
                    <Logo>
                        <LogoIcon />
                        <span>ConnectPro</span>
                    </Logo>
                    <ProfileImage
                        src={userData.avatar}
                        alt="Profile"
                    />
                </HeaderContent>
            </Header>

            <MainContent>
                <Title>Dashboard</Title>

                <StatsGrid>
                    <StatsCard>
                        <StatsLabel>Total Clients</StatsLabel>
                        <StatsValue>{stats.totalClients}</StatsValue>
                    </StatsCard>

                    <StatsCard>
                        <StatsLabel>Upcoming Appointments</StatsLabel>
                        <StatsValue>{stats.upcomingAppointments}</StatsValue>
                    </StatsCard>
                </StatsGrid>

                <ActionButtons>
                    <Button>
                        <Users size={16} />
                        Add Client
                    </Button>
                    <Button variant="secondary">
                        <Calendar size={16} />
                        Add Appointment
                    </Button>
                </ActionButtons>
            </MainContent>
        </AppWrapper>
    );
};

export default Dashboard;
