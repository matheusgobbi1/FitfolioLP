import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import buttonStyles, { buttonMediaStyles } from '../styles/components/button';
import { mergeStyles } from '../styles/utils';
import { useResponsiveStyles } from '../hooks/useResponsiveStyles';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  customStyle?: React.CSSProperties;
}

interface RippleStyle {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  isLoading = false,
  onClick,
  className,
  ariaLabel,
  fullWidth = false,
  size = 'md',
  customStyle,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<RippleStyle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const baseButtonStyle = useResponsiveStyles(
    buttonStyles, 
    buttonMediaStyles, 
    variant === 'primary' ? 'btnPrimary' : 'btnSecondary'
  );

  // Limpar ripples após a animação
  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    
    // Criar um timeout para cada ripple sem usar forEach/map
    if (ripples.length > 0) {
      const timeoutId = setTimeout(() => {
        setRipples(prevRipples => prevRipples.slice(1));
      }, 600);
      
      timeoutIds.push(timeoutId);
    }
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [ripples]);

  const mergeStylesWithoutConflict = (baseStyle: React.CSSProperties, additionalStyle?: React.CSSProperties): React.CSSProperties => {
    if (!additionalStyle) return baseStyle;
    
    // Criar uma cópia do estilo base
    const mergedStyle = { ...baseStyle };
    
    // Se o estilo adicional tem 'background' e o base tem 'backgroundColor', removemos o 'backgroundColor'
    if (additionalStyle.background && mergedStyle.backgroundColor) {
      delete mergedStyle.backgroundColor;
    }
    
    // Aplicamos o estilo adicional
    return { ...mergedStyle, ...additionalStyle };
  };

  const getButtonStyle = () => {
    let style = { ...baseButtonStyle };
    
    if (fullWidth) {
      style = mergeStyles(style, { width: '100%' });
    }
    
    if (size === 'sm') {
      style = mergeStyles(style, { padding: '0.375rem 1rem', fontSize: '0.875rem' });
    } else if (size === 'lg') {
      style = mergeStyles(style, { padding: '0.75rem 2rem', fontSize: '1.125rem' });
    }
    
    if (isLoading || disabled) {
      style = mergeStyles(
        style, 
        variant === 'primary' ? buttonStyles.btnPrimaryDisabled : buttonStyles.btnSecondaryDisabled
      );
    }
    
    if (isHovering) {
      style = mergeStyles(
        style, 
        variant === 'primary' ? buttonStyles.btnPrimaryHover : buttonStyles.btnSecondaryHover
      );
    }
    
    // Aplicar estilos personalizados se fornecidos usando o novo método seguro
    if (customStyle) {
      style = mergeStylesWithoutConflict(style, customStyle);
    }
    
    return style;
  };

  // Criar efeito de ripple
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple: RippleStyle = {
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      opacity: 0.3,
    };
    
    setRipples(prevRipples => [...prevRipples, newRipple]);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    if (onClick) onClick();
  };

  // Estilo otimizado para o botão
  const optimizedButtonStyle = {
    ...getButtonStyle(),
    willChange: 'transform, box-shadow',
    backfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  // Estilo otimizado para o texto do botão
  const textStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center' as const,
    padding: '0 0.25rem',
    willChange: 'transform',
    transform: 'translateZ(0)',
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      style={optimizedButtonStyle}
      disabled={disabled || isLoading}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={ariaLabel}
      className={className}
    >
      {/* Ripple effect */}
      {ripples.map((style, index) => (
        <span
          key={index}
          style={{
            ...buttonStyles.btnRipple,
            left: style.left,
            top: style.top,
            width: style.width,
            height: style.height,
            opacity: style.opacity,
            willChange: 'transform, opacity',
          }}
        />
      ))}
      
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          width: '100%',
          textAlign: 'center',
          transform: 'translateZ(0)',
        }}>
          <Loader2 className="animate-spin" style={{ width: '1.25rem', height: '1.25rem' }} />
          <span style={textStyle}>Carregando...</span>
        </div>
      ) : (
        <span style={textStyle}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Button; 