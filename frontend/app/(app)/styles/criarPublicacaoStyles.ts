// Importa StyleSheet do React Native
import { StyleSheet } from 'react-native'

// Importa responsividade
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

// Importa cores globais
import Colors from '../../../constants/Colors'

// Criação dos estilos
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'),
  },

  // Área do usuário
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.card,

    borderRadius: 22,

    padding: 18,

    marginBottom: hp('3%'),

    // Sombra IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    // Sombra Android
    elevation: 4,
  },

  // Avatar
  avatar: {
    width: 60,
    height: 60,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 16,
  },

  // Texto do avatar
  avatarText: {
    color: Colors.primaryForeground,
    fontWeight: '700',
    fontSize: 20,
  },

  // Informações usuário
  userInfo: {
    flex: 1,
  },

  // Nome usuário
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: 4,
  },

  // Curso usuário
  userCourse: {
    fontSize: 14,
    color: Colors.mutedForeground,
  },

  // Área formulário
  form: {
    backgroundColor: Colors.card,

    borderRadius: 24,

    padding: 24,

    // Sombra IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    // Sombra Android
    elevation: 4,
  },

  // Campo de texto
  textArea: {
    minHeight: hp('22%'),

    backgroundColor: Colors.inputBackground,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 16,

    paddingHorizontal: 18,
    paddingVertical: 18,

    fontSize: 15,
    color: Colors.foreground,

    textAlignVertical: 'top',
  },

  // Área botão
  buttonContainer: {
    marginTop: hp('3%'),
  },

  // Botão publicar
  button: {
    backgroundColor: Colors.primary,

    borderRadius: 14,

    paddingVertical: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // Sombra IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Sombra Android
    elevation: 3,
  },

  // Texto botão
  buttonText: {
    color: Colors.primaryForeground,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Conteúdo rolável
scrollContent: {
  paddingBottom: hp('4%'),
},

// Header superior
header: {
  alignItems: 'center',
  marginBottom: hp('3%'),
},

// Caixa do ícone
iconContainer: {
  width: 80,
  height: 80,

  borderRadius: 24,

  backgroundColor: Colors.primary,

  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: 16,
},

// Título principal
title: {
  fontSize: 28,
  fontWeight: '700',
  color: Colors.foreground,
  marginBottom: 8,
  textAlign: 'center',
},

// Subtítulo
subtitle: {
  fontSize: 14,
  color: Colors.mutedForeground,
  textAlign: 'center',
  lineHeight: 22,
  paddingHorizontal: 10,
},

// Card principal
card: {
  backgroundColor: Colors.card,

  borderRadius: 24,

  padding: 24,

  // Sombra IOS
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.08,
  shadowRadius: 8,

  // Sombra Android
  elevation: 4,
},

// Label
label: {
  fontSize: 14,
  fontWeight: '600',
  color: Colors.foreground,
  marginBottom: 10,
},

// Botão desabilitado
buttonDisabled: {
  opacity: 0.5,
},
})

// Exporta estilos
export default styles