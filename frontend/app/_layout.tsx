import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { PostsProvider } from "../contexts/postContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const {
    isLoading,
    isAuthenticated,
    usuario
  } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    if (isLoading) return;


    const inAuthGroup = segments[0] === "(auth)";


    if (!isAuthenticated && !inAuthGroup) {

      router.replace("/(auth)/login");

      return;
    }



    if (
      isAuthenticated &&
      usuario &&
      usuario.onboardingCompleto === false &&
      !segments.includes("onboarding")
    ) {

      router.replace("/(auth)/onboarding");

      return;
    }



    if (
      isAuthenticated &&
      inAuthGroup &&
      usuario?.onboardingCompleto
    ) {

      router.replace("/(app)/(tabs)/feed");

    }


  }, [
    isLoading,
    isAuthenticated,
    usuario,
    segments
  ]);

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
