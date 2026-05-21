import { useState } from 'react'

// Componentes do React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

// Navegação entre telas
import { useRouter } from 'expo-router'

// Biblioteca de ícones
import { Ionicons } from '@expo/vector-icons'

// Responsividade baseada em porcentagem da tela
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// Arquivo de cores do projeto
import Colors from '../../constants/Colors'

// Estilos reutilizados da tela de cadastro
import styles from './loginStyles'

// Componente principal da tela de Login
export default function LoginScreen() {

  // Hook responsável pela navegação
  const router = useRouter()

  // Estado que armazena email e senha digitados
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  return (

    // Faz a tela subir quando o teclado aparece
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* Permite rolagem da tela */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================= HEADER ================= */}
        <View style={styles.header}>

          {/* Ícone da aplicação */}
          <View style={styles.iconContainer}>
            <Ionicons
              name="school"
              size={wp('10%')}
              color={Colors.primaryForeground}
            />
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Rede Social{'\n'}Acadêmica
          </Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Conecte-se com estudantes e professores
          </Text>

        </View>

        {/* ================= CARD DO FORMULÁRIO ================= */}
        <View style={styles.card}>

          {/* Botões Login / Cadastro */}
          <View style={styles.toggleContainer}>

            {/* Botão Login ativo */}
            <TouchableOpacity style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>
                Login
              </Text>
            </TouchableOpacity>

            {/* Botão Cadastro */}
            <TouchableOpacity
              style={styles.toggleButtonInactive}

              // Navega para tela de cadastro
              onPress={() => router.push('/(auth)/cadastro')}
            >
              <Text style={styles.toggleTextInactive}>
                Cadastro
              </Text>
            </TouchableOpacity>

          </View>

          {/* ================= INPUT EMAIL ================= */}

          {/* Label do campo */}
          <Text style={styles.label}>Email</Text>

          {/* Campo de email */}
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.mutedForeground}

            // Teclado específico para email
            keyboardType="email-address"

            // Evita letras maiúsculas automáticas
            autoCapitalize="none"

            // Valor atual do input
            value={formData.email}

            // Atualiza o estado ao digitar
            onChangeText={(text) =>
              setFormData({ ...formData, email: text })
            }
          />

          {/* ================= INPUT SENHA ================= */}

          {/* Label da senha */}
          <Text style={styles.label}>Senha</Text>

          {/* Campo da senha */}
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.mutedForeground}

            // Esconde os caracteres da senha
            secureTextEntry

            // Valor atual da senha
            value={formData.senha}

            // Atualiza o estado ao digitar
            onChangeText={(text) =>
              setFormData({ ...formData, senha: text })
            }
          />

          {/* ================= BOTÃO ENTRAR ================= */}

          <TouchableOpacity
            style={styles.button}

            // Navega para a área principal do app
            onPress={() => router.push('/(app)/(tabs)/onboarding')}
          >
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}