import { ScrollView, View } from "react-native";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Avatar } from "../components/Avatar";
import { ExperienceCard } from "../components/cardExperiencia";
import { NotificationItem } from "../components/notificacao";

export default function TestComponents() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 20, gap: 20 }}
    >
      {/* BUTTON */}
      <Button title="Testar botão" onPress={() => console.log("clicou")} />

      {/* INPUT */}
      <Input placeholder="Digite algo" value="" onChangeText={() => {}} />

      {/* AVATAR */}
      <Avatar initials="LR" size={70} />

      {/* EXPERIENCE CARD */}
      <ExperienceCard
        title="Projeto Mobile"
        company="Unifacisa"
        period="2025"
        description="Aplicativo desenvolvido em React Native."
      />
      <NotificationItem
        initials="LR"
        message="Novo comentário no seu post"
        time="há 5 min"
        isNew={true}
      />
    </ScrollView>
  );
}
