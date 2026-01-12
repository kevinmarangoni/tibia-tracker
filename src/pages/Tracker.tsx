import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { GuildSelect } from '../components/GuildSelect';
import { GuildMembersTable } from '../components/GuildMembersTable';
import { TibiaApiService } from '../services/tibiaApi';
import type { Guild, GuildDetails } from '../types/tibia';

export const Tracker: React.FC = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<string>('');
  const [guildDetails, setGuildDetails] = useState<GuildDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMembers, setLoadingMembers] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [membersError, setMembersError] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    loadGuilds();
  }, []);

  // Auto-refresh dos membros a cada 30 segundos
  useEffect(() => {
    if (!selectedGuild || !autoRefresh) {
      return;
    }

    const interval = setInterval(() => {
      loadGuildDetails(selectedGuild);
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [selectedGuild, autoRefresh]);

  const loadGuilds = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await TibiaApiService.getGuilds('Inabra');
      setGuilds(response.guilds.active);
    } catch (err) {
      console.error('Erro ao carregar guilds:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleGuildChange = async (guildName: string) => {
    setSelectedGuild(guildName);
    setGuildDetails(null);
    setMembersError('');
    
    if (guildName) {
      await loadGuildDetails(guildName);
    }
  };

  const loadGuildDetails = async (guildName: string) => {
    try {
      setLoadingMembers(true);
      setMembersError('');
      const response = await TibiaApiService.getGuildDetails(guildName);
      setGuildDetails(response.guild);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Erro ao carregar detalhes da guild:', err);
      setMembersError(err instanceof Error ? err.message : 'Erro ao carregar membros da guild');
    } finally {
      setLoadingMembers(false);
    }
  };


  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        p: 3, 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}>
        <Typography variant="h4" component="h1" align="center" sx={{ 
          mb: 1,
          background: 'linear-gradient(45deg, #1976d2, #dc004e)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🏰 Tibia Watcher
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Rastreie jogadores online do servidor Inabra
        </Typography>

        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <GuildSelect
            guilds={guilds}
            selectedGuild={selectedGuild}
            onGuildChange={handleGuildChange}
            loading={loading}
            error={error}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>

        {selectedGuild && (
          <Box sx={{ 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            p: 3,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Guild Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              mb: 2,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {selectedGuild}
                </Typography>
                {guildDetails && (
                  <Typography variant="body1" color="text.secondary">
                    {guildDetails.description}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                flexWrap: 'wrap',
                minWidth: 'fit-content'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Auto-refresh (30s)"
                />
                
                {lastUpdate && (
                  <Typography variant="caption" color="text.secondary">
                    Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
                  </Typography>
                )}
                
                {loadingMembers && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="caption" color="text.secondary">
                      Atualizando...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {membersError && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {membersError}
                <br />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Algumas guilds podem não ter dados de membros disponíveis na API.
                  Tente selecionar outra guild da lista.
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {/* Tabela de Membros */}
        {selectedGuild && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <GuildMembersTable 
              guildDetails={guildDetails} 
              loading={loadingMembers}
            />
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ 
          mt: 'auto',
          pt: 3,
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body2" color="text.secondary">
            Total de guilds ativas: {guilds.length} • Servidor: Inabra
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};
