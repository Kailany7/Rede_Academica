import { StyleSheet, Dimensions } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Colors from '../../constants/Colors'

// Pega largura da tela
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Conteúdo rolável
  scrollContent: {
    alignItems: 'center',
    paddingBottom: hp('4%'),
  },

  // Header superior
  header: {
    alignItems: 'center',
    paddingTop: hp('6%'),
    paddingBottom: hp('6%'),
    paddingHorizontal: wp('8%'),
    width: '100%',
  },

  // Caixa do ícone
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  // Título principal
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },

  // Subtítulo
  subtitle: {
    fontSize: 14,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },

  // Card branco do formulário
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    width: '90%',
    maxWidth: 400,
    padding: 24,

    // Sombra IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Sombra Android
    elevation: 4,
  },

  // Container Login/Cadastro
  toggleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },

  // Botão ativo
  toggleButtonActive: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  // Botão inativo
  toggleButtonInactive: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.muted,
    alignItems: 'center',
  },

  // Texto botão ativo
  toggleTextActive: {
    color: Colors.primaryForeground,
    fontWeight: '500',
    fontSize: 15,
  },

  // Texto botão inativo
  toggleTextInactive: {
    color: Colors.cardForeground,
    fontWeight: '500',
    fontSize: 15,
  },

  // Labels dos inputs
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 6,
    marginTop: 12,
  },

  // Inputs
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.foreground,
  },

  // Botão Entrar
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 3,
  },

  // Texto do botão
  buttonText: {
    color: Colors.primaryForeground,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default styles