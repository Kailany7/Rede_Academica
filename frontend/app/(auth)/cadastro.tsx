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

export default function CadastroScreen() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    curso: '',
    bio: ''
  })

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContent}>

        {/* Topo azul com ícone e título */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="school" size={wp('10%')} color={Colors.primaryForeground} />
          </View>
          <Text style={styles.title}>Rede Social{'\n'}Acadêmica</Text>
          <Text style={styles.subtitle}>Conecte-se com estudantes e professores</Text>
        </View>

        {/* Card branco com formulário */}
        <View style={styles.card}>

          {/* Toggle Login / Cadastro */}
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
            onChangeText={(text) => setFormData({ ...formData, nome: text })}
          />

          {/* Campo Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email institucional"
            placeholderTextColor={Colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.mutedForeground}
            secureTextEntry
            value={formData.senha}
            onChangeText={(text) => setFormData({ ...formData, senha: text })}
          />

          {/* Campo Curso */}
          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu curso (ex: Sistema de Informação)"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.curso}
            onChangeText={(text) => setFormData({ ...formData, curso: text })}
          />

          {/* Campo Bio */}
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.inputBio}
            placeholder="Fale um pouco sobre você e seus interesses acadêmicos..."
            placeholderTextColor={Colors.mutedForeground}
            multiline
            numberOfLines={4}
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
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