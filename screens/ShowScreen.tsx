import React from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useDatabase } from '../context/DatabaseContext';
import { type Item } from '../database/db';
import { useFocusEffect } from '@react-navigation/native';

export default function ShowScreen() {
  const { getItems } = useDatabase();
  const [items, setItems] = React.useState<Item[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const load = React.useCallback(async () => {
    const rows = await getItems();
    setItems(rows);
  }, [getItems]);

  useFocusEffect(
    React.useCallback(() => {
      load();
      return () => {};
    }, [load])
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.created_at}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet. Add one in the Add tab.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
  row: { paddingVertical: 10, borderBottomColor: '#eee', borderBottomWidth: 1 },
  title: { fontSize: 16, marginBottom: 4 },
  meta: { color: '#666', fontSize: 12 },
  empty: { textAlign: 'center', color: '#666', marginTop: 24 },
});
