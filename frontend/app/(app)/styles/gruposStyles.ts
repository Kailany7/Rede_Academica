import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  innerContent: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.foreground,
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.foreground,
  },

  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 48,
    alignItems: 'center',
    marginTop: 8,
  },

  emptyIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.muted,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },

  grupoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },

  grupoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grupoInfo: {
    flex: 1,
  },

  grupoNome: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 2,
  },

  grupoDescricao: {
    fontSize: 13,
    color: Colors.mutedForeground,
    marginBottom: 4,
  },

  grupoMeta: {
    flexDirection: 'row',
    gap: 6,
  },

  grupoMetaText: {
    fontSize: 12,
    color: Colors.mutedForeground,
  },

  entrarButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  entrarButtonText: {
    color: Colors.primaryForeground,
    fontSize: 13,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalCard: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 16,
    textAlign: 'center',
  },

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

  buttonText: {
    color: Colors.primaryForeground,
    fontSize: 16,
    fontWeight: '600',
  },

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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },

  backButton: {
    marginRight: 8,
    marginTop: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.cardForeground,
  },

  modalCentralOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  modalCentralCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  grupoHeaderModal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },

  grupoHeaderInfo: {
    flex: 1,
  },

  grupoAvatarGrande: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalGrupoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: 4,
  },

  modalGrupoDescricao: {
    fontSize: 14,
    color: Colors.mutedForeground,
    lineHeight: 20,
    marginBottom: 12,
  },

  conversaBox: {
    backgroundColor: Colors.muted,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  conversaTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: 12,
  },

  mensagemItem: {
    marginBottom: 10,
  },

  mensagemAutor: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.foreground,
  },

  mensagemTexto: {
    fontSize: 13,
    color: Colors.mutedForeground,
    marginTop: 2,
    lineHeight: 18,
  },
})

export default styles