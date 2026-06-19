import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Colors from "../../../constants/Colors";
import styles from "../styles/buscaStyles";
import {
  buscarConteudos,
  SearchResult,
  ResultType,
} from "../../../services/buscaService";

// TODO: conectar filtros reais ao backend quando Usuario e Publicacao existirem
const courses: string[] = [
  "Todos os cursos",
  "Sistemas de Informação",
  "Enfermagem",
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
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] =
    useState<string>("Todos os cursos");
  const [selectedSemester, setSelectedSemester] =
    useState<string>("Todos os semestres");

  // Guarda os resultados vindos do backend
  const [results, setResults] = useState<SearchResult[]>([]);

  // Controla carregamento e erro
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const hasActiveFilters: boolean =
    selectedCourse !== "Todos os cursos" ||
    selectedSemester !== "Todos os semestres";

  /*
    Delay na busca:
    espera 500ms depois que o usuário para de digitar
    antes de chamar o backend.
  */
  useEffect(() => {
    const delayBusca = setTimeout(async () => {
      try {
        if (!searchQuery.trim()) {
          setResults([]);
          setErrorMessage("");
          return;
        }

        setLoading(true);
        setErrorMessage("");

        const dados = await buscarConteudos(searchQuery);
        setResults(dados);
      } catch (error) {
        setResults([]);
        setErrorMessage("Não foi possível carregar os resultados.");
      } finally {
        setLoading(false);
      }
    }, 500);

    // Cancela a busca anterior se o usuário continuar digitando
    return () => clearTimeout(delayBusca);
  }, [searchQuery]);

  const filteredResults: SearchResult[] = results.filter(
    (result: SearchResult) => {
      const matchesCourse =
        selectedCourse === "Todos os cursos" ||
        result.course === selectedCourse;

      const matchesSemester =
        selectedSemester === "Todos os semestres" ||
        result.semester === selectedSemester;

      return matchesCourse && matchesSemester;
    }
  );

  const clearFilters = (): void => {
    setSelectedCourse("Todos os cursos");
    setSelectedSemester("Todos os semestres");
    setShowFilters(false);
  };

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

  const handleResultPress = (result: SearchResult): void => {
    if (result.type === "group") {
      router.push("/grupos");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.innerContent}>
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

          {showFilters && (
            <View style={styles.filtersCard}>
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

          {loading && (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Carregando...</Text>
              <Text style={styles.emptySubtitle}>Buscando resultados</Text>
            </View>
          )}

          {errorMessage !== "" && !loading && (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Ops!</Text>
              <Text style={styles.emptySubtitle}>{errorMessage}</Text>
            </View>
          )}

          {!loading && errorMessage === "" && (
            <>
              {!searchQuery && !hasActiveFilters ? (
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
                <View>
                  <Text style={styles.resultsCount}>
                    {filteredResults.length}{" "}
                    {filteredResults.length === 1
                      ? "resultado"
                      : "resultados"}
                  </Text>

                  {filteredResults.map((result: SearchResult) => (
                    <TouchableOpacity
                      key={result.id}
                      style={styles.resultCard}
                      onPress={() => handleResultPress(result)}
                    >
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

                      <View style={styles.resultInfo}>
                        <View style={styles.resultHeader}>
                          <Text style={styles.resultTitle}>
                            {result.title}
                          </Text>

                          <Text style={styles.resultBadge}>
                            {getTypeLabel(result.type)}
                          </Text>
                        </View>

                        <Text style={styles.resultSubtitle}>
                          {result.subtitle}
                        </Text>

                        {result.course && result.semester && (
                          <View style={styles.resultTags}>
                            <Text style={styles.resultTag}>
                              {result.course}
                            </Text>

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
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}