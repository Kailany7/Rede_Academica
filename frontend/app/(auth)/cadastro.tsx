import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../constants/Colors'
import styles from './cadastroStyles'

interface FormData {
  nome: string
  email: string
  senha: string
  curso: string
  bio: string
}

export default function CadastroScreen() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    curso: '',
    bio: ''
  })

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }))

  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // no iOS o comportamento é diferente do Android
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Topo com ícone e título */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="school" size={wp('10%')} color={Colors.primaryForeground} />
          </View>
          <Text style={styles.title}>Rede Social{'\n'}Acadêmica</Text>
          <Text style={styles.subtitle}>Conecte-se com estudantes e professores</Text>
        </View>

      
        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.toggleButtonInactive}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.toggleTextInactive}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
            // handleChange atualiza só o campo 'nome'
            autoCapitalize="words"
            // words: capitaliza cada palavra do nome
          />

          {/* Campo Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email institucional"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            // none: não capitaliza email
          />

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.senha}
            onChangeText={(text) => handleChange('senha', text)}
            secureTextEntry
            // secureTextEntry: esconde o texto da senha
          />

          {/* Campo Curso */}
          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu curso (ex: Sistema de Informação)"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.curso}
            onChangeText={(text) => handleChange('curso', text)}
            autoCapitalize="words"
          />

          {/* Campo Bio */}
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.inputBio}
            placeholder="Fale um pouco sobre você e seus interesses acadêmicos..."
            placeholderTextColor={Colors.mutedForeground}
            value={formData.bio}
            onChangeText={(text) => handleChange('bio', text)}
            multiline
            // multiline: permite múltiplas linhas
            numberOfLines={4}
            textAlignVertical="top"

          />

          {/* Botão Criar conta */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(app)/(tabs)/feed')}
          >
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}