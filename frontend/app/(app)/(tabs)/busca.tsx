import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Header from '../../../components/Header'
import Colors from '../../../constants/Colors'
import styles from './buscaStyles'

const usuarios = [
  {
    id: '1',
    nome: 'Maria Santos',
    descricao: 'Monitora de Algoritmos',
  },
  {
    id: '2',
    nome: 'Lara Rafaelly',
    descricao: 'Desenvolvedora Full Stack',
  },
]

export default function BuscaScreen() {

  const [busca, setBusca] = useState('')

  // filtrar usuários pelo nome
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <View style={styles.container}>

      <Header />

      <ScrollView style={styles.content}>

        {/* campo de busca */}
        <View style={styles.searchContainer}>

          <Ionicons
            name="search"
            size={20}
            color={Colors.mutedForeground}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuário..."
            value={busca}
            onChangeText={setBusca}
          />

        </View>

        {/* mensagem inicial */}
        {busca === '' ? (

          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Digite algo para buscar
            </Text>
          </View>

        ) : usuariosFiltrados.length === 0 ? (

          // nenhum resultado
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Nenhum usuário encontrado
            </Text>
          </View>

        ) : (

          // lista de resultados
          <View>

            {usuariosFiltrados.map((usuario) => (

              <TouchableOpacity
                key={usuario.id}
                style={styles.resultCard}
              >

                <View style={styles.resultAvatar}>
                  <Ionicons
                    name="person"
                    size={24}
                    color={Colors.primaryForeground}
                  />
                </View>

                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>
                    {usuario.nome}
                  </Text>

                  <Text style={styles.resultSubtitle}>
                    {usuario.descricao}
                  </Text>
                </View>

              </TouchableOpacity>

            ))}

          </View>

        )}

      </ScrollView>

    </View>
  )
}