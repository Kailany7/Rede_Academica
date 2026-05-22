
import { useState } from 'react'
import {
  View,           
  Text,           
  TextInput,      
  TouchableOpacity, 
  ScrollView,    
  KeyboardAvoidingView, 
  Platform,       
} from 'react-native'
import { Ionicons } from '@expo/vector-icons' 
import { useRouter } from 'expo-router'        
import Colors from '../../constants/Colors'
import styles from './styles/editarPerfilStyles' 

interface FormData {
  nome: string
  curso: string
  semestre: string
  bio: string
}

interface AvatarProps {
  nome: string  // nome do usuário para gerar as iniciais
  cor: string   // cor de fundo do avatar
}

const MOCK_USER: FormData = {
  nome: 'Carla Silva',
  curso: 'Sistemas de Informação',
  semestre: '5º Semestre',
  bio: 'Estudante apaixonada por tecnologia e desenvolvimento mobile',
}
const AVATAR_COLOR: string = Colors.accent

function Avatar({ nome, cor }: AvatarProps) {
  // Gerar iniciais a partir do nome
  const iniciais: string = nome
    .split(' ')           
    .map((p: string) => p[0]) 
    .slice(0, 2)          
    .join('')             
    .toUpperCase()        

  return (
    <View style={[styles.avatar, { backgroundColor: cor }]}>
      <Text style={styles.avatarText}>{iniciais}</Text>
    </View>
  )
}

export default function EditarPerfilScreen() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    nome: MOCK_USER.nome,
    curso: MOCK_USER.curso,
    semestre: MOCK_USER.semestre,
    bio: MOCK_USER.bio,
  })
  
  const [salvando, setSalvando] = useState<boolean>(false)

  const handleChange = (campo: keyof FormData, valor: string): void => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  const handleSalvar = (): void => {
    setSalvando(true)
    setTimeout(() => {
      setSalvando(false)
      router.back() 
    }, 1000)
  }
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.banner}>
          <View style={styles.avatarWrapper}>
            <Avatar nome={formData.nome} cor={AVATAR_COLOR} />
          </View>
        </View>
		
        <View style={styles.card}>

          {/* Botão Salvar */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSalvar}
            disabled={salvando}
          
          >
            <Ionicons
              name={salvando ? 'hourglass-outline' : 'save-outline'}
              size={18}
              color={Colors.primaryForeground}
            />
            <Text style={styles.buttonText}>
              {salvando ? 'Salvando...' : 'Salvar alterações'}
              {/* muda o texto enquanto salva */}
            </Text>
          </TouchableOpacity>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
            placeholder="Digite seu nome completo"
            placeholderTextColor={Colors.mutedForeground}
            autoCapitalize="words"
          />

          {/* Campo Curso */}
          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            value={formData.curso}
            onChangeText={(text) => handleChange('curso', text)}
            placeholder="Digite seu curso"
            placeholderTextColor={Colors.mutedForeground}
            autoCapitalize="words"
          />

          {/* Campo Semestre */}
          <Text style={styles.label}>Semestre</Text>
          <TextInput
            style={styles.input}
            value={formData.semestre}
            onChangeText={(text) => handleChange('semestre', text)}
            placeholder="Ex: 5º Semestre"
            placeholderTextColor={Colors.mutedForeground}
          />

          {/* Campo Bio */}
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.inputBio}
            value={formData.bio}
            onChangeText={(text) => handleChange('bio', text)}
            placeholder="Fale um pouco sobre você..."
            placeholderTextColor={Colors.mutedForeground}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            
          />

          {/* Botão Cancelar */}
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => router.back()}
            // router.back() volta para a tela anterior
          >
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}