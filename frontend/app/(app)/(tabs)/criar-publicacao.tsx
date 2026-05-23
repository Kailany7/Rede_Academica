// Importa hook de estado do React
import { useState } from 'react'

// Importa componentes do React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'

// Importa ícones do Expo
import { Ionicons } from '@expo/vector-icons'

// Importa navegação do Expo Router
import { router } from 'expo-router'

// Importa estilos
import styles from '../styles/criarPublicacaoStyles'


import { usePosts } from '../../../contexts/postContext'

// Interface das propriedades do componente
interface CriarPublicacaoProps {

  // Função responsável por criar publicação
  onCreatePost?: (content: string) => void

  // Dados do usuário atual
  currentUser?: {
    name?: string
    course?: string
    avatar?: string
  }
}

// Componente principal
export default function CriarPublicacao({

  onCreatePost,
  currentUser

}: CriarPublicacaoProps) {

  // Estado que armazena conteúdo digitado
  const [content, setContent] = useState('')
  const { addPost } = usePosts()
  // Função responsável por publicar
  const handleSubmit = () => {

    // Verifica se existe conteúdo
    if (content.trim()) {

      // Executa função somente se existir
      addPost(content)
      // Limpa campo
      setContent('')

      // Navega para tela feed
      router.push('/feed')
    }
  }

  return (

    // Evita teclado sobrepor conteúdo
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* Área rolável */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Container principal */}
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>

            {/* Ícone */}
            <View style={styles.iconContainer}>

              <Ionicons
                name="create-outline"
                size={34}
                color="white"
              />

            </View>

            {/* Título */}
            <Text style={styles.title}>
              Nova Publicação
            </Text>

            {/* Subtítulo */}
            <Text style={styles.subtitle}>
              Compartilhe ideias, dúvidas e experiências com seus colegas
            </Text>

          </View>

          {/* Card principal */}
          <View style={styles.card}>

            {/* Área superior do usuário */}
            <View style={styles.userContainer}>

              {/* Avatar */}
              <View style={styles.avatar}>

                {/* Iniciais do usuário */}
                <Text style={styles.avatarText}>
                  {
                    currentUser?.name
                      ?.split(' ')
                      ?.map((n) => n[0])
                      ?.join('')
                      ?.slice(0, 2) || 'U'
                  }
                </Text>

              </View>

              {/* Informações do usuário */}
              <View style={styles.userInfo}>

                {/* Nome */}
                <Text style={styles.userName}>
                  {currentUser?.name || 'Usuário'}
                </Text>

                {/* Curso */}
                <Text style={styles.userCourse}>
                  {currentUser?.course || 'Curso'}
                </Text>

              </View>
            </View>

            {/* Formulário */}
            <View style={styles.form}>

              {/* Label */}
              <Text style={styles.label}>
                Sua publicação
              </Text>

              {/* Campo de texto */}
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="No que você está pensando?"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                style={styles.textArea}
              />

              {/* Área do botão */}
              <View style={styles.buttonContainer}>

                {/* Botão publicar */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!content.trim()}
                  style={[
                    styles.button,
                    !content.trim() && styles.buttonDisabled
                  ]}
                >

                  {/* Ícone */}
                  <Ionicons
                    name="send"
                    size={18}
                    color="white"
                  />

                  {/* Texto botão */}
                  <Text style={styles.buttonText}>
                    Publicar
                  </Text>

                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}