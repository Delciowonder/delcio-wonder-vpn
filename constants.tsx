
import React from 'react';
import { Server } from './types';

export const INTERNAL_SNIS: Record<string, string[]> = {
  'UNITEL': ['m.unitel.ao', 'internet.unitel.ao', 'web.unitel.ao'],
  'AFRICELL': ['m.africell.ao', 'free.africell.ao', 'zero.africell.ao'],
  'MOVICEL': ['m.movicel.ao', 'internet.movicel.ao'],
  'GLOBAL': ['google.com', 'cloudflare.com']
};

export const SERVERS: Server[] = [
  { id: 'unitel-01', name: 'UNITEL VIP AO-1', country: 'Angola', flag: '🇦🇴', latency: 5, ip: '197.231.0.10', port: 443 },
  { id: 'africell-01', name: 'AFRICELL TURBO-1', country: 'Angola', flag: '🇦🇴', latency: 12, ip: '105.172.0.20', port: 8080 },
  { id: 'movicel-01', name: 'MOVICEL CORE-1', country: 'Angola', flag: '🇦🇴', latency: 22, ip: '196.223.24.5', port: 80 },
  { id: 'premium-de', name: 'ALEMANHA PRO', country: 'Germany', flag: '🇩🇪', latency: 45, ip: '18.192.0.1', port: 1194 },
];

export const APP_NAME = "DÉLCIO WONDER";

export const SOCIALS = {
  whatsapp: "https://wa.me/244935264758",
  facebook: "https://facebook.com/delcioderio4",
  // Número oculto conforme solicitado
  phoneDisplay: "+244 935 ••• •••",
  phoneRaw: "+244 935 264 758",
  supportMessage: "PRECISO DA TUA AJUDA COM O VPN"
};

export const VPN_LOGO = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="95" stroke="url(#mainGrad)" strokeWidth="1" strokeDasharray="5 5" />
    <path d="M100 20 L170 160 L100 130 L30 160 Z" fill="url(#mainGrad)" />
    <path d="M100 40 L150 145 L100 120 L50 145 Z" fill="white" fillOpacity="0.2" />
    <rect x="85" y="85" width="30" height="6" rx="3" fill="white" />
  </svg>
);

// LOGOTIPOS ORIGINAIS DE ANGOLA (Fidelidade Máxima)
export const OPERATORS: Record<string, { color: string, id: string, logo: React.ReactNode }> = {
  'UNITEL': { 
    color: '#E60000', 
    id: 'UNITEL', 
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#E60000" />
        <path d="M30,35 V55 C30,66 38,72 50,72 C62,72 70,66 70,55 V35 H58 V55 C58,60 55,62 50,62 C45,62 42,60 42,55 V35 H30 Z" fill="#FFFFFF" />
      </svg>
    ) 
  },
  'AFRICELL': { 
    color: '#6A0DAD', 
    id: 'AFRICELL', 
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect width="100" height="100" rx="20" fill="#6A0DAD" />
        <path d="M50,15 L15,82 H85 L50,15 Z" fill="#FFFFFF" />
        <path d="M50,32 L28,73 H72 L50,32 Z" fill="#6A0DAD" />
        <rect x="46" y="65" width="8" height="18" fill="#FFFFFF" />
      </svg>
    ) 
  },
  'MOVICEL': { 
    color: '#0055AA', 
    id: 'MOVICEL', 
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M15,40 C40,15 60,15 85,40" stroke="#FF0000" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M15,60 C40,85 60,85 85,60" stroke="#0055AA" strokeWidth="12" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="50" r="12" fill="#FF0000" />
        <path d="M42,50 L58,50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ) 
  },
  'GLOBAL': { 
    color: '#334155', 
    id: 'GLOBAL', 
    logo: (
      <svg viewBox="0 0 100 100" className="w-full h-full p-2 stroke-white fill-none" strokeWidth="8">
        <circle cx="50" cy="50" r="40" />
        <path d="M10,50 L90,50 M50,10 L50,90" />
      </svg>
    ) 
  }
};

export const THEMES = [
  { id: 'deep-sea', name: 'Deep Sea', class: 'theme-deep-sea' },
  { id: 'oled', name: 'Midnight OLED', class: 'theme-oled' },
  { id: 'light', name: 'Modern Light', class: 'theme-light' }
];

export const ICONS = {
  Vpn: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Logs: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Ai: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21" />
    </svg>
  ),
};
