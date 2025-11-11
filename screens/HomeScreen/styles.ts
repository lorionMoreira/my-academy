import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 },
  heading: { fontSize: 20, marginBottom: 12, fontWeight: '600' },
  sub: { fontSize: 16, marginBottom: 8 },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
  smallInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 8, marginRight: 8 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typeRow: { padding: 10, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 8 },
  
  // New exercise card styles
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconButton: {
    padding: 4,
    marginVertical: 2,
  },
  exerciseDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exerciseWeight: {
    fontSize: 14,
    color: '#666',
  },
  repsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  repsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  repsLabel: {
    fontSize: 12,
    color: '#999',
  },
});
