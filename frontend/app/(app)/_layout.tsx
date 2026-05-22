import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="editar-perfil"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Editar Perfil",
          headerTintColor: "#1B4F8A",
          headerStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </Stack>
  );
}
