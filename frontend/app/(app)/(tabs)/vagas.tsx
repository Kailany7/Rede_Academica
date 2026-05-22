import React, { useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  postedAt: string
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Estágio Front-end',
    company: 'Tech Solutions',
    location: 'São Paulo - SP',
    type: 'Híbrido',
    salary: 'R$ 1.800',
    description:
      'Atuar com React, TypeScript e desenvolvimento de interfaces.',
    postedAt: 'Há 2 dias'
  },

  {
    id: '2',
    title: 'Estágio Back-end',
    company: 'DataCorp',
    location: 'Remoto',
    type: 'Remoto',
    salary: 'R$ 2.000',
    description:
      'Desenvolvimento de APIs Node.js e bancos de dados.',
    postedAt: 'Há 4 dias'
  },

  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    location: 'João Pessoa - PB',
    type: 'Presencial',
    salary: 'R$ 1.500',
    description:
      'Criação de interfaces e experiências digitais modernas.',
    postedAt: 'Há 1 semana'
  }
]

export default function VagasScreen() {

  const [search, setSearch] = useState('')

  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null)

  const filteredJobs = MOCK_JOBS.filter((job) =>
    job.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // TELA DETALHES

  if (selectedJob) {

    return (

      <SafeAreaView style={styles.container}>

        <ScrollView
          contentContainerStyle={styles.detailsContainer}
        >

          <TouchableOpacity
            onPress={() => setSelectedJob(null)}
            style={styles.backButton}
          >

            <Ionicons
              name="arrow-back"
              size={22}
              color="#0A4174"
            />

            <Text style={styles.backText}>
              Voltar
            </Text>

          </TouchableOpacity>

          <View style={styles.detailsCard}>

            <Text style={styles.jobTitle}>
              {selectedJob.title}
            </Text>

            <Text style={styles.company}>
              {selectedJob.company}
            </Text>

            <View style={styles.infoRow}>

              <Ionicons
                name="location-outline"
                size={16}
                color="#666"
              />

              <Text style={styles.infoText}>
                {selectedJob.location}
              </Text>

            </View>

            <View style={styles.infoRow}>

              <Ionicons
                name="briefcase-outline"
                size={16}
                color="#666"
              />

              <Text style={styles.infoText}>
                {selectedJob.type}
              </Text>

            </View>

            <View style={styles.infoRow}>

              <Ionicons
                name="cash-outline"
                size={16}
                color="#666"
              />

              <Text style={styles.infoText}>
                {selectedJob.salary}
              </Text>

            </View>

            <Text style={styles.sectionTitle}>
              Descrição
            </Text>

            <Text style={styles.description}>
              {selectedJob.description}
            </Text>

            <TouchableOpacity style={styles.applyButton}>

              <Text style={styles.applyButtonText}>
                Candidatar-se
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </SafeAreaView>
    )
  }

  // LISTA DE VAGAS

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={20}
          color="#777"
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar vagas..."
          style={styles.input}
        />

      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setSelectedJob(item)}
          >

            <Text style={styles.jobTitle}>
              {item.title}
            </Text>

            <Text style={styles.company}>
              {item.company}
            </Text>

            <Text style={styles.meta}>
              {item.location}
            </Text>

            <Text style={styles.meta}>
              {item.type}
            </Text>

            <Text style={styles.salary}>
              {item.salary}
            </Text>

            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>

            <View style={styles.footer}>

              <Text style={styles.postedAt}>
                {item.postedAt}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#0A4174"
              />

            </View>

          </TouchableOpacity>

        )}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EBF3FA'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 14,
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10
  },

  input: {
    flex: 1,
    height: 48
  },

  list: {
    paddingHorizontal: 14,
    paddingBottom: 30
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B3A5C',
    marginBottom: 4
  },

  company: {
    fontSize: 14,
    color: '#4E8EA2',
    marginBottom: 10
  },

  meta: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4
  },

  salary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0A4174',
    marginTop: 10,
    marginBottom: 10
  },

  description: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20
  },

  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  postedAt: {
    fontSize: 12,
    color: '#888'
  },

  detailsContainer: {
    padding: 16
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20
  },

  backText: {
    color: '#0A4174',
    fontWeight: '600'
  },

  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10
  },

  infoText: {
    color: '#444'
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 15,
    color: '#1B3A5C'
  },

  applyButton: {
    backgroundColor: '#0A4174',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },

  applyButtonText: {
    color: '#FFF',
    fontWeight: '700'
  }

})