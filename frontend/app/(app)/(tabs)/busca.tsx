import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import Colors from "../../../constants/Colors";
import styles from "../styles/buscaStyles";

type ResultType = "user" | "post" | "group";

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  avatarColor: string;
  course?: string;
  semester?: string;
}

const allResults: SearchResult[] = [
  {
    id: "1",
    type: "user",
    title: "Maria Santos",
    subtitle: "Monitora de Algoritmos",
    avatarColor: Colors.primary,
    course: "Engenharia de Software",
    semester: "5º Semestre",
  },
  {
    id: "2",
    type: "user",
    title: "Pedro Lima",
    subtitle: "Desenvolvedor Full Stack",
    avatarColor: Colors.accent,
    course: "Ciência da Computação",
    semester: "6º Semestre",
  },
  {
    id: "3",
    type: "post",
    title: "Dicas de Python para iniciantes",
    subtitle: "Por Ana Paula • Há 2 horas",
    avatarColor: Colors.secondary,
    course: "Ciência da Computação",
    semester: "3º Semestre",
  },
  {
    id: "4",
    type: "group",
    title: "Algoritmos 2024",
    subtitle: "24 membros",
    avatarColor: Colors.primary,
    course: "Todos os cursos",
    semester: "Todos os semestres",
  },
];

const courses: string[] = [
  "Todos os cursos",
  "Ciência da Computação",
  "Engenharia de Software",
  "Sistemas de Informação",
  "Análise e Desenvolvimento de Sistemas",
];

const semesters: string[] = [
  "Todos os semestres",
  "1º Semestre",
  "2º Semestre",
  "3º Semestre",
  "4º Semestre",
  "5º Semestre",
  "6º Semestre",
  "7º Semestre",
  "8º Semestre",
];

export default function BuscaScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] =
    useState<string>("Todos os cursos");
  const [selectedSemester, setSelectedSemester] =
    useState<string>("Todos os semestres");

  const hasActiveFilters: boolean =
    selectedCourse !== "Todos os cursos" ||
    selectedSemester !== "Todos os semestres";

  const filteredResults: SearchResult[] = allResults.filter(
    (result: SearchResult) => {
      const matchesSearch =
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse =
        selectedCourse === "Todos os cursos" ||
        result.course === selectedCourse;

      const matchesSemester =
        selectedSemester === "Todos os semestres" ||
        result.semester === selectedSemester;

      return matchesSearch && matchesCourse && matchesSemester;
    },
  );

  // Limpa todos os filtros
  const clearFilters = (): void => {
    setSelectedCourse("Todos os cursos");
    setSelectedSemester("Todos os semestres");
    setShowFilters(false);
  };

  // Retorna o ícone baseado no tipo
  const getIcon = (type: ResultType): string => {
    switch (type) {
      case "user":
        return "person";
      case "post":
        return "document-text";
      case "group":
        return "people";
    }
  };

  // Retorna o label baseado no tipo
  const getTypeLabel = (type: ResultType): string => {
    switch (type) {
      case "user":
        return "Pessoa";
      case "post":
        return "Publicação";
      case "group":
        return "Grupo";
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <View style={styles.innerContent}>
          {/* Campo de busca */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.mutedForeground} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar pessoas, posts, grupos..."
              placeholderTextColor={Colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {/* botão X só aparece quando tem texto digitado */}
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close"
                  size={20}
                  color={Colors.mutedForeground}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Botões de filtro */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                (showFilters || hasActiveFilters) && styles.filterButtonActive,
              ]}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Ionicons
                name="options"
                size={16}
                color={
                  showFilters || hasActiveFilters
                    ? Colors.primaryForeground
                    : Colors.cardForeground
                }
              />
              <Text
                style={[
                  styles.filterButtonText,
                  (showFilters || hasActiveFilters) &&
                    styles.filterButtonTextActive,
                ]}
              >
                Filtros
              </Text>
            </TouchableOpacity>

            {hasActiveFilters && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Painel de filtros — só aparece quando showFilters é true */}
          {showFilters && (
            <View style={styles.filtersCard}>
              {/* Filtro de curso */}
              <Text style={styles.filterLabel}>Curso</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: wp("2%") }}>
                  {courses.map((course: string) => (
                    <TouchableOpacity
                      key={course}
                      style={[
                        styles.filterButton,
                        selectedCourse === course && styles.filterButtonActive,
                      ]}
                      onPress={() => setSelectedCourse(course)}
                    >
                      <Text
                        style={[
                          styles.filterButtonText,
                          selectedCourse === course &&
                            styles.filterButtonTextActive,
                        ]}
                      >
                        {course}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Filtro de semestre */}
              <Text style={[styles.filterLabel, { marginTop: wp("4%") }]}>
                Semestre
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: wp("2%") }}>
                  {semesters.map((semester: string) => (
                    <TouchableOpacity
                      key={semester}
                      style={[
                        styles.filterButton,
                        selectedSemester === semester &&
                          styles.filterButtonActive,
                      ]}
                      onPress={() => setSelectedSemester(semester)}
                    >
                      <Text
                        style={[
                          styles.filterButtonText,
                          selectedSemester === semester &&
                            styles.filterButtonTextActive,
                        ]}
                      >
                        {semester}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Conteúdo condicional — 3 situações */}
          {!searchQuery && !hasActiveFilters ? (
            // SITUAÇÃO 1 — nenhuma busca feita ainda
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="search"
                  size={40}
                  color={Colors.mutedForeground}
                />
              </View>
              <Text style={styles.emptyTitle}>Busque o que precisa</Text>
              <Text style={styles.emptySubtitle}>
                Encontre pessoas, publicações e grupos
              </Text>
            </View>
          ) : filteredResults.length === 0 ? (
            // SITUAÇÃO 2 — buscou mas não encontrou
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="search"
                  size={40}
                  color={Colors.mutedForeground}
                />
              </View>
              <Text style={styles.emptyTitle}>Nenhum resultado</Text>
              <Text style={styles.emptySubtitle}>
                Tente buscar por outro termo ou ajuste os filtros
              </Text>
            </View>
          ) : (
            // SITUAÇÃO 3 — encontrou resultados
            <View>
              <Text style={styles.resultsCount}>
                {filteredResults.length}{" "}
                {filteredResults.length === 1 ? "resultado" : "resultados"}
              </Text>

              {filteredResults.map((result: SearchResult) => (
                <TouchableOpacity key={result.id} style={styles.resultCard}>
                  {/* Avatar com cor e ícone do tipo */}
                  <View
                    style={[
                      styles.resultAvatar,
                      { backgroundColor: result.avatarColor },
                    ]}
                  >
                    <Ionicons
                      name={getIcon(result.type) as any}
                      size={24}
                      color={Colors.primaryForeground}
                    />
                  </View>

                  {/* Informações */}
                  <View style={styles.resultInfo}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <Text style={styles.resultBadge}>
                        {getTypeLabel(result.type)}
                      </Text>
                    </View>
                    <Text style={styles.resultSubtitle}>{result.subtitle}</Text>

                    {/* Tags de curso e semestre */}
                    {result.course && result.semester && (
                      <View style={styles.resultTags}>
                        <Text style={styles.resultTag}>{result.course}</Text>
                        {result.semester !== "Todos os semestres" && (
                          <Text style={styles.resultTag}>
                            {result.semester}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
