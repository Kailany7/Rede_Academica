import { useState } from 'react';

// React Native
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Navegação
import { useRouter } from 'expo-router';

// Ícones
import {
  ChevronRight,
  Users,
  MessageSquare,
  GraduationCap,
  BookOpen,
} from 'lucide-react-native';

// Cores do projeto
import Colors from '../../constants/Colors'

export default function OnboardingScreen() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Users size={70} color="#FFFFFF" />,
      title: 'Conecte-se com Colegas',
      description:
        'Encontre e interaja com estudantes do seu curso. Compartilhe conhecimento e crie conexões.',
      color: '#0A4174',
    },
    {
      icon: <MessageSquare size={70} color="#FFFFFF" />,
      title: 'Participe de Grupos',
      description:
        'Entre em grupos de estudo, projetos e disciplinas. Colabore e aprenda junto.',
      color: '#4E8EA2',
    },
    {
      icon: <BookOpen size={70} color="#FFFFFF" />,
      title: 'Acesse Conteúdos',
      description:
        'Encontre materiais de estudo, vídeos e conteúdos acadêmicos importantes.',
      color: '#7BBDE8',
    },
  ];

  const handleFinish = () => {
    router.replace('/(app)/(tabs)/feed');
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.logoContainer}>
          <GraduationCap size={55} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>
          FacisaNet
        </Text>

        <Text style={styles.subtitle}>
          Sua rede social acadêmica
        </Text>

      </View>

      {/* SLIDE */}
      <View style={styles.slideContainer}>

        <View
          style={[
            styles.iconCircle,
            { backgroundColor: slides[currentSlide].color },
          ]}
        >
          {slides[currentSlide].icon}
        </View>

        <Text style={styles.slideTitle}>
          {slides[currentSlide].title}
        </Text>

        <Text style={styles.slideDescription}>
          {slides[currentSlide].description}
        </Text>

      </View>

      {/* DOTS */}
      <View style={styles.dotsContainer}>

        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentSlide(index)}
            style={[
              styles.dot,
              index === currentSlide && styles.activeDot,
            ]}
          />
        ))}

      </View>

      {/* BOTÕES */}
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1
              ? 'Começar'
              : 'Próximo'}
          </Text>

          <ChevronRight
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {currentSlide < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>
              Pular introdução
            </Text>
          </TouchableOpacity>
        )}

      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 FacisaNet
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 30,
  },

  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.mutedForeground,
    marginTop: 6,
  },

  slideContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginBottom: 20,
  },

  slideDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    color: '#666',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#CCC',
  },

  activeDot: {
    width: 28,
    backgroundColor: Colors.primary,
  },

  buttonsContainer: {
    gap: 18,
  },

  button: {
    height: 58,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  skipText: {
    textAlign: 'center',
    color: Colors.mutedForeground,
    fontSize: 15,
    fontWeight: '500',
  },

  footer: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    color: '#999',
  },

});