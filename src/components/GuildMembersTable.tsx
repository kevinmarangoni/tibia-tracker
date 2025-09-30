import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Link
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import type { GuildDetails } from '../types/tibia';

interface GuildMembersTableProps {
  guildDetails: GuildDetails | null;
  loading?: boolean;
}

const getVocationColor = (vocation: string): string => {
  const colors: { [key: string]: string } = {
    'Elite Knight': '#8B4513',
    'Knight': '#A0522D',
    'Master Sorcerer': '#9932CC',
    'Sorcerer': '#8B008B',
    'Elder Druid': '#228B22',
    'Druid': '#32CD32',
    'Royal Paladin': '#4169E1',
    'Paladin': '#1E90FF'
  };
  return colors[vocation] || '#666666';
};

const getStatusColor = (status: string): 'success' | 'default' => {
  return status === 'online' ? 'success' : 'default';
};

export const GuildMembersTable: React.FC<GuildMembersTableProps> = ({
  guildDetails,
  loading = false
}) => {
  const [copySuccess, setCopySuccess] = React.useState<string | null>(null);

  const handleCopyExiva = async (playerName: string) => {
    const exivaCommand = `exiva "${playerName}"`;
    
    try {
      await navigator.clipboard.writeText(exivaCommand);
      setCopySuccess(`Comando copiado: ${exivaCommand}`);
    } catch (err) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = exivaCommand;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(`Comando copiado: ${exivaCommand}`);
    }
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(null);
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Carregando membros...</Typography>
      </Box>
    );
  }

  if (!guildDetails || !guildDetails.members) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography color="text.secondary">
          Nenhuma informação de membros disponível
        </Typography>
      </Box>
    );
  }

  const onlineMembers = guildDetails.members.filter(member => member.status === 'online');
  const offlineMembers = guildDetails.members.filter(member => member.status === 'offline');

  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'background.paper',
      borderRadius: 2,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Estatísticas da Guild */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 2 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: 1,
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#4caf50' 
            }} />
            <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
              {guildDetails.players_online} Online
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            backgroundColor: 'rgba(158, 158, 158, 0.1)',
            borderRadius: 1,
            border: '1px solid rgba(158, 158, 158, 0.3)'
          }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#9e9e9e' 
            }} />
            <Typography variant="h6" sx={{ color: '#9e9e9e', fontWeight: 'bold' }}>
              {guildDetails.players_offline} Offline
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            borderRadius: 1,
            border: '1px solid rgba(25, 118, 210, 0.3)'
          }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#1976d2' 
            }} />
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              {guildDetails.members_total} Total
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: 1,
            border: '1px solid rgba(33, 150, 243, 0.3)'
          }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#2196f3' 
            }} />
            <Typography variant="body1" sx={{ color: '#2196f3' }}>
              Fundada: {new Date(guildDetails.founded).toLocaleDateString('pt-BR')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TableContainer 
        sx={{ 
          flex: 1,
          backgroundColor: 'transparent',
          overflow: 'auto'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Vocação</TableCell>
              <TableCell>Nível</TableCell>
              <TableCell>Entrada</TableCell>
              <TableCell>Exiva</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Membros Online primeiro */}
            {onlineMembers.map((member) => (
              <TableRow 
                key={member.name} 
                sx={{ 
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.2)' }
                }}
              >
                <TableCell>
                  <Chip 
                    label={member.status === 'online' ? '🟢 Online' : '🔴 Offline'} 
                    color={getStatusColor(member.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {member.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Link
                      href={`https://guildstats.eu/character?nick=${encodeURIComponent(member.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        fontWeight: 'medium',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      {member.name}
                    </Link>
                    {member.title && (
                      <Typography variant="caption" color="text.secondary">
                        ({member.title})
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={member.rank} 
                    size="small" 
                    variant="outlined"
                    color={member.rank.includes('Leader') ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getVocationColor(member.vocation),
                      fontWeight: 'medium'
                    }}
                  >
                    {member.vocation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {member.level}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(member.joined).toLocaleDateString('pt-BR')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title={`Copiar: exiva "${member.name}"`}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleCopyExiva(member.name)}
                      sx={{ color: 'primary.main' }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Membros Offline */}
            {offlineMembers.map((member) => (
              <TableRow key={member.name}>
                <TableCell>
                  <Chip 
                    label="🔴 Offline" 
                    color="default"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {member.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Link
                      href={`https://guildstats.eu/character?nick=${encodeURIComponent(member.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        fontWeight: 'medium',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: 'primary.dark'
                        }
                      }}
                    >
                      {member.name}
                    </Link>
                    {member.title && (
                      <Typography variant="caption" color="text.secondary">
                        ({member.title})
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={member.rank} 
                    size="small" 
                    variant="outlined"
                    color={member.rank.includes('Leader') ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getVocationColor(member.vocation),
                      fontWeight: 'medium'
                    }}
                  >
                    {member.vocation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {member.level}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(member.joined).toLocaleDateString('pt-BR')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title={`Copiar: exiva "${member.name}"`}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleCopyExiva(member.name)}
                      sx={{ color: 'primary.main' }}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar para mostrar confirmação de cópia */}
      <Snackbar
        open={!!copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {copySuccess}
        </Alert>
      </Snackbar>
    </Box>
  );
};
