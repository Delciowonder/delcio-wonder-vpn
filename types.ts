
export interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  ip: string;
  port: number;
}

export interface NetworkStats {
  download: number;
  upload: number;
  ping: number;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface LogEntry {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  AUTHENTICATING = 'AUTHENTICATING',
}
