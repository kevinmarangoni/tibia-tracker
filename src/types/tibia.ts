export interface Guild {
  name: string;
  logo_url: string;
  description: string;
}

export interface GuildsData {
  world: string;
  active: Guild[];
  formation: Guild[];
}

export interface GuildMember {
  name: string;
  title: string;
  rank: string;
  vocation: string;
  level: number;
  joined: string;
  status: 'online' | 'offline';
}

export interface GuildDetails {
  name: string;
  world: string;
  logo_url: string;
  description: string;
  guildhalls: any;
  active: boolean;
  founded: string;
  open_applications: boolean;
  homepage: string;
  in_war: boolean;
  disband_date: string;
  disband_condition: string;
  players_online: number;
  players_offline: number;
  members_total: number;
  members_invited: number;
  members: GuildMember[];
  invites: any;
}

export interface TibiaApiResponse {
  guilds: GuildsData;
  information: {
    api: {
      version: number;
      release: string;
      commit: string;
    };
    timestamp: string;
    tibia_urls: string[];
    status: {
      http_code: number;
    };
  };
}

export interface GuildDetailsResponse {
  guild: GuildDetails;
  information: {
    api: {
      version: number;
      release: string;
      commit: string;
    };
    timestamp: string;
    tibia_urls: string[];
    status: {
      http_code: number;
    };
  };
}
