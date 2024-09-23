import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/orders'
import { clearCart } from '../features/cart/cartSlice'

const Cart = ({ navigation }) => {
  const cart = useSelector(state => state.cart)
  const localId = useSelector(state => state.auth.localId)
  const [triggerPostOrder] = usePostOrderMutation()
  const dispatch = useDispatch()

  const handleAddOrder = () => {
    const createdAt = new Date().toLocaleString()
    const order = {
      ...cart,
      createdAt
    }
    triggerPostOrder({ localId, order })
    dispatch(clearCart())
    navigation.navigate("OrdersStack")
  }

  if (cart.total === 0) return <View style={styles.emptyContainer}><Text style={styles.emptyText}>El carrito está vacío</Text></View>

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.list}
      />
      <View style={styles.containerConfirm}>
        <Pressable style={styles.confirmButton} onPress={handleAddOrder}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </Pressable>
        <Text style={styles.textTotal}>Total: {cart.total} $</Text>
      </View>
    </View>
  )
}

export default Cart

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
  containerConfirm: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
  },
  textConfirm: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTotal: {
    color: 'white',
    fontSize: 18,
  },
})
