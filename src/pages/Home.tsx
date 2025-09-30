import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Home: React.FC = () => {
  useEffect(() => {
    // Redireciona para a página de tracking após 2 segundos
    const timer = setTimeout(() => {
      window.location.href = '/tracker';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        gap: 3
      }}
    >
      <Typography variant="h2" sx={{ 
        background: 'linear-gradient(45deg, #1976d2, #dc004e)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        mb: 2
      }}>
        🏰 Tibia Watcher
      </Typography>
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Redirecionando para o Tibia Watcher...
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aguarde um momento...
      </Typography>
    </Box>
  );
};
