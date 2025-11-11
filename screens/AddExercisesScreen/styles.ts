import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  sub: { fontSize: 16, marginBottom: 8 },
  typeRow: { padding: 10, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 8 },
  typeSelected: { borderWidth: 1, borderColor: '#2196F3' },
  row: { marginBottom: 8 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 8, marginBottom: 6 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
