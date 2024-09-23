import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import SubmitButton from '../components/SubmitButton'
import { useGetUserQuery } from '../services/users'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'

const MyProfile = ({ navigation }) => {
  const localId = useSelector(state => state.auth.localId)
  const { data: user, isLoading } = useGetUserQuery({ localId })

  if (isLoading) return <LoadingSpinner />
  
  return (
    <View style={styles.container}>
      <Image
        source={user.image ? { uri: user.image } : require("../../assets/profile_default.png")}
        resizeMode='cover'
        style={styles.image}
      />
      <SubmitButton 
        title="Agregar imagen de perfil" 
        onPress={() => navigation.navigate("ImageSelector")} 
        style={styles.button} 
      />
      <SubmitButton 
        title="Agregar localización" 
        onPress={() => navigation.navigate("LocationSelector")} 
        style={styles.button} 
      />
      <FlatList
        data={user.locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>{item.address}</Text>
          </View>
        )}
        style={styles.locationList}
      />
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#003366', 
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  locationList: {
    width: '100%',
    marginTop: 20,
  },
  locationItem: {
    padding: 15,
    backgroundColor: '#e6f7ff',
    borderRadius: 5,
    marginVertical: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#003366', 
  },
})
