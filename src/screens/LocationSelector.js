import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import MapPreview from '../components/MapPreview'
import { mapStaticApi } from '../firebase/googleApi'
import SubmitButton from '../components/SubmitButton'
import { usePostUserLocationMutation } from '../services/users'
import { useSelector } from 'react-redux'

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' })
  const [address, setAddress] = useState('')
  const localId = useSelector(state => state.auth.localId)
  const [triggerPostUserLocation] = usePostUserLocationMutation()

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      const newLocation = await Location.getCurrentPositionAsync()
      setLocation({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (location.latitude) {
        const urlReverseGeoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapStaticApi}`
        const response = await fetch(urlReverseGeoding)
        const data = await response.json()
        setAddress(data.results[0]?.formatted_address || 'Dirección no disponible')
      }
    })()
  }, [location])

  const handleConfirmLocation = () => {
    const userLocation = { ...location, address }
    triggerPostUserLocation({ localId, userLocation })
    navigation.navigate('MyProfile')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.addressText}>Dirección: {address}</Text>
      <MapPreview location={location} />
      <SubmitButton title="Confirmar Ubicación" onPress={handleConfirmLocation} />
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addressText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#003366',
    fontWeight: '600',
    textAlign: 'center', 
  },
})
