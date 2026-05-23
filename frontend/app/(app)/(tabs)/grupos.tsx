import { useState } from 'react'
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
import Colors from '../../../constants/Colors'
import styles from '../styles/gruposStyles'




interface Grupo {
  id: string
  nome: string
  descricao: string
  membros: number
  cor: string
  ultimaAtividade: string
}

interface FormGrupo {
  nome: string
  descricao: string
}


const GRUPOS_MOCK: Grupo[] = [
  {
    id: '1',
    nome: 'Algoritmos 2024',
    descricao: 'Grupo de estudos de Algoritmos',
    membros: 24,
    cor: Colors.primary,
    ultimaAtividade: 'Há 10 min'
  },
  {
    id: '2',
    nome: 'Monitoria de Cálculo',
    descricao: 'Dúvidas e exercícios de Cálculo I e II',
    membros: 45,
    cor: Colors.accent,
    ultimaAtividade: 'Há 1 hora'
  },
  {
    id: '3',
    nome: 'Projeto TCC 2024',
    descricao: 'Compartilhamento de ideias para TCC',
    membros: 12,
    cor: Colors.secondary,
    ultimaAtividade: 'Há 3 horas'
  },
  {
    id: '4',
    nome: 'Banco de Dados',
    descricao: 'SQL, NoSQL e otimização',
    membros: 38,
    cor: Colors.primary,
    ultimaAtividade: 'Há 5 horas'
  },
]



export default function GruposScreen() {

  const [busca, setBusca] = useState<string>('')
  const [modalAberto, setModalAberto] = useState<boolean>(false)
  const [formGrupo, setFormGrupo] = useState<FormGrupo>({
    nome: '',
    descricao: '',
  })

  // filtra grupos em tempo real conforme o usuário digita
  const gruposFiltrados: Grupo[] = GRUPOS_MOCK.filter((grupo: Grupo) =>
    grupo.nome.toLowerCase().includes(busca.toLowerCase()) ||
    grupo.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  // atualiza campo específico do formulário
  const handleChange = (campo: keyof FormGrupo, valor: string): void => {
    setFormGrupo(prev => ({ ...prev, [campo]: valor }))
  }

  // TODO: conectar com API na fase 2
  const handleCriarGrupo = (): void => {
    if (formGrupo.nome.trim() && formGrupo.descricao.trim()) {
      setFormGrupo({ nome: '', descricao: '' })
      setModalAberto(false)
    }
  }

  return (
    <View style={styles.container}>

     

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>

          {/* Título e botão de criar grupo */}
          <View style={styles.topRow}>
            <Text style={styles.titulo}>Grupos</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalAberto(true)}
            >
              <Ionicons name="add" size={22} color={Colors.primaryForeground} />
            </TouchableOpacity>
          </View>

          {/* Campo de busca */}
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
            {/* botão X — só aparece quando tem texto digitado */}
            {busca !== '' && (
              <TouchableOpacity onPress={() => setBusca('')}>
                <Ionicons name="close" size={20} color={Colors.mutedForeground} />
              </TouchableOpacity>
            )}
          </View>

          {/* Estado vazio ou lista de grupos */}
          {gruposFiltrados.length === 0 ? (

            // nenhum grupo encontrado
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="people-outline" size={40} color={Colors.mutedForeground} />
              </View>
              <Text style={styles.emptyTitle}>Nenhum grupo encontrado</Text>
              <Text style={styles.emptySubtitle}>Tente buscar por outro termo</Text>
            </View>

          ) : (

            // lista de grupos
            gruposFiltrados.map((grupo: Grupo) => (
              <View key={grupo.id} style={styles.grupoCard}>

                {/* avatar colorido com ícone */}
                <View style={[styles.grupoAvatar, { backgroundColor: grupo.cor }]}>
                  <Ionicons name="people" size={24} color={Colors.primaryForeground} />
                </View>

                {/* informações do grupo */}
                <View style={styles.grupoInfo}>
                  <Text style={styles.grupoNome}>{grupo.nome}</Text>
                  <Text style={styles.grupoDescricao}>{grupo.descricao}</Text>
                  <View style={styles.grupoMeta}>
                    <Text style={styles.grupoMetaText}>{grupo.membros} membros</Text>
                    <Text style={styles.grupoMetaText}>•</Text>
                    <Text style={styles.grupoMetaText}>{grupo.ultimaAtividade}</Text>
                  </View>
                </View>

                {/* TODO: implementar lógica de entrar no grupo na fase 2 */}
                <TouchableOpacity style={styles.entrarButton}>
                  <Text style={styles.entrarButtonText}>Entrar</Text>
                </TouchableOpacity>

              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de criar grupo — sobe de baixo para cima */}
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
          {/* fundo escuro — fecha o modal ao clicar */}
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

            {/* botão criar */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleCriarGrupo}
            >
              <Text style={styles.buttonText}>Criar Grupo</Text>
            </TouchableOpacity>

            {/* botão cancelar */}
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