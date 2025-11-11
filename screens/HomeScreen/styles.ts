import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 },
  heading: { fontSize: 20, marginBottom: 12, fontWeight: '600' },
  sub: { fontSize: 16, marginBottom: 8 },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
  smallInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 8, marginRight: 8 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typeRow: { padding: 10, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 8 },
});
