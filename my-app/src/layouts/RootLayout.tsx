import { FC } from 'react';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';

const RootLayout: FC = () => {
  return (
    <div className="wrapper">
      <main className="main">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default RootLayout;
