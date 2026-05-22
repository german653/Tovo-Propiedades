"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'alert' | 'confirm';
  styleType?: 'success' | 'error' | 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface NotificationContextType {
  showToast: (message: string, type?: ToastType) => void;
  showAlert: (
    message: string, 
    title?: string, 
    onClose?: () => void,
    styleType?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
  showConfirm: (message: string, onConfirm: () => void, title?: string, onCancel?: () => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [modal, setModal] = useState<ModalConfig>({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert',
  });

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showAlert = (
    message: string, 
    title: string = 'Aviso', 
    onClose?: () => void,
    styleType?: 'success' | 'error' | 'warning' | 'info'
  ) => {
    // Intelligent auto-detection of theme color based on title keywords
    let detectedStyle = styleType;
    if (!detectedStyle) {
      const lowerTitle = title.toLowerCase();
      if (
        lowerTitle.includes('correcto') || 
        lowerTitle.includes('éxito') || 
        lowerTitle.includes('exito') || 
        lowerTitle.includes('creada') || 
        lowerTitle.includes('creado') || 
        lowerTitle.includes('actualizada') || 
        lowerTitle.includes('actualizado') ||
        lowerTitle.includes('guardado')
      ) {
        detectedStyle = 'success';
      } else if (
        lowerTitle.includes('error') || 
        lowerTitle.includes('falló') || 
        lowerTitle.includes('fallo') || 
        lowerTitle.includes('incorrecto') ||
        lowerTitle.includes('requerida')
      ) {
        detectedStyle = 'error';
      } else {
        detectedStyle = 'info';
      }
    }

    setModal({
      isOpen: true,
      title,
      message,
      type: 'alert',
      styleType: detectedStyle,
      onConfirm: () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        if (onClose) onClose();
      }
    });
  };

  const showConfirm = (
    message: string, 
    onConfirm: () => void, 
    title: string = 'Confirmar Acción', 
    onCancel?: () => void
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      styleType: 'warning',
      onConfirm: () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        onConfirm();
      },
      onCancel: () => {
        setModal(prev => ({ ...prev, isOpen: false }));
        if (onCancel) onCancel();
      }
    });
  };

  // Define theme colors for the popup modal
  const resolvedStyle = modal.styleType || (modal.type === 'confirm' ? 'warning' : 'info');

  const themeClasses = {
    success: {
      accentBar: 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/30 border-emerald-500/20',
      btnColor: 'bg-emerald-500 hover:bg-emerald-600 text-black shadow-emerald-500/10 focus:ring-emerald-500/20',
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    error: {
      accentBar: 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-950/30 border-rose-500/20',
      btnColor: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/10 focus:ring-rose-500/20',
      icon: <AlertOctagon className="w-6 h-6" />,
    },
    warning: {
      accentBar: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-950/30 border-amber-500/20',
      btnColor: 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/10 focus:ring-amber-500/20',
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    info: {
      accentBar: 'bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600',
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-950/30 border-sky-500/20',
      btnColor: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/10 focus:ring-blue-500/20',
      icon: <Info className="w-6 h-6" />,
    },
  };

  const currentTheme = themeClasses[resolvedStyle] || themeClasses.info;

  return (
    <NotificationContext.Provider value={{ showToast, showAlert, showConfirm }}>
      {children}

      {/* TOASTS CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>

      {/* CUSTOM MODAL ALERT/CONFIRM */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-md bg-[#0f0f11] border border-white/10 rounded-lg p-6 shadow-2xl shadow-black/80 animate-scale-up text-brand-cream relative overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Elegant Accent Gold/Color Bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${currentTheme.accentBar}`} />
            
            <div className="flex items-start gap-4 mt-2">
              <div className={`p-2 rounded-full border shrink-0 ${currentTheme.iconBg} ${currentTheme.iconColor}`}>
                {currentTheme.icon}
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold font-display tracking-wide text-white">
                  {modal.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                  {modal.message}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              {modal.type === 'confirm' && (
                <button
                  onClick={modal.onCancel}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 border border-white/5 rounded transition-all duration-200"
                >
                  Cancelar
                </button>
              )}
              <button
                onClick={modal.onConfirm}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded shadow-lg transition-all duration-200 outline-none focus:ring ${currentTheme.btnColor}`}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-950/20',
    error: 'border-rose-500/30 bg-rose-950/20',
    info: 'border-amber-500/30 bg-amber-950/20',
  };

  return (
    <div 
      className={`pointer-events-auto flex items-center justify-between gap-4 p-4 border rounded shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-in-right ${borderColors[toast.type]}`}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <span className="text-white/90 text-sm font-medium leading-normal">{toast.message}</span>
      </div>
      <button 
        onClick={onClose}
        className="text-white/40 hover:text-white transition-colors duration-150 p-1 hover:bg-white/5 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
