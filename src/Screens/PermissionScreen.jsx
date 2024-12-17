import { SafeAreaView, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';
import { useNavigation } from 'expo-router'
import { useCameraPermissions } from 'expo-camera';
// import data from '../../src/data'


const PermissionScreen = () => {

    const navigator = useNavigation()

    const [permission, requestPermission] = useCameraPermissions()
    console.log('permission', permission)
    const isPermissionGranted = Boolean(permission?.granted)
    // const isPermissionGranted = false; // chỉnh quyền

    return (

        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: "Overview", headerShown: false }} />
            <Text style={styles.title}>QR Scan Products</Text>
            <View style={{ gap: 20 }}>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={styles.buttonStyle}>Request Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!isPermissionGranted}
                    onPress={() => { navigator.navigate('SCANSCREEN') }}
                    style={[styles.scanButton, !isPermissionGranted && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>Scan code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default PermissionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#f4f4f4',  // Màu nền nhẹ cho màn hình
        justifyContent: "space-around",
        paddingVertical: 80,
    },
    title: {
        color: "black",
        fontSize: 40,
        fontWeight: 'bold'
    },
    buttonStyle: {
        color: "#0E7AFE",
        fontSize: 20,
        textAlign: "center",
    },
    scanButton: {
        backgroundColor: "#0E7AFE", // Blue background color
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 40, // Horizontal padding
        borderRadius: 30, // Rounded corners
        alignItems: "center", // Center the text inside the button
        justifyContent: "center", // Center the text inside the button
        width: "60%", // Set a width to make the button larger
    },
    buttonText: {
        color: "white", // Text color inside the button
        fontSize: 18, // Font size of the button text
        fontWeight: "bold", // Make the text bold
    },
    disabledButton: {
        backgroundColor: "#B0B0B0", // Grey background when disabled
    }
});
