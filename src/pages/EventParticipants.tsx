import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, ChevronLeft, Search } from 'lucide-react';
import { getRecentParticipants, EventRegistrationData } from '../services/eventRegistrationService';
import { colors, spacing } from '../styles/appStyles';
import Button from '../components/Button';

// Estilos para esta página
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "calc(70px + 2rem)",
    paddingBottom: spacing["2xl"],
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    background: "linear-gradient(-45deg, #111, #222, #333, #222)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    maxWidth: "900px",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: "3.5rem",
    textAlign: "center",
    color: colors.white,
    marginBottom: spacing.sm,
    fontWeight: "bold",
    textTransform: "uppercase",
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  content: {
    width: "100%",
    maxWidth: "900px",
    background: "rgba(28, 28, 30, 0.95)",
    borderRadius: "1rem",
    padding: spacing.xl,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    marginTop: spacing.lg,
    position: "relative",
    zIndex: 2,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  tabs: {
    display: "flex",
    marginBottom: spacing.lg,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  tab: {
    padding: `${spacing.sm} ${spacing.md}`,
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.6)",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  activeTab: {
    color: colors.white,
    borderBottomColor: colors.primary,
  },
  searchBox: {
    display: "flex",
    marginBottom: spacing.lg,
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.5rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255, 255, 255, 0.08)",
    color: colors.white,
    fontSize: "1rem",
    outline: "none",
  },
  searchIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255, 255, 255, 0.5)",
  },
  participantsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  participantCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: spacing.md,
    borderRadius: "0.5rem",
    background: "rgba(40, 40, 40, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.2s ease",
  },
  participantAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: colors.white,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    color: colors.white,
    fontWeight: "medium",
    fontSize: "1rem",
  },
  participantDetails: {
    display: "flex",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.6)",
    gap: "0.75rem",
    marginTop: "0.25rem",
  },
  badgeConfirmed: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    background: "rgba(16, 185, 129, 0.2)",
    color: "rgba(16, 185, 129, 0.9)",
    padding: "0.25rem 0.5rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    fontWeight: "medium",
  },
  badgePending: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    background: "rgba(245, 158, 11, 0.2)",
    color: "rgba(245, 158, 11, 0.9)",
    padding: "0.25rem 0.5rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    fontWeight: "medium",
  },
  emptyState: {
    textAlign: "center",
    padding: spacing.xl,
    color: "rgba(255, 255, 255, 0.6)",
  },
  emptyStateIcon: {
    margin: "0 auto",
    marginBottom: spacing.md,
    color: "rgba(255, 255, 255, 0.3)",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: spacing.xl,
  },
  loadingState: {
    textAlign: "center",
    padding: spacing.xl,
    color: "rgba(255, 255, 255, 0.6)",
  },
  topParticipants: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: spacing.xl,
  },
  topParticipantCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(40, 40, 40, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: spacing.md,
    borderRadius: "0.75rem",
    flex: "1 1 calc(33.333% - 1rem)",
    minWidth: "180px",
    position: "relative",
  },
  topAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    position: "relative",
  },
  medal: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
  },
  statsSection: {
    background: "rgba(40, 40, 40, 0.6)",
    borderRadius: "0.75rem",
    padding: spacing.lg,
    marginBottom: spacing.xl,
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1rem",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "120px",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: colors.white,
    background: "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: "0.25rem",
  },
};

// Cores para os avatares
const AVATAR_COLORS = [
  "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
  "linear-gradient(45deg, #4D79FF, #4DFFF6)",
  "linear-gradient(45deg, #8B5CF6, #D946EF)",
  "linear-gradient(45deg, #10B981, #34D399)",
  "linear-gradient(45deg, #F59E0B, #FBBF24)",
];

// Componente ParticlesBackground para o fundo (o mesmo do EventRegistration)
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

