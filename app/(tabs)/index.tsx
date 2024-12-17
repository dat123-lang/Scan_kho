import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native'
import PermissionScreen from '../../src/Screens/PermissionScreen';
import ScanScreen from '../../src/Screens/ScanShelfScreen';
import AddProductsScreen from '../../src/Screens/AddProductsScreen';
import ScanProducts from '../../src/Screens/ScanProducts';
import { ProductsProvider } from '@/context/ProductContext';



const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator()

const MyScanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    // initialRouteName='ADDPRODUCTSSCREEN'
    >
      <Stack.Screen name="PERMISSIONSCREEN" component={PermissionScreen} />
      <Stack.Screen name="SCANSCREEN" component={ScanScreen} />
      <Stack.Screen name="ADDPRODUCTSSCREEN" component={AddProductsScreen} />
      <Stack.Screen name="SCANPRODUCTS" component={ScanProducts} />

    </Stack.Navigator>
  )
}


const index = () => {
  return (
    <ProductsProvider>
      <NavigationIndependentTree >
        <NavigationContainer >
          <Tab.Navigator
            screenOptions={{
              headerShown: false, // Ẩn header

            }}
          // initialRouteName='CART'
          >
            <Tab.Screen
              name="SCAN_STACK"
              component={MyScanStack}
              options={{

              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </ProductsProvider>
  )
}

export default index

const styles = StyleSheet.create({})