import React, { useReducer, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import eventRegistrationStyles, { 
  eventRegistrationMediaStyles 
} from "../styles/pages/eventRegistration";
import { useResponsiveStyles } from "../hooks/useResponsiveStyles";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import PixQRCode from "../components/PixQRCode";
import { registerForEvent } from "../services/eventRegistrationService";
// Importar as imagens diretamente
import shirtFrontImage from "../assets/images/shirt-front.png";
import shirtBackImage from "../assets/images/shirt-back.png";

// Tipos para o formulário multistep
type FormStep = 1 | 2 | 3 | 4;

type ShirtSize = "P" | "M" | "G" | "GG";
type Gender = "masculino" | "feminino";

interface FormData {
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  shirtSize: ShirtSize;
}

// Interface do estado
interface EventRegistrationState {
  currentStep: FormStep;
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  qrCodeGenerated: boolean;
  registrationId: string | null;
  serverError: string | null;
}

// Tipo das ações
type EventRegistrationAction =
  | { type: "SET_STEP"; payload: FormStep }
  | { type: "UPDATE_FORM"; payload: Partial<FormData> }
  | { type: "SET_ERROR"; field: keyof FormData; message: string }
  | { type: "CLEAR_ERROR"; field: keyof FormData }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_SUBMITTED"; payload: boolean }
  | { type: "GENERATE_QR"; payload: boolean }
  | { type: "SET_REGISTRATION_ID"; payload: string }
  | { type: "SET_SERVER_ERROR"; payload: string | null };

// Estado inicial
const initialState: EventRegistrationState = {
  currentStep: 1,
  formData: {
    name: "",
    email: "",
    phone: "",
    gender: "masculino",
    shirtSize: "M",
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  qrCodeGenerated: false,
  registrationId: null,
  serverError: null
};

// Reducer para gerenciar o estado
const eventReducer = (
  state: EventRegistrationState, 
  action: EventRegistrationAction
): EventRegistrationState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "UPDATE_FORM":
      return { 
        ...state, 
        formData: { ...state.formData, ...action.payload } 
      };
    case "SET_ERROR": {
      const newErrors = { ...state.errors, [action.field]: action.message };
      return { ...state, errors: newErrors };
    }
    case "CLEAR_ERROR": {
      const newErrors = { ...state.errors };
      delete newErrors[action.field];
      return { ...state, errors: newErrors };
    }
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_SUBMITTED":
      return { ...state, isSubmitted: action.payload };
    case "GENERATE_QR":
      return { ...state, qrCodeGenerated: action.payload };
    case "SET_REGISTRATION_ID":
      return { ...state, registrationId: action.payload };
    case "SET_SERVER_ERROR":
      return { ...state, serverError: action.payload };
    default:
      return state;
  }
};

// Funções utilitárias
const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Componente para partículas de fundo
const ParticlesBackground: React.FC = React.memo(() => {
  // Gerar partículas com posições aleatórias
  const particles = React.useMemo(() => {
    const count = 20; // Número de partículas
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1; // Tamanho entre 1px e 4px
      const opacity = Math.random() * 0.1 + 0.05; // Opacidade entre 0.05 e 0.15
      const left = Math.random() * 100; // Posição X entre 0% e 100%
      const top = Math.random() * 100; // Posição Y entre 0% e 100%
      const animationDuration = Math.random() * 50 + 30; // Duração entre 30s e 80s
      const animationDelay = Math.random() * 10; // Atraso entre 0s e 10s

      const styles: React.CSSProperties = {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        opacity,
        borderRadius: "50%",
        left: `${left}%`,
        top: `${top}%`,
        animation: `float ${animationDuration}s infinite ease-in-out ${animationDelay}s`,
      };

      return <div key={i} style={styles} />;
    });
  }, []);

  return <>{particles}</>;
});

// Componente para o modal de visualização da camiseta
interface ShirtModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onChangeImage: (index: number) => void;
}

