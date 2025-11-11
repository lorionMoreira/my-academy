import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useDatabase } from '../../context/DatabaseContext';
import type { Item } from '../../types/database';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';

export default function ListaScreen() {
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
