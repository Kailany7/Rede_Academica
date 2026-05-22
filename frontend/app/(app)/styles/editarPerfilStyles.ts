import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── ScrollView ──
  scrollContent: {
    alignItems: 'center',      
    paddingBottom: 40,
  },


  banner: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.primary,
  },

 
  avatarWrapper: {
    position: 'absolute',      
    bottom: -40,               
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.background, 
  },

  // ── Círculo do avatar ──
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Texto das iniciais no avatar ──
  avatarText: {
    color: Colors.primaryForeground,
    fontWeight: '700',
    fontSize: 28,
  },

  
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    width: '90%',
    maxWidth: 400,             
    padding: 24,
    marginTop: 60,             
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // ── Label dos campos ──
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 6,
    marginTop: 12,
  },


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


  inputBio: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.foreground,
    height: 100,
    textAlignVertical: 'top',
  },

  // ── Botão salvar ──
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },


  buttonText: {
    color: Colors.primaryForeground,
    fontSize: 16,
    fontWeight: '600',
  },

  // ── Botão cancelar ──
  buttonCancel: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.muted,
  },


  buttonCancelText: {
    color: Colors.mutedForeground,
    fontSize: 15,
    fontWeight: '500',
  },
})

export default styles