const ShirtModal: React.FC<ShirtModalProps> = ({ 
  isOpen, 
  onClose, 
  images,
  currentIndex,
  onChangeImage
}) => {
  if (!isOpen) return null;
  
  // Estilo simplificado para a imagem no modal
  const modalImageStyle = {
    maxWidth: "90%",
    maxHeight: "80vh",
    height: "auto",
    objectFit: "contain" as const,
    display: "block",
    margin: "0 auto",
  };
  
  const nextImage = () => {
    onChangeImage((currentIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    onChangeImage((currentIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <X size={24} />
        </button>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}>
          <img
            src={images[currentIndex]}
            alt={`Camiseta do evento - vista ${currentIndex === 0 ? 'frontal' : 'traseira'}`}
            style={modalImageStyle}
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={30} />
              </button>
              
              <button
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente atualizado para o carrossel de imagens da camiseta
const ShirtGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
  
  // Estilo simplificado para a imagem PNG, sem card especial
  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "400px",
    height: "auto",
    display: "block",
    margin: "0 auto",
    transition: "opacity 0.3s ease",
  };
  
  return (
    <div style={{ 
      width: "100%", 
      marginBottom: "2rem",
      position: "relative",
      padding: "1rem 0"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        position: "relative",
      }}>
        {images.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}>
            <img 
              src={images[currentIndex]} 
              alt={`Camiseta do evento - ${currentIndex === 0 ? 'frente' : 'costas'}`}
              style={imageStyle}
            />
            
            <button
              onClick={openModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              <Maximize size={18} />
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={goToPrev} 
                  style={{
                    position: "absolute",
                    left: isMobile ? "8px" : "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: isMobile ? "36px" : "44px",
                    height: isMobile ? "36px" : "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 5,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <ChevronLeft size={isMobile ? 18 : 22} />
                </button>
                
                <button 
                  onClick={goToNext} 
                  style={{
                    position: "absolute",
                    right: isMobile ? "4px" : "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: isMobile ? "36px" : "44px",
                    height: isMobile ? "36px" : "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 5,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <ChevronRight size={isMobile ? 18 : 22} />
                </button>
                
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: isMobile ? "12px" : "10px",
                  position: "absolute",
                  bottom: isMobile ? "-45px" : "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: isMobile ? "8px 12px" : "5px 10px",
                  borderRadius: "20px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)"
                }}>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      style={{
                        width: isMobile ? "12px" : "10px",
                        height: isMobile ? "12px" : "10px",
                        borderRadius: "50%",
                        background: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <ShirtModal
        isOpen={modalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentIndex}
        onChangeImage={setCurrentIndex}
      />
    </div>
  );
};

// Componente principal
const EventRegistration: React.FC = () => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const formRef = useRef<HTMLFormElement>(null);

  // Estilos responsivos
  const containerStyle = useResponsiveStyles(
    eventRegistrationStyles,
    eventRegistrationMediaStyles,
    "container"
  );

  const headerStyle = useResponsiveStyles(
    eventRegistrationStyles,
    eventRegistrationMediaStyles,
    "header"
  );

  const titleStyle = useResponsiveStyles(
    eventRegistrationStyles,
    eventRegistrationMediaStyles,
    "title"
  );

  const subtitleStyle = useResponsiveStyles(
    eventRegistrationStyles,
    eventRegistrationMediaStyles,
    "subtitle"
  );

  const formContainerStyle = useResponsiveStyles(
    eventRegistrationStyles,
    eventRegistrationMediaStyles,
    "formContainer"
  );

  // Usar imagens importadas diretamente
  const shirtImages = [
    shirtFrontImage,
    shirtBackImage,
  ];

  // Validação do formulário
  const validateStep = (step: FormStep): boolean => {
    let isValid = true;

    if (step === 1) {
      if (!state.formData.name) {
        dispatch({
          type: "SET_ERROR",
          field: "name",
          message: t("event.errors.nameRequired", "Nome é obrigatório"),
        });
        isValid = false;
      } else {
        dispatch({ type: "CLEAR_ERROR", field: "name" });
      }
    }

    if (step === 2) {
      if (!state.formData.email) {
        dispatch({
          type: "SET_ERROR",
          field: "email",
          message: t("event.errors.emailRequired", "Email é obrigatório"),
        });
        isValid = false;
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.formData.email)
      ) {
        dispatch({
          type: "SET_ERROR",
          field: "email",
          message: t("event.errors.emailInvalid", "Email inválido"),
        });
        isValid = false;
      } else {
        dispatch({ type: "CLEAR_ERROR", field: "email" });
      }
    }

    if (step === 3) {
      if (!state.formData.phone) {
        dispatch({
          type: "SET_ERROR",
          field: "phone",
          message: t("event.errors.phoneRequired", "Telefone é obrigatório"),
        });
        isValid = false;
      } else if (!/^\d{10,11}$/.test(state.formData.phone.replace(/\D/g, ''))) {
        dispatch({
          type: "SET_ERROR",
          field: "phone",
          message: t("event.errors.phoneInvalid", "Telefone inválido"),
        });
        isValid = false;
      } else {
        dispatch({ type: "CLEAR_ERROR", field: "phone" });
      }
    }

    return isValid;
  };

  // Handlers
  const handleNextStep = () => {
    const currentStep = state.currentStep;
    if (validateStep(currentStep)) {
      const nextStep = (currentStep + 1) as FormStep;
      if (nextStep <= 4) {
        dispatch({ type: "SET_STEP", payload: nextStep });
      }
    }
  };

  const handlePreviousStep = () => {
    const currentStep = state.currentStep;
    const prevStep = (currentStep - 1) as FormStep;
    if (prevStep >= 1) {
      dispatch({ type: "SET_STEP", payload: prevStep });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FORM",
      payload: { [name]: value },
    });

    // Limpar erro ao digitar
    if (state.errors[name as keyof FormData]) {
      dispatch({ type: "CLEAR_ERROR", field: name as keyof FormData });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    dispatch({
      type: "UPDATE_FORM",
      payload: { phone: formattedPhone },
    });
    if (state.errors.phone) {
      dispatch({ type: "CLEAR_ERROR", field: "phone" });
    }
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      // Prevenir o comportamento padrão do formulário
      formRef.current.onsubmit = (e) => e.preventDefault();
    }
    
    // Validar formulário completo
    if (validateStep(state.currentStep)) {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      dispatch({ type: "SET_SERVER_ERROR", payload: null });
      
      try {
        // Chamar o serviço para registrar o participante no evento
        const result = await registerForEvent({
          name: state.formData.name,
          email: state.formData.email,
          phone: state.formData.phone.replace(/\D/g, ''), // Remove caracteres não numéricos
          gender: state.formData.gender,
          shirtSize: state.formData.shirtSize
        });
        
        if (result.success) {
          // Salvar o ID do registro para uso posterior
          if (result.registrationId) {
            dispatch({ type: "SET_REGISTRATION_ID", payload: result.registrationId });
          }
          
          dispatch({ type: "SET_SUBMITTING", payload: false });
          dispatch({ type: "SET_SUBMITTED", payload: true });
          dispatch({ type: "GENERATE_QR", payload: true });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        dispatch({ type: "SET_SUBMITTING", payload: false });
        
        let errorMessage = t("event.errors.serverError", "Erro ao processar inscrição. Tente novamente.") as string;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        dispatch({ type: "SET_SERVER_ERROR", payload: errorMessage });
      }
    }
  };

  // Renderizar etapas específicas
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <div>
            <div style={eventRegistrationStyles.formHeader}>
              <h3 style={eventRegistrationStyles.formTitle}>
                {t("event.steps.personal", "Informações Pessoais")}
              </h3>
            </div>
            
            <div style={eventRegistrationStyles.formGroup}>
              <label htmlFor="name" style={eventRegistrationStyles.label}>
                {t("event.form.name", "Nome Completo")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                style={eventRegistrationStyles.input}
                value={state.formData.name}
                onChange={handleChange}
              />
              {state.errors.name && (
                <p style={eventRegistrationStyles.errorText}>
                  {state.errors.name}
                </p>
              )}
            </div>
            
            <div style={{
              ...eventRegistrationStyles.buttonContainer,
              justifyContent: "center"
            }}>
              <Button 
                onClick={handleNextStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(45deg, #333, #555)",
                  width: "100%"
                }}
              >
                {t("event.buttons.next", "Próximo")}
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <div style={eventRegistrationStyles.formHeader}>
              <h3 style={eventRegistrationStyles.formTitle}>
                {t("event.steps.contact", "Informações de Contato")}
              </h3>
            </div>
            
            <div style={eventRegistrationStyles.formGroup}>
              <label htmlFor="email" style={eventRegistrationStyles.label}>
                {t("event.form.email", "Email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={eventRegistrationStyles.input}
                value={state.formData.email}
                onChange={handleChange}
              />
              {state.errors.email && (
                <p style={eventRegistrationStyles.errorText}>
                  {state.errors.email}
                </p>
              )}
            </div>
            
            <div style={eventRegistrationStyles.buttonContainer}>
              <Button 
                variant="secondary" 
                onClick={handlePreviousStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#fff", 
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  minWidth: "120px",
                  flex: "1",
                  maxWidth: "200px"
                }}
              >
                {t("event.buttons.back", "Voltar")}
              </Button>
              <Button 
                onClick={handleNextStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(45deg, #333, #555)",
                  minWidth: "120px",
                  flex: "1",
                  maxWidth: "200px"
                }}
              >
                {t("event.buttons.next", "Próximo")}
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <div style={eventRegistrationStyles.formHeader}>
              <h3 style={eventRegistrationStyles.formTitle}>
                {t("event.steps.details", "Detalhes do Evento")}
              </h3>
            </div>
            
            <h4 style={eventRegistrationStyles.shirtPreviewTitle}>
              {t("event.form.shirtPreview", "Camiseta Exclusiva do Evento")}
            </h4>
            
            <ShirtGallery images={shirtImages} />
            
            <div style={eventRegistrationStyles.formGroup}>
              <label htmlFor="phone" style={eventRegistrationStyles.label}>
                {t("event.form.phone", "Telefone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                style={eventRegistrationStyles.input}
                value={state.formData.phone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
              />
              {state.errors.phone && (
                <p style={eventRegistrationStyles.errorText}>
                  {state.errors.phone}
                </p>
              )}
            </div>
            
            <div style={eventRegistrationStyles.formGroup}>
              <label style={eventRegistrationStyles.label}>
                {t("event.form.gender", "Gênero")}
              </label>
              <div style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.5rem"
              }}>
                <div
                  onClick={() => dispatch({
                    type: "UPDATE_FORM",
                    payload: { gender: "masculino" }
                  })}
                  style={{
                    flex: 1,
                    padding: "1.25rem 1rem",
                    background: state.formData.gender === "masculino" 
                      ? "linear-gradient(45deg, rgba(30, 144, 255, 0.2), rgba(70, 130, 180, 0.3))" 
                      : "rgba(40, 40, 40, 0.7)",
                    borderRadius: "0.75rem",
                    border: state.formData.gender === "masculino" 
                      ? "2px solid rgba(30, 144, 255, 0.7)" 
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    boxShadow: state.formData.gender === "masculino" 
                      ? "0 0 10px rgba(30, 144, 255, 0.3)" 
                      : "none"
                  }}
                >
                  <div style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem"
                  }}>
                    👨
                  </div>
                  <p style={{
                    color: state.formData.gender === "masculino" 
                      ? "#fff" 
                      : "rgba(255, 255, 255, 0.7)",
                    fontWeight: state.formData.gender === "masculino" 
                      ? "600" 
                      : "normal"
                  }}>
                    {t("event.form.male", "Masculino")}
                  </p>
                </div>

                <div
                  onClick={() => dispatch({
                    type: "UPDATE_FORM",
                    payload: { gender: "feminino" }
                  })}
                  style={{
                    flex: 1,
                    padding: "1.25rem 1rem",
                    background: state.formData.gender === "feminino" 
                      ? "linear-gradient(45deg, rgba(219, 112, 147, 0.2), rgba(255, 105, 180, 0.3))" 
                      : "rgba(40, 40, 40, 0.7)",
                    borderRadius: "0.75rem",
                    border: state.formData.gender === "feminino" 
                      ? "2px solid rgba(219, 112, 147, 0.7)" 
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    boxShadow: state.formData.gender === "feminino" 
                      ? "0 0 10px rgba(219, 112, 147, 0.3)" 
                      : "none"
                  }}
                >
                  <div style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem"
                  }}>
                    👩
                  </div>
                  <p style={{
                    color: state.formData.gender === "feminino" 
                      ? "#fff" 
                      : "rgba(255, 255, 255, 0.7)",
                    fontWeight: state.formData.gender === "feminino" 
                      ? "600" 
                      : "normal"
                  }}>
                    {t("event.form.female", "Feminino")}
                  </p>
                </div>
              </div>
            </div>
            
            <div style={eventRegistrationStyles.formGroup}>
              <label style={eventRegistrationStyles.label}>
                {t("event.form.shirtSize", "Tamanho da Camiseta")}
              </label>
              
              <div style={{
                marginTop: "0.75rem",
                display: "flex",
                gap: "0.5rem",
                justifyContent: "space-between"
              }}>
                {["P", "M", "G", "GG"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => dispatch({
                      type: "UPDATE_FORM",
                      payload: { shirtSize: size as ShirtSize }
                    })}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      background: state.formData.shirtSize === size 
                        ? "linear-gradient(45deg, #FF4D4D, #FF9D4D)" 
                        : "rgba(40, 40, 40, 0.8)",
                      color: "#fff",
                      border: state.formData.shirtSize === size 
                        ? "none" 
                        : "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontWeight: state.formData.shirtSize === size ? "600" : "normal",
                      transition: "all 0.2s ease",
                      boxShadow: state.formData.shirtSize === size 
                        ? "0 4px 12px rgba(255, 77, 77, 0.3)" 
                        : "none"
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={eventRegistrationStyles.buttonContainer}>
              <Button 
                variant="secondary" 
                onClick={handlePreviousStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#fff", 
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  minWidth: "120px",
                  flex: "1",
                  maxWidth: "200px"
                }}
              >
                {t("event.buttons.back", "Voltar")}
              </Button>
              <Button 
                onClick={handleNextStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(45deg, #333, #555)",
                  minWidth: "120px",
                  flex: "1",
                  maxWidth: "200px"
                }}
              >
                {t("event.buttons.review", "Revisar")}
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <div style={eventRegistrationStyles.formHeader}>
              <h3 style={eventRegistrationStyles.formTitle}>
                {t("event.steps.confirmation", "Confirmar")}
              </h3>
            </div>
            
            <div style={{ marginBottom: "1.5rem", color: "#fff" }}>
              <h4 style={{ 
                fontWeight: "600", 
                fontSize: "1rem", 
                marginBottom: "0.5rem",
                color: "#fff" 
              }}>
                {t("event.review.personal", "Dados Pessoais")}:
              </h4>
              <p><strong>{t("event.form.name", "Nome")}:</strong> {state.formData.name}</p>
              <p><strong>{t("event.form.email", "Email")}:</strong> {state.formData.email}</p>
              <p><strong>{t("event.form.phone", "Telefone")}:</strong> {state.formData.phone}</p>
              <p><strong>{t("event.form.gender", "Gênero")}:</strong> {state.formData.gender === "masculino" ? "Masculino" : "Feminino"}</p>
              <p><strong>{t("event.form.shirtSize", "Tamanho da Camiseta")}:</strong> {state.formData.shirtSize}</p>
            </div>
            
            <div style={{ 
              padding: "1rem", 
              background: "rgba(16, 185, 129, 0.1)", 
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}>
              <p style={{ fontWeight: "500", color: "#fff" }}>
                {t("event.payment.info", "Valor do Evento")}: <strong>R$ 60,00</strong>
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "rgba(255, 255, 255, 0.7)" }}>
                {t(
                  "event.payment.details", 
                  "Após confirmar, você será direcionado para o pagamento via PIX"
                )}
              </p>
            </div>
            
            {/* Exibir erro do servidor, se houver */}
            {state.serverError && (
              <div style={{
                padding: "0.75rem",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ff6b6b",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}>
                {state.serverError}
              </div>
            )}
            
            <div style={eventRegistrationStyles.buttonContainer}>
              <Button 
                variant="secondary" 
                onClick={handlePreviousStep}
                size="md"
                customStyle={{ 
                  padding: "0.75rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#fff", 
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  width: "48%"
                }}
              >
                {t("event.buttons.back", "Voltar")}
              </Button>
              <Button 
                onClick={handleSubmit} 
                isLoading={state.isSubmitting}
                size="md"
                customStyle={{
                  background: "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
                  fontWeight: "bold",
                  padding: "0.75rem 1.5rem",
                  width: "48%"
                }}
              >
                {t("event.buttons.confirm", "Confirmar Inscrição")}
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Renderizar indicador de etapas
  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4];
    
    return (
      <div style={eventRegistrationStyles.stepIndicator}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              style={{
                ...eventRegistrationStyles.step,
                ...(state.currentStep === step
                  ? eventRegistrationStyles.stepActive
                  : {}),
                ...(state.currentStep > step
                  ? eventRegistrationStyles.stepCompleted
                  : {}),
              }}
            >
              {state.currentStep > step ? (
                <Check size={16} />
              ) : (
                step
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div
                style={{
                  ...eventRegistrationStyles.stepLine,
                  ...(state.currentStep > index + 1
                    ? eventRegistrationStyles.stepLineActive
                    : {}),
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Renderizar QR Code de pagamento
  const renderPaymentQRCode = () => {
    return (
      <div style={eventRegistrationStyles.qrCodeContainer}>
        <h3 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "600", 
          marginBottom: "1rem",
          color: "#fff"
        }}>
          {t("event.payment.title", "Pagamento via PIX")}
        </h3>
        
        <p style={{ marginBottom: "1.5rem", color: "rgba(255, 255, 255, 0.8)" }}>
          {t(
            "event.payment.scan", 
            "Escaneie o QR Code abaixo para efetuar o pagamento de R$ 60,00"
          )}
        </p>
        
        <PixQRCode 
          value={60} 
          description={`FITFOLIO RUN - ${state.formData.name}`}
        />
        
        <div style={{ marginTop: "2rem" }}>
          <Button 
            onClick={() => navigate("/event-participants")} 
            variant="secondary"
            size="md"
            customStyle={{ 
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(45deg, rgba(255, 77, 77, 0.2), rgba(255, 157, 77, 0.2))",
              color: "#fff", 
              border: "1px solid rgba(255, 77, 77, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
              width: "100%",
              maxWidth: "320px",
              margin: "0 auto"
            }}
          >
            {t("event.buttons.viewParticipants", "Ver Participantes Confirmados")}
          </Button>
        </div>
      </div>
    );
  };

  // Estilo para partículas decorativas
  const particlesContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
  };

  return (
    <div style={containerStyle}>
      {/* Animação de fundo */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          
          @keyframes float {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(10px, 10px) rotate(5deg);
            }
            50% {
              transform: translate(-5px, 15px) rotate(-5deg);
            }
            75% {
              transform: translate(-10px, 5px) rotate(2deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }
        `}
      </style>
      
      {/* Partículas de fundo */}
      <div style={particlesContainerStyle}>
        <ParticlesBackground />
      </div>
      
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {t("event.title", "FITFOLIO RUN")}
        </h1>
        <p style={subtitleStyle}>
          {t(
            "event.description", 
            "Participe da nossa corrida exclusiva, ganhe uma camiseta personalizada e faça parte da comunidade FITFOLIO"
          )}
        </p>
      </div>
      
      <div style={formContainerStyle}>
        {!state.isSubmitted ? (
          <>
            {renderStepIndicator()}
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
              {renderStep()}
            </form>
          </>
        ) : (
          renderPaymentQRCode()
        )}
      </div>
    </div>
  );
};

export default EventRegistration; 