import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  trainingsContainer: {
    width: '100%',
    flex: 1,
    marginBottom: 20,
  },
  trainingCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#dee2e6',
    alignItems: 'center',
  },
  trainingCardSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  trainingTitleSelected: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
  footer: {
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
