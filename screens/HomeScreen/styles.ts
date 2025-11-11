import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 },
  heading: { fontSize: 20, marginBottom: 12, fontWeight: '600' },
  sub: { fontSize: 16, marginBottom: 8 },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
  smallInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 8, marginRight: 8 },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  typeRow: { padding: 10, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 8 },
  
  // Exercise list container
  exercisesContainer: {
    width: '100%',
    marginBottom: 12,
  },
  trainingGroup: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  editButton: {
    padding: 8,
  },
  trainingDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  noExercisesText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  exerciseNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginRight: 12,
    minWidth: 30,
  },
  exerciseDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  exerciseWeight: {
    fontSize: 14,
    color: '#666',
  },
});
