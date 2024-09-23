import { StyleSheet, Text, View, FlatList } from 'react-native'
import OrderItem from '../components/OrderItem'
import { useGetOrdersByUserQuery } from '../services/orders'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSelector } from 'react-redux'

const Orders = () => {
  const localId = useSelector(state => state.auth.localId)
  const { data: orders, isLoading } = useGetOrdersByUserQuery(localId)

  if (isLoading) return <LoadingSpinner />

  if (orders.length === 0) return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tienes órdenes</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0', 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  list: {
    paddingBottom: 20,
  },
})
