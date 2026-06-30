import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Colors from "../../../constants/Colors";
import styles from "../styles/buscaStyles";
import {
  buscarConteudos,
  SearchResult,
  ResultType,
} from "../../../services/buscaService";

export default function BuscaScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

    return () => clearTimeout(delayBusca);
  }, [searchQuery]);

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
      router.push({
        pathname: "/grupos",
        params: { grupoId: result.id },
      });
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
              {!searchQuery ? (
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
              ) : results.length === 0 ? (
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
                    Tente buscar por outro termo.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.resultsCount}>
                    {results.length}{" "}
                    {results.length === 1 ? "resultado" : "resultados"}
                  </Text>

                  {results.map((result: SearchResult) => (
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

                        {(result.course || result.semester) && (
                          <View style={styles.resultTags}>
                            {result.course && (
                              <Text style={styles.resultTag}>
                                {result.course}
                              </Text>
                            )}

                            {result.semester && (
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