import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { PostsProvider } from "../contexts/postContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Não logado e tentando acessar tela protegida → vai pro login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Já logado e está na tela de login/cadastro → vai pro feed
      router.replace("/(app)/(tabs)/feed");
    }
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostsProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>
        </AuthGuard>
      </PostsProvider>
    </AuthProvider>
  );
}
