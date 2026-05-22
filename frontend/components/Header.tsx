import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '../constants/Colors'

interface HeaderProps {
  temNotificacao?: boolean  // controla se aparece a bolinha vermelha
}

export default function Header({ temNotificacao = false }: HeaderProps) {
  const router = useRouter()

  // controla se o menu está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState<boolean>(false)

  // volta para o login ao clicar em Sair
  const handleSair = (): void => {
    setMenuAberto(false)
    router.replace('/(auth)/login')
  }

  return (
    <View style={styles.container}>

      {/* Logo e título */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoText}>RS</Text>
        </View>
        <View>
          <Text style={styles.title}>Rede Social</Text>
          <Text style={styles.subtitle}>Acadêmica</Text>
        </View>
      </View>

      {/* Ícones do lado direito */}
      <View style={styles.iconsContainer}>

        {/* Notificação com bolinha */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.foreground} />
          {/* bolinha só aparece se temNotificacao for true */}
          {temNotificacao && <View style={styles.notificationDot} />}
        </TouchableOpacity>

        {/* Menu 3 tracinhos */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setMenuAberto(true)}
        >
          <Ionicons name="menu-outline" size={24} color={Colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Menu dropdown */}
      <Modal
        visible={menuAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuAberto(false)}
      >
        {/* Fundo escuro — fecha ao clicar fora */}
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuAberto(false)}
        >
          <View style={styles.menuCard}>

            {/* Grupos */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuAberto(false)
                router.push('/(app)/grupos')
                // navega para a tela de grupos
              }}
            >
              <Ionicons name="people-outline" size={20} color={Colors.foreground} />
              <Text style={styles.menuItemText}>Grupos</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Sair */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSair}
            >
              <Ionicons name="exit-outline" size={20} color={Colors.destructive} />
              <Text style={[styles.menuItemText, { color: Colors.destructive }]}>
                Sair
              </Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.primaryForeground,
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.foreground,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.mutedForeground,
    lineHeight: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.destructive,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuCard: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.foreground,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
})