import React from 'react';
import QRCode from 'react-qr-code';
import { generatePixCode, formatCurrency } from '../services/pixQRCodeService';
import { useTranslation } from 'react-i18next';
import { Clipboard, AlertCircle } from 'lucide-react';

interface PixQRCodeProps {
  value: number;
  pixKey?: string;
  description?: string;
  onGenerated?: () => void;
}

// Definição dos tipos para o estado e ações do reducer
interface PixQRCodeState {
  isLoading: boolean;
  pixCode: string;
  copied: boolean;
  error: string | null;
}

type PixQRCodeAction = 
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: string }
  | { type: 'ERROR'; payload: string }
  | { type: 'COPY_SUCCESS' }
  | { type: 'COPY_RESET' };

const PixQRCode: React.FC<PixQRCodeProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  pixKey,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  description,
  onGenerated
}) => {
  // Valor fixo de R$59 em vez do valor recebido nas props
  const fixedValue = 59;

  // Usamos useReducer em vez de useState para gerenciar o estado do QR code
  const [state, dispatch] = React.useReducer(
    (state: PixQRCodeState, action: PixQRCodeAction): PixQRCodeState => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, isLoading: true, error: null };
        case 'SUCCESS':
          return { 
            isLoading: false, 
            pixCode: action.payload,
            copied: false,
            error: null 
          };
        case 'ERROR':
          return { ...state, isLoading: false, error: action.payload };
        case 'COPY_SUCCESS':
          return { ...state, copied: true };
        case 'COPY_RESET':
          return { ...state, copied: false };
        default:
          return state;
      }
    },
    { isLoading: true, pixCode: '', copied: false, error: null }
  );

  const { t } = useTranslation();
  const defaultPixKey = '5511985395297';

  // Função para buscar o código PIX de forma assíncrona
  const fetchPixCode = React.useCallback(async () => {
    try {
      dispatch({ type: 'LOADING' });
      
      // Usamos o valor fixo ao invés do valor das props
      const pixData = await generatePixCode(fixedValue);
      
      if (pixData.payload) {
        dispatch({ type: 'SUCCESS', payload: pixData.payload });
        
        if (onGenerated) {
          onGenerated();
        }
      } else {
        throw new Error('Falha ao gerar código PIX');
      }
    } catch (error) {
      console.error('Erro ao gerar QR code PIX:', error);
      dispatch({ type: 'ERROR', payload: 'Falha ao gerar o QR code' });
    }
  }, [fixedValue, onGenerated]);

  // Função para copiar o código PIX para a área de transferência
  const copyToClipboard = React.useCallback(() => {
    if (state.pixCode) {
      navigator.clipboard.writeText(state.pixCode)
        .then(() => {
          dispatch({ type: 'COPY_SUCCESS' });
          // Reset copy status after 3 seconds
          setTimeout(() => dispatch({ type: 'COPY_RESET' }), 3000);
        })
        .catch(error => {
          console.error('Erro ao copiar para área de transferência:', error);
        });
    }
  }, [state.pixCode]);

  // Formatação da chave PIX para exibição
  const displayedKey = React.useMemo(() => {
    // Se o usuário já forneceu uma chave personalizada
    const finalKey = pixKey || defaultPixKey;
    
    // Formatar para exibição amigável
    if (finalKey.length === 11) {
      // CPF
      return finalKey.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (finalKey.length === 11 || finalKey.length === 10) {
      // Telefone
      const hasAreaCode = finalKey.length === 11;
      if (hasAreaCode) {
        return finalKey.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else {
        return finalKey.replace(/(\d{5})(\d{4})/, '$1-$2');
      }
    } else {
      // Outro formato (CNPJ, email, chave aleatória)
      return finalKey;
    }
  }, [pixKey, defaultPixKey]);

  // Estilo para o container do QR code
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
  };

  // Estilo para o QR code
  const qrCodeStyle: React.CSSProperties = {
    padding: '1rem',
    background: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
    width: '220px',
    height: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Estilo para o texto de informação
  const infoStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    marginTop: '0.5rem',
  };

  // Estilo para o valor
  const valueStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0.5rem 0',
  };

  // Estilo para o botão de copiar
  const copyButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    color: state.copied ? '#10B981' : '#333',
    transition: 'color 0.3s ease',
  };

  // Estilo para caixa de alerta
  const alertStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(253, 186, 116, 0.2)',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#d97706',
    maxWidth: '100%',
    textAlign: 'left',
  };

  // Gerar o código PIX ao montar o componente
  React.useLayoutEffect(() => {
    fetchPixCode();
  }, [fetchPixCode]);

  const manualPixInfo = React.useMemo(() => {
    return `${displayedKey} - Matheus Vasconcelos - ${formatCurrency(fixedValue)}`;
  }, [displayedKey, fixedValue]);

  return (
    <div style={containerStyle}>
      <div style={qrCodeStyle}>
        {state.isLoading ? (
          <p>{t("event.payment.loading", "Gerando QR Code...")}</p>
        ) : state.error ? (
          <p>{t("event.payment.error", "Erro ao gerar QR Code")}</p>
        ) : state.pixCode ? (
          <QRCode 
            value={state.pixCode}
            size={190}
            level="H" // Aumentar nível de correção para melhor compatibilidade
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <p>{t("event.payment.error", "Erro ao gerar QR Code")}</p>
        )}
      </div>
      
      <p style={valueStyle}>{formatCurrency(fixedValue)}</p>
      
      {state.pixCode && (
        <button onClick={copyToClipboard} style={copyButtonStyle}>
          <Clipboard size={16} />
          {state.copied 
            ? t("event.payment.copied", "Código PIX copiado!") 
            : t("event.payment.copy", "Copiar código PIX")}
        </button>
      )}
      
      <div style={infoStyle}>
        <p>
          <strong>{t("event.payment.key", "Chave PIX")}:</strong> {displayedKey}
        </p>
        <p>
          <strong>{t("event.payment.recipient", "Destinatário")}:</strong> Matheus Vasconcelos
        </p>
      </div>
      
      
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: '#f8f9fa',
        borderRadius: '0.5rem',
        width: '100%', 
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: '#555',
          marginBottom: '0.3rem'
        }}>
          {t("event.payment.manual_info", "Informações para PIX manual")}:
        </p>
        <p style={{
          fontSize: '0.8rem',
          color: '#666',
          wordBreak: 'break-all'
        }}>
          {manualPixInfo}
        </p>
      </div>
    </div>
  );
};

export default PixQRCode; 