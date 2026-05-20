import { Redirect } from "expo-router";

// Redireciona a raiz para o fluxo de autenticação.
// Se já estiver logado, o layout de auth cuida do redirecionamento para o feed.
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
