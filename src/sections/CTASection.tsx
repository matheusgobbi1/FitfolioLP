import React, { useState, useEffect, useRef } from 'react';
import ctaSectionStyles, { ctaSectionMediaStyles } from '../styles/sections/ctaSection';
import { useResponsiveStyles } from '../hooks/useResponsiveStyles';
import Button from '../components/Button';
import { mergeStyles } from '../styles/utils';
import mockupImage from '../assets/images/mockup-hand.png';
import { X } from 'lucide-react';
import { addSuggestion } from '../services/suggestionService';

// Adicionar keyframes para animações
const keyframes = `
@keyframes bounceUp {
  0% { transform: translateY(50px); opacity: 0; }
  70% { transform: translateY(-10px); }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slideIn {
  0% { transform: translateX(-30px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes modalFadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

// Adicionar estilos ao head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

// Componente do Modal de Sugestão
const SuggestionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, suggestion: string) => Promise<{ success: boolean; message: string }>;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !suggestion.trim()) return;
    
    setIsSubmitting(true);
    const result = await onSubmit(email, suggestion);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
      
      // Reset após 2 segundos e fechar o modal
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setEmail('');
        setSuggestion('');
      }, 2000);
    } else {
      // Mostrar mensagem de erro
      alert(result.message);
    }
  };

  // Estilo para o botão de fechar
  const closeButtonHoverStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(5px)',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 0.8)',
        border: '2px solid #000000',
        position: 'relative',
        animation: 'modalFadeIn 0.3s ease',
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
            ...closeButtonHoverStyle,
          }}
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>
        
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#333',
        }}>
          Ajude a construir o Fitfolio
        </h2>
        
        {submitted ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 20px',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.8)',
              border: '2px solid #000',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p style={{
              fontSize: '1.4rem',
              marginBottom: '15px',
              fontWeight: 'bold',
              color: '#333',
            }}>
              Obrigado pela sua sugestão!
            </p>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
            }}>
              Sua contribuição é muito importante para nós.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Seu email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '2px solid #000000',
                  fontSize: '1rem',
                  boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.8)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  outline: 'none',
                }}
                placeholder="seu.email@exemplo.com"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label 
                htmlFor="suggestion" 
                style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Sua sugestão:
              </label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '2px solid #000000',
                  fontSize: '1rem',
                  minHeight: '120px',
                  resize: 'vertical',
                  boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.8)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  outline: 'none',
                }}
                placeholder="Conte-nos o que podemos construir para ajudá-lo a atingir seus objetivos..."
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '10px',
            }}>
              <Button 
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                ariaLabel="Enviar sugestão"
              >
                Enviar sugestão
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Novo estado para controlar a visibilidade da seção
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs para os elementos que serão animados
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Novo useEffect para detectar quando a seção se torna visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Ativar quando 20% da seção estiver visível
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const ctaSectionStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaSection');
  const ctaContainerStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaContainer');
  const ctaContentStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaContent');
  const ctaCardStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaCard');
  const ctaCardContentStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaCardContent');
  const ctaTitleStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaTitle');
  const ctaDescriptionStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaDescription');
  const ctaImageContainerStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaImageContainer');
  const ctaImageStyle = useResponsiveStyles(ctaSectionStyles, ctaSectionMediaStyles, 'ctaImage');

  // Função para lidar com o envio do formulário no modal
  const handleModalSubmit = async (email: string, suggestion: string) => {
    try {
      const result = await addSuggestion(email, suggestion);
      console.log('Resultado do envio da sugestão:', result);
      return result;
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      return {
        success: false,
        message: 'Ocorreu um erro ao enviar sua sugestão. Por favor, tente novamente.'
      };
    }
  };

  // Estilo para o card com hover (mantendo apenas para o conteúdo, não para a imagem)
  const cardHoverStyle = isHovered && !isMobile ? {
    transform: 'translateY(-5px)',
    boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 0.8)',
  } : {};

  // Adicionar efeito de toque para dispositivos móveis (apenas para o card, não para a imagem)
  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
      // Remover o hover após 1.5 segundos em dispositivos móveis para ver o efeito de zoom
      setTimeout(() => setIsHovered(false), 1500);
    }
  };

  // Estilo personalizado para o container da imagem
  const customImageContainerStyle = {
    ...ctaImageContainerStyle,
    margin: 0,
    padding: 0,
    position: 'relative' as 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Removendo animação da imagem
    opacity: 1,
  };

  // Estilo personalizado para a imagem com zoom dinâmico
  const customImageStyle = {
    ...ctaImageStyle,
    margin: 0,
    padding: 0,
    borderRadius: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    objectPosition: isMobile ? 'center 30%' : 'center 25%',
    display: 'block',
    transition: 'transform 0.5s ease',
    transform: isHovered && !isMobile 
      ? 'scale(1.5)'
      : isMobile 
        ? 'scale(1.4)'
        : 'scale(1.4)',
  };

  // Aplicar animações sequenciais aos elementos quando a seção for visível
  const animatedTitleStyle = {
    ...ctaTitleStyle,
    animation: isVisible ? 'bounceUp 0.6s ease-out forwards' : 'none',
    opacity: 0
  };

  const animatedDescriptionStyle = {
    ...ctaDescriptionStyle,
    animation: isVisible ? 'fadeIn 0.6s ease-out forwards 0.3s' : 'none',
    opacity: 0
  };

  const animatedButtonContainerStyle = {
    marginTop: '25px',
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start',
    animation: isVisible ? 'fadeIn 0.6s ease-out forwards 0.6s, pulse 2s ease-in-out 1.5s' : 'none',
    opacity: 0
  };

  return (
    <>
      <section ref={sectionRef} style={ctaSectionStyle}>
        <div style={ctaContainerStyle}>
          <div style={ctaContentStyle}>
            <div 
              style={mergeStyles(ctaCardStyle, cardHoverStyle)}
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
              onTouchStart={handleTouchStart}
            >
              <div style={ctaCardContentStyle}>
                <h2 ref={titleRef} style={animatedTitleStyle}>Ajude a construir o Fitfolio</h2>
                
                <p ref={descriptionRef} style={animatedDescriptionStyle}>
                  Queremos que todos vivam vidas saudáveis e em forma. 
                  Gostaria que você nos contasse o que podemos fazer para ajudá-lo a atingir seus objetivos. 
                </p>
                
                <div ref={buttonRef} style={animatedButtonContainerStyle}>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    ariaLabel="Enviar sugestão"
                  >
                    Enviar sugestão
                  </Button>
                </div>
              </div>
              
              <div ref={imageRef} style={customImageContainerStyle}>
                <img 
                  src={mockupImage} 
                  alt="Mockup do aplicativo Fitfolio em um smartphone" 
                  style={customImageStyle}
                  loading="eager"
                  onTouchStart={handleTouchStart}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SuggestionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default CTASection; 