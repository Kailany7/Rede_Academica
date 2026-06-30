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
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Colors from '../../constants/Colors'
import styles from './styles/gruposStyles'
import { listarGrupos, criarGrupo, Grupo } from '../../services/grupoService'

interface FormGrupo {
  nome: string
  descricao: string
}

export default function GruposScreen() {
  const router = useRouter()
  const { grupoId } = useLocalSearchParams()

  const grupoIdParam = Array.isArray(grupoId) ? grupoId[0] : grupoId

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [busca, setBusca] = useState<string>('')
  const [modalAberto, setModalAberto] = useState<boolean>(false)
  const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null)
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState<boolean>(false)

  const [formGrupo, setFormGrupo] = useState<FormGrupo>({
    nome: '',
    descricao: '',
  })

  const carregarGrupos = async (): Promise<void> => {
    try {
      const dados = await listarGrupos()
      setGrupos(dados)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os grupos.')
    }
  }

  useEffect(() => {
    carregarGrupos()
  }, [])

  useEffect(() => {
    if (grupoIdParam && grupos.length > 0) {
      const grupoEncontrado = grupos.find(
        (grupo) => grupo._id === grupoIdParam
      )

      if (grupoEncontrado) {
        setGrupoSelecionado(grupoEncontrado)
        setModalDetalhesAberto(true)
      }
    }
  }, [grupoIdParam, grupos])

  const gruposFiltrados: Grupo[] = grupos.filter((grupo: Grupo) =>
    grupo.nome.toLowerCase().includes(busca.toLowerCase()) ||
    grupo.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  const handleChange = (campo: keyof FormGrupo, valor: string): void => {
    setFormGrupo((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleCriarGrupo = async (): Promise<void> => {
    try {
      if (!formGrupo.nome.trim() || !formGrupo.descricao.trim()) {
        Alert.alert('Atenção', 'Preencha nome e descrição do grupo.')
        return
      }

      await criarGrupo({
        nome: formGrupo.nome,
        descricao: formGrupo.descricao,
      })

      setFormGrupo({ nome: '', descricao: '' })
      setModalAberto(false)

      await carregarGrupos()
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar o grupo.')
    }
  }

  const handleEntrarGrupo = (): void => {
    Alert.alert(
      'Funcionalidade em breve',
      'A entrada em grupos será ativada quando o login de usuário estiver pronto.'
    )
  }

  const abrirDetalhesGrupo = (grupo: Grupo): void => {
    setGrupoSelecionado(grupo)
    setModalDetalhesAberto(true)
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
              <TouchableOpacity
                key={grupo._id}
                style={styles.grupoCard}
                onPress={() => abrirDetalhesGrupo(grupo)}
              >
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

                <TouchableOpacity
                  style={styles.entrarButton}
                  onPress={handleEntrarGrupo}
                >
                  <Text style={styles.entrarButtonText}>Entrar</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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

      <Modal
        visible={modalDetalhesAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setModalDetalhesAberto(false)}
      >
        <View style={styles.modalCentralOverlay}>
          <View style={styles.modalCentralCard}>
            <View style={styles.grupoHeaderModal}>
              <View style={styles.grupoAvatarGrande}>
                <Ionicons
                  name="people"
                  size={28}
                  color={Colors.primaryForeground}
                />
              </View>

              <View style={styles.grupoHeaderInfo}>
                <Text style={styles.modalGrupoTitulo}>
                  {grupoSelecionado?.nome}
                </Text>

                <Text style={styles.grupoMetaText}>
                  {grupoSelecionado?.membros.length ?? 0} membros
                </Text>
              </View>
            </View>

            <Text style={styles.modalGrupoDescricao}>
              {grupoSelecionado?.descricao}
            </Text>

            <View style={styles.conversaBox}>
              <Text style={styles.conversaTitulo}>Prévia da conversa</Text>

              <View style={styles.mensagemItem}>
                <Text style={styles.mensagemAutor}>Ana</Text>
                <Text style={styles.mensagemTexto}>
                  Alguém tem material sobre esse assunto?
                </Text>
              </View>

              <View style={styles.mensagemItem}>
                <Text style={styles.mensagemAutor}>João</Text>
                <Text style={styles.mensagemTexto}>
                  Tenho um resumo, posso enviar aqui.
                </Text>
              </View>

              <View style={styles.mensagemItem}>
                <Text style={styles.mensagemAutor}>Maria</Text>
                <Text style={styles.mensagemTexto}>
                  Vamos marcar um horário para estudar juntos?
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleEntrarGrupo}
            >
              <Text style={styles.buttonText}>Entrar no Grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => setModalDetalhesAberto(false)}
            >
              <Text style={styles.buttonCancelText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}