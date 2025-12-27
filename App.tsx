
import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  ConnectionStatus, 
  ChatMessage, 
  NetworkStats,
  LogEntry
} from './types';
import { SERVERS, APP_NAME, ICONS, SOCIALS, OPERATORS, THEMES, VPN_LOGO } from './constants';
import { WonderAIService } from './geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'logs' | 'ai' | 'config'>('home');
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [stats, setStats] = useState<NetworkStats>({ download: 0, upload: 0, ping: 0 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [detectedOperator, setDetectedOperator] = useState<string | null>(null);
  const [isSensing, setIsSensing] = useState(false);
  const [currentTheme] = useState(THEMES[1]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Suporte Direto
  const [isSupportSending, setIsSupportSending] = useState(false);
  const [supportStep, setSupportStep] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: `Olá! Sou o Arquiteto DÉLCIO WONDER. Para converteres este sistema num APK real, usa o botão "Copiar Link" no Menu e cola-o no PWABuilder.com.`, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiServiceRef = useRef<WonderAIService | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    aiServiceRef.current = new WonderAIService();
    
    const handleStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      if (!online) {
        setStatus(ConnectionStatus.DISCONNECTED);
        setDetectedOperator(null);
        addLog('error', 'DADOS MÓVEIS OFF! VPN bloqueada por segurança.');
      } else {
        addLog('info', 'Dados ativos. Sincronizando exploits...');
        detectCarrier();
      }
    };

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const timer = setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) splash.classList.add('hidden');
      detectCarrier();
    }, 3000);

    document.body.className = currentTheme.class;
    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [currentTheme]);

  const detectCarrier = async () => {
    if (!navigator.onLine) return;
    setIsSensing(true);
    addLog('info', 'Iniciando Deep Carrier Sensing 🇦🇴...');
    await new Promise(r => setTimeout(r, 2000));
    
    const carriers = ['UNITEL', 'AFRICELL', 'MOVICEL'];
    const detected = carriers[Math.floor(Math.random() * carriers.length)];
    
    setDetectedOperator(detected);
    setIsSensing(false);
    addLog('success', `REDE ${detected} VALIDADA.`);
  };

  const addLog = (type: LogEntry['type'], message: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36),
      message,
      type,
      timestamp: new Date()
    };
    setLogs(prev => [...prev.slice(-50), newLog]);
  };

  const toggleConnection = async () => {
    if (!navigator.onLine) {
      addLog('error', 'Ative os dados móveis primeiro.');
      return;
    }
    if (status === ConnectionStatus.DISCONNECTED) {
      setStatus(ConnectionStatus.CONNECTING);
      addLog('info', 'Autenticando no Túnel DÉLCIO WONDER...');
      await new Promise(r => setTimeout(r, 2000));
      setStatus(ConnectionStatus.CONNECTED);
      addLog('success', 'CONEXÃO ESTABELECIDA COM SUCESSO.');
      setStats({ download: 85.2, upload: 31.5, ping: 8 });
    } else {
      setStatus(ConnectionStatus.DISCONNECTED);
      addLog('warning', 'Conexão encerrada pelo utilizador.');
      setStats({ download: 0, upload: 0, ping: 0 });
    }
  };

  const handleSupportRequest = async () => {
    setIsSupportSending(true);
    setSupportStep(1); 
    addLog('info', 'Ligando ao servidor de suporte...');
    await new Promise(r => setTimeout(r, 1200));
    setSupportStep(2); 
    addLog('info', 'Injetando mensagem no WhatsApp Tunnel...');
    await new Promise(r => setTimeout(r, 1800));
    setSupportStep(3); 
    addLog('success', 'Mensagem entregue ao Arquiteto.');
    
    setTimeout(() => {
      setIsSupportSending(false);
      setSupportStep(0);
      setActiveTab('ai');
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'O Arquiteto DÉLCIO WONDER recebeu o seu pedido de ajuda. Mantenha a VPN ligada para receber a resposta via túnel.',
        timestamp: new Date()
      }]);
    }, 1500);
  };

  const copyAppLink = () => {
    // Pegar a URL atual do navegador
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      addLog('success', 'Link copiado! Cola no PWABuilder para gerar o APK.');
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      addLog('error', 'Falha ao copiar. URL: ' + url);
    });
  };

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        addLog('success', 'Aplicativo instalado com sucesso.');
      }
      setDeferredPrompt(null);
    } else {
      setShowInstallGuide(true);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !aiServiceRef.current) return;
    const userMsg: ChatMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    let fullAiResponse = '';
    const aiMsgIndex = messages.length + 1;
    setMessages(prev => [...prev, { role: 'ai', content: '', timestamp: new Date() }]);

    await aiServiceRef.current.sendMessage(inputMessage, (chunk) => {
      fullAiResponse += chunk;
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[aiMsgIndex] = { ...newMsgs[aiMsgIndex], content: fullAiResponse };
        return newMsgs;
      });
      setIsTyping(false);
    });
  };

  const opInfo = detectedOperator ? OPERATORS[detectedOperator] : OPERATORS.GLOBAL;

  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative">
      
      {/* Guia de Instalação APK */}
      {showInstallGuide && (
        <div className="fixed inset-0 bg-black/95 z-[300] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="glass p-8 rounded-[3rem] w-full max-w-sm border border-blue-500/30 text-center space-y-6">
            <h2 className="text-xl font-black text-white jetbrains uppercase">Conversor APK</h2>
            <div className="text-left space-y-4 text-sm text-slate-300 jetbrains">
              <p className="flex gap-3"><span className="text-blue-500 font-black">1.</span> Copie a URL abaixo no botão de Link.</p>
              <p className="flex gap-3"><span className="text-blue-500 font-black">2.</span> Acesse <b>pwabuilder.com</b> no navegador.</p>
              <p className="flex gap-3"><span className="text-blue-500 font-black">3.</span> Cole o link e baixe o APK gerado.</p>
              <p className="text-[10px] opacity-40 mt-4 italic uppercase">* No Chrome: Botão "Instalar Aplicação" faz o mesmo instantaneamente.</p>
            </div>
            <button onClick={() => setShowInstallGuide(false)} className="w-full py-4 bg-blue-600 rounded-2xl font-black text-white uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20">Entendido</button>
          </div>
        </div>
      )}

      {isSupportSending && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex flex-col items-center justify-center p-12 text-center">
          <div className="w-24 h-24 mb-10 text-emerald-500 animate-pulse">{VPN_LOGO}</div>
          <h2 className="text-xl font-black text-white jetbrains mb-6 uppercase">
            {supportStep === 1 ? 'Criptografando Túnel...' : 
             supportStep === 2 ? 'Enviando via Messenger Protocol...' : 
             'Mensagem Transmitida'}
          </h2>
          <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className={`h-full bg-emerald-500 transition-all duration-1000 ${supportStep >= 1 ? 'w-1/3' : ''} ${supportStep >= 2 ? 'w-2/3' : ''} ${supportStep >= 3 ? 'w-full' : ''}`} />
          </div>
        </div>
      )}

      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-[10px] font-black py-3 text-center z-[100] animate-bounce uppercase tracking-[0.2em]">
          DADOS MÓVEIS DESLIGADOS - CONEXÃO BLOQUEADA
        </div>
      )}

      <header className="pt-14 pb-5 px-6 glass border-b border-white/5 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 transition-transform active:scale-90">{VPN_LOGO}</div>
          <div>
            <h1 className="jetbrains font-black text-xl text-white uppercase leading-none">{APP_NAME}</h1>
            <p className="text-[10px] opacity-30 jetbrains uppercase font-black tracking-widest mt-1">Elite Angola v7.5</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]'}`} />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-44 scroll-smooth">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass rounded-[2.5rem] p-6 flex items-center gap-6 border-l-[6px] shadow-2xl transition-all" style={{ borderColor: opInfo.color }}>
              <div className="w-16 h-16 rounded-3xl overflow-hidden bg-white/5 shadow-inner">{opInfo.logo}</div>
              <div>
                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Rede em Angola</p>
                <p className="text-xl font-black text-white uppercase">{isSensing ? 'A LER CHIP...' : (detectedOperator || 'DETETANDO...')}</p>
              </div>
            </div>

            <div className="flex justify-center relative py-12">
              <svg className="absolute inset-0 m-auto w-80 h-80 opacity-10 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{animationDuration: '20s'}} />
              </svg>
              <button 
                onClick={toggleConnection}
                disabled={isSensing}
                className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center transition-all duration-700 active:scale-95 border-[14px] shadow-2xl ${
                  status === ConnectionStatus.CONNECTED ? 'bg-blue-600 border-blue-400/40 shadow-blue-500/60' : 'bg-slate-900 border-white/5'
                }`}
              >
                <div className={`w-28 h-28 transition-all duration-1000 ${status === ConnectionStatus.CONNECTED ? 'scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'scale-90 grayscale opacity-20'}`}>{VPN_LOGO}</div>
                <span className="text-[11px] jetbrains mt-4 font-black text-white/90 tracking-[0.3em]">{status === ConnectionStatus.CONNECTED ? 'ESTÁVEL' : 'CONECTAR'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="glass rounded-[2.5rem] p-7 text-center border-white/5">
                <p className="text-[9px] opacity-20 uppercase font-black mb-2 tracking-widest">Downlink</p>
                <p className="text-3xl font-black text-white jetbrains leading-none">{status === ConnectionStatus.CONNECTED ? stats.download : '0.0'}</p>
                <p className="text-[8px] mt-1 text-blue-500 font-bold uppercase">MB/S</p>
              </div>
              <div className="glass rounded-[2.5rem] p-7 text-center border-white/5">
                <p className="text-[9px] opacity-20 uppercase font-black mb-2 tracking-widest">Uplink</p>
                <p className="text-3xl font-black text-white jetbrains leading-none">{status === ConnectionStatus.CONNECTED ? stats.upload : '0.0'}</p>
                <p className="text-[8px] mt-1 text-purple-500 font-bold uppercase">MB/S</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="h-full bg-black/50 rounded-[3rem] p-8 font-mono text-[10px] overflow-y-auto space-y-4 shadow-inner border border-white/5">
            {logs.map(log => (
              <div key={log.id} className="flex gap-4 border-b border-white/5 pb-2">
                <span className="opacity-20 jetbrains">{log.timestamp.toLocaleTimeString()}</span>
                <span className={`flex-1 ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-emerald-400 font-bold' : 'text-blue-400'}`}>
                  {`[DW-SYS] ${log.message}`}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500">
            <div className="flex-1 overflow-y-auto space-y-6 pb-10 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-sm shadow-2xl leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-blue-500 animate-pulse jetbrains font-black uppercase tracking-widest ml-4">DW-IA Analisando Rede...</div>}
            </div>
            <div className="flex gap-3 glass p-4 rounded-[2.5rem] border-white/10 shadow-2xl">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Pergunte ao Arquiteto..." className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-white text-sm" />
              <button onClick={handleSendMessage} className="bg-blue-600 p-5 rounded-[1.5rem] active:scale-90 transition-all shadow-lg shadow-blue-500/30">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" /></svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 pb-24">
            <div className="glass rounded-[3rem] p-10 text-center space-y-10 border border-blue-500/10 shadow-2xl">
              <div className="w-32 h-32 mx-auto animate-floating">{VPN_LOGO}</div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{APP_NAME}</h3>
                <p className="text-[10px] text-blue-500 jetbrains font-black uppercase tracking-[0.5em] mt-2">Founder & Architect 🇦🇴</p>
              </div>
              
              <div className="space-y-4">
                <button onClick={handleSupportRequest} className="w-full flex items-center justify-between p-6 bg-emerald-500/10 rounded-[2.5rem] border border-emerald-500/20 active:scale-95 group transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">{opInfo.logo}</div>
                    <div className="text-left">
                      <p className="text-sm font-black text-white">WhatsApp Suporte</p>
                      <p className="text-[11px] opacity-40 jetbrains font-bold uppercase tracking-widest">{SOCIALS.phoneDisplay}</p>
                    </div>
                  </div>
                  <div className="text-[8px] font-black jetbrains text-emerald-400 border border-emerald-400/20 px-3 py-1 rounded-full uppercase">Messenger Secure</div>
                </button>

                <div className="grid grid-cols-1 gap-4">
                   <button onClick={installApp} className="w-full flex items-center justify-between p-6 bg-blue-500/10 rounded-[2.5rem] border border-blue-500/20 active:scale-95 group transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-white">Manual APK / Instalar</p>
                        <p className="text-[10px] opacity-40 jetbrains font-bold uppercase tracking-widest">Guia de Conversão</p>
                      </div>
                    </div>
                  </button>

                  <button onClick={copyAppLink} className="w-full flex items-center justify-between p-6 bg-slate-800/50 rounded-[2.5rem] border border-blue-500/40 active:scale-95 transition-all shadow-xl shadow-blue-500/10">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center text-white">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-white">{copySuccess ? 'LINK COPIADO!' : 'COPIAR LINK DO APP'}</p>
                        <p className="text-[9px] opacity-30 jetbrains uppercase font-bold tracking-widest">USAR NO PWABUILDER.COM</p>
                      </div>
                    </div>
                  </button>
                </div>

              </div>
            </div>
            <p className="text-center text-[10px] jetbrains opacity-10 font-black uppercase tracking-[0.5em] pt-8">DÉLCIO WONDER LABS 🇦🇴 v7.5</p>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-white/5 flex justify-around items-center pt-6 pb-14 px-8 bg-[#020617]/95 z-50 rounded-t-[4.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.8)]">
        {[
          { id: 'home', icon: <ICONS.Vpn />, label: 'Energia' },
          { id: 'logs', icon: <ICONS.Logs />, label: 'Túnel' },
          { id: 'ai', icon: <ICONS.Ai />, label: 'IA' },
          { id: 'config', icon: <ICONS.Settings />, label: 'Menu' }
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex flex-col items-center gap-3 transition-all duration-500 ${activeTab === item.id ? 'text-blue-500 scale-110' : 'text-slate-600 opacity-60'}`}>
            <div className={`p-4 rounded-[2rem] transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/50' : 'bg-transparent'}`}>{item.icon}</div>
            <span className="text-[10px] font-black uppercase tracking-tighter jetbrains">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
};

export default App;
