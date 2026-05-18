import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

// Props que o Header pode receber
interface HeaderProps {
  showNotification?: boolean  // mostrar ícone de notificação
  showMenu?: boolean          // mostrar ícone de menu
}

export default function Header({ showNotification = true, showMenu = true }: HeaderProps) {
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
        {showNotification && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={Colors.foreground} />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu-outline" size={24} color={Colors.foreground} />
          </TouchableOpacity>
        )}
      </View>
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
  },
})