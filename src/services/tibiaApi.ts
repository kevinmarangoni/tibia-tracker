import axios from 'axios';
import type { TibiaApiResponse, GuildDetailsResponse } from '../types/tibia';

const API_BASE_URL = 'https://api.tibiadata.com/v4';

export class TibiaApiService {
  static async getGuilds(world: string = 'Ferobra'): Promise<TibiaApiResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/guilds/${world}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar guilds:', error);
      throw new Error('Falha ao carregar dados das guilds');
    }
  }

  static async getGuildDetails(guildName: string): Promise<GuildDetailsResponse> {
    try {
      // Encode o nome da guild para URL - a API não precisa do mundo no final
      const encodedGuildName = encodeURIComponent(guildName);
      const url = `${API_BASE_URL}/guild/${encodedGuildName}`;
      
      const response = await axios.get(url);
      
      if (response.data.information?.status?.http_code === 404) {
        throw new Error(`Guild "${guildName}" não encontrada ou sem dados disponíveis`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da guild:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Guild "${guildName}" não encontrada ou sem dados disponíveis`);
        }
        throw new Error(`Erro da API: ${error.response?.status} - ${error.response?.statusText}`);
      }
      
      throw new Error('Falha ao carregar detalhes da guild');
    }
  }
}
