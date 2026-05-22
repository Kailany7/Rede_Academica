import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";

// ─── Simulação de estado de autenticação ──────────────────────────────────────
// Quando o back-end estiver pronto, substitua este hook pela lógica real
// (ex: checar token no AsyncStorage ou contexto global).

function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simula checar token salvo
    const checkAuth = async () => {
      await new Promise((res) => setTimeout(res, 500));
      setIsAuthenticated(false); // troque para true para pular login
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return { isLoading, isAuthenticated };
}

// ─── Guard de rotas ───────────────────────────────────────────────────────────

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    //  if (!isAuthenticated && !inAuthGroup) {
    // router.replace("/(auth)/login");
    //} else if (isAuthenticated && inAuthGroup) {
    //router.replace("/(app)/(tabs)/feed");
    // }
  }, [isLoading, isAuthenticated, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EBF3FA",
        }}
      >
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  return <>{children}</>;
}

// ─── Layout raiz ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthGuard>
  );
}