const EventParticipants: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [participants, setParticipants] = useState<EventRegistrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Estado para controle de estatísticas
  const [stats, setStats] = useState({
    totalParticipants: 0,
  });

  // Detectar mudanças no tamanho da tela
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função para carregar os participantes
  const loadParticipants = useCallback(async () => {
    setLoading(true);
    try {
      // Carregamos todos os participantes diretamente
      const data = await getRecentParticipants(100);
      setParticipants(data);
      
      // Atualizar estatísticas simplificadas
      setStats({
        totalParticipants: data.length,
      });
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar participantes ao montar o componente
  React.useEffect(() => {
    loadParticipants();
  }, [loadParticipants]);

  // Filtrar participantes com base na busca
  const filteredParticipants = React.useMemo(() => {
    if (!searchQuery) return participants;
    
    return participants.filter(
      (participant) => participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [participants, searchQuery]);

  // Gerar as iniciais para o avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Gerar uma cor para o avatar baseada no nome
  const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  };

  // Formatar a data de registro para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Componente para mostrar estatísticas simplificado
  const StatsSection = () => {
    return (
      <div style={styles.statsSection}>
        <div style={styles.statBox}>
          <div style={styles.statValue}>{stats.totalParticipants}</div>
          <div style={styles.statLabel}>{t("event.participants.total", "Participantes")}</div>
        </div>
      </div>
    );
  };

  const ParticipantCard = ({ participant }: { participant: EventRegistrationData }) => {
    return (
      <div style={styles.participantCard}>
        <div 
          style={{
            ...styles.participantAvatar,
            background: getAvatarColor(participant.name),
          }}
        >
          {getInitials(participant.name)}
        </div>
        
        <div style={styles.participantInfo}>
          <div style={styles.participantName}>{participant.name}</div>
          <div style={styles.participantDetails}>
            <span>{participant.shirtSize}</span>
            <span>•</span>
            <span>{participant.gender === 'masculino' ? 'M' : 'F'}</span>
            <span>•</span>
            <span>{formatDate(participant.registrationDate)}</span>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar o título responsivo
  const renderResponsiveTitle = () => {
    const isSmallMobile = window.innerWidth < 480;
    
    if (isMobile) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: isSmallMobile ? "3.8rem" : "5.2rem",
            lineHeight: 1,
            width: '100%',
            margin: 0,
            padding: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: 'center',
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}>
            FITFOLIO
          </h1>
          <h1 style={{
            fontSize: isSmallMobile ? "5.6rem" : "7.2rem",
            lineHeight: 0.9,
            width: '100%',
            margin: 0,
            marginTop: "0.2rem",
            padding: 0,
            fontWeight: "bold",
            textTransform: "uppercase",
            background: "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.04em",
            textAlign: 'center',
            textShadow: "0 2px 0 rgba(0, 0, 0, 0.1)",
          }}>
            RUN
          </h1>
        </div>
      );
    }
    
    return (
      <h1 style={{
        fontSize: "9rem",
        textAlign: "center",
        marginBottom: spacing.sm,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}>
        <span style={{
          background: "linear-gradient(45deg, #FFFFFF, #DDDDDD)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>FITFOLIO</span>{" "}
        <span style={{
          background: "linear-gradient(45deg, #FF4D4D, #FF9D4D)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>RUN</span>
      </h1>
    );
  };

  return (
    <div style={styles.container}>
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
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
      }}>
        <ParticlesBackground />
      </div>
      
      <div style={styles.header}>
        {renderResponsiveTitle()}
        <p style={styles.subtitle}>
          {t(
            "event.participants.subtitle", 
            "Confira os participantes do nosso evento exclusivo"
          )}
        </p>
      </div>
      
      <div style={styles.content}>
        {/* Seção de estatísticas */}
        {!loading && <StatsSection />}
        
        {/* Busca */}
        <div style={styles.searchBox}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={t("event.participants.searchPlaceholder", "Buscar participante...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        {/* Lista de participantes */}
        {loading ? (
          <div style={styles.loadingState}>
            {t("event.participants.loading", "Carregando participantes...")}
          </div>
        ) : filteredParticipants.length > 0 ? (
          <div style={styles.participantsList}>
            {filteredParticipants.map((participant) => (
              <ParticipantCard 
                key={participant.registrationId} 
                participant={participant} 
              />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Users size={48} style={styles.emptyStateIcon} />
            <p>
              {searchQuery 
                ? t("event.participants.noSearchResults", "Nenhum participante encontrado com este nome") 
                : t("event.participants.noParticipants", "Ainda não há participantes registrados")}
            </p>
          </div>
        )}
        
        {/* Botão de voltar */}
        <div style={styles.backButton}>
          <Button 
            onClick={() => navigate("/event-registration")} 
            variant="secondary"
            size="md"
            customStyle={{ 
              padding: "0.75rem 1.5rem",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff", 
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <ChevronLeft size={18} />
            {t("event.participants.backToRegistration", "Voltar para Inscrição")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventParticipants; 