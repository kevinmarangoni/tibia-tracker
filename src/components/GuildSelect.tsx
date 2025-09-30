import React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import type { Guild } from '../types/tibia';

interface GuildSelectProps {
  guilds: Guild[];
  selectedGuild: string;
  onGuildChange: (guildName: string) => void;
  loading?: boolean;
  error?: string;
}

export const GuildSelect: React.FC<GuildSelectProps> = ({
  guilds,
  selectedGuild,
  onGuildChange,
  loading = false,
  error
}) => {
  const handleChange = (_event: any, newValue: Guild | null) => {
    onGuildChange(newValue?.name || '');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const selectedGuildObj = guilds.find(guild => guild.name === selectedGuild) || null;

  return (
    <Autocomplete
      options={guilds}
      value={selectedGuildObj}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecionar Guild"
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1976d2',
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Box component="span" sx={{ fontWeight: 'medium' }}>
              {option.name}
            </Box>
            {option.description && (
              <Box component="div" sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>
                {option.description.length > 80 
                  ? `${option.description.substring(0, 80)}...` 
                  : option.description}
              </Box>
            )}
          </Box>
        </Box>
      )}
      sx={{
        '& .MuiAutocomplete-paper': {
          backgroundColor: '#1e1e1e',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
      disabled={guilds.length === 0}
    />
  );
};
