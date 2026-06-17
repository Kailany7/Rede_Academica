import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import Colors from '../../constants/Colors'
import styles from './styles/gruposStyles'
import { listarGrupos, criarGrupo, Grupo } from '../../services/grupoService'

interface FormGrupo {
  nome: string
  descricao: string
}

export default function GruposScreen() {
  const router = useRouter()

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [busca, setBusca] = useState<string>('')
  const [modalAberto, setModalAberto] = useState<boolean>(false)

  const [formGrupo, setFormGrupo] = useState<FormGrupo>({
    nome: '',
    descricao: '',
  })

  // Carrega os grupos cadastrados no banco quando a tela abre
  const carregarGrupos = async (): Promise<void> => {
    try {
      const dados = await listarGrupos()
      setGrupos(dados)
    } catch (error) {
      console.log('Erro ao carregar grupos:', error)
    }
  }

  // Executa a função carregarGrupos quando a tela é aberta
  useEffect(() => {
    carregarGrupos()
  }, [])

  // Filtra os grupos conforme o texto digitado na busca
  const gruposFiltrados: Grupo[] = grupos.filter((grupo: Grupo) =>
    grupo.nome.toLowerCase().includes(busca.toLowerCase()) ||
    grupo.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  // Atualiza os campos do formulário
  const handleChange = (campo: keyof FormGrupo, valor: string): void => {
    setFormGrupo(prev => ({ ...prev, [campo]: valor }))
  }

  // Cria um novo grupo no backend
  const handleCriarGrupo = async (): Promise<void> => {
    try {
      if (!formGrupo.nome.trim() || !formGrupo.descricao.trim()) {
        return
      }

      await criarGrupo({
        nome: formGrupo.nome,
        descricao: formGrupo.descricao,
      })

      setFormGrupo({ nome: '', descricao: '' })
      setModalAberto(false)

      // Atualiza a lista depois de criar
      await carregarGrupos()
    } catch (error) {
      console.log('Erro ao criar grupo:', error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.cardForeground}
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Grupos</Text>
          </View>

          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalAberto(true)}
            >
              <Ionicons name="add" size={22} color={Colors.primaryForeground} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.mutedForeground} />

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar grupos..."
              placeholderTextColor={Colors.mutedForeground}
              value={busca}
              onChangeText={setBusca}
              autoCapitalize="none"
            />

            {busca !== '' && (
              <TouchableOpacity onPress={() => setBusca('')}>
                <Ionicons name="close" size={20} color={Colors.mutedForeground} />
              </TouchableOpacity>
            )}
          </View>

          {gruposFiltrados.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="people-outline"
                  size={40}
                  color={Colors.mutedForeground}
                />
              </View>

              <Text style={styles.emptyTitle}>Nenhum grupo encontrado</Text>
              <Text style={styles.emptySubtitle}>Tente buscar por outro termo</Text>
            </View>
          ) : (
            gruposFiltrados.map((grupo: Grupo) => (
              <View key={grupo._id} style={styles.grupoCard}>
                <View style={[styles.grupoAvatar, { backgroundColor: Colors.primary }]}>
                  <Ionicons
                    name="people"
                    size={24}
                    color={Colors.primaryForeground}
                  />
                </View>

                <View style={styles.grupoInfo}>
                  <Text style={styles.grupoNome}>{grupo.nome}</Text>
                  <Text style={styles.grupoDescricao}>{grupo.descricao}</Text>

                  <View style={styles.grupoMeta}>
                    <Text style={styles.grupoMetaText}>
                      {grupo.membros.length} membros
                    </Text>

                    <Text style={styles.grupoMetaText}>•</Text>

                    <Text style={styles.grupoMetaText}>
                      Criado recentemente
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.entrarButton}>
                  <Text style={styles.entrarButtonText}>Entrar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={modalAberto}
        transparent
        animationType="slide"
        onRequestClose={() => setModalAberto(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setModalAberto(false)}
          />

          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Novo Grupo</Text>

            <Text style={styles.label}>Nome do Grupo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Estudos de React"
              placeholderTextColor={Colors.mutedForeground}
              value={formGrupo.nome}
              onChangeText={(text) => handleChange('nome', text)}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.inputBio}
              placeholder="Descreva o propósito do grupo..."
              placeholderTextColor={Colors.mutedForeground}
              value={formGrupo.descricao}
              onChangeText={(text) => handleChange('descricao', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCriarGrupo}
            >
              <Text style={styles.buttonText}>Criar Grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => setModalAberto(false)}
            >
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}