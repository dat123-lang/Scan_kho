import { AppState, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useNavigation } from 'expo-router'
import { CameraView } from 'expo-camera'
import { Overlay } from '@/components/Overlay'
import { ProductsContext } from '../../context/ProductContext'
import data from '../data/dataProducts.json'


const ScanProducts = () => {
    const navigation = useNavigation()

    const [products, setProducts] = useState(data.products)


    // dùng qlock để ngăn chặn việc quét nhiều mã scan cùng lúc trong thời gian ngắn (giúp tránh việc quét mã lên tục làm lỗi mã vạch)
    const qrLock = useRef(false) // cho khóa quét mã ban đầu được đặt ở trạng thái "mở khóa"

    // dùng AppState để theo dõi trạng thái của ứng dụng
    // vd một số trạng thái như active(đang hoạt động) , inactive(không hoạt động) , background(nền)
    const appState = useRef(AppState.currentState)
    const { addToProduct1 } = useContext(ProductsContext);

    const handleAddToProduct1 = (itemm) => {
        console.log("itemm: ", itemm)

        addToProduct1(itemm)//"...itemm" để sao chép tất cả các thuộc tính của đối tượng itemm, và thêm hai thuộc tính mới: color và size.

    }




    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Scan Shelf",
                    headerShown: false,
                }}
            />

            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }) => {  // tham số data đại diện cho dữ liệu được đọc từ mã vạch
                    // data kiểm tra xem có dữ liệu hay không |
                    if (data && !qrLock.current) { // kiểm tra khóa có đang bật hay không, nếu là false thì đang tắt và cho phép quét            
                        // alert(`data nhận được: ${data}`)
                        qrLock.current = true      // khóa lại mã vạch, ngăn chặn việc quét liên tục trong một thời gian nhất định
                        setTimeout(async () => {
                            // await Linking.openURL(data)
                            console.log('data: ', data)

                            const matchedProducts = products.find(item => item.id === data);  // Tìm phần tử có id khớp

                            if (matchedProducts) {
                                // Nếu tìm thấy products trùng với mã quét, điều hướng tới màn hình K01
                                console.log('id products', matchedProducts)
                                navigation.goBack({ productsfData: data });  // Điều hướng tới màn hình có tên là 'K01', 'K02'...
                                handleAddToProduct1(matchedProducts)
                            } else {
                                // Nếu không có products trùng với mã, hiển thị lỗi và thực hiện hiệu ứng khi nhấn OK
                                Alert.alert("Lỗi", "Mã quét không hợp lệ.", [
                                    {
                                        text: "OK",
                                        onPress: () => handleErrorEffect()  // Gọi hàm thực hiện hiệu ứng khi bấm OK
                                    }
                                ]);
                            }

                        }, 500)
                    }
                }}
            />
            <Overlay />
        </SafeAreaView>
    )
}

export default ScanProducts

const styles = StyleSheet.create({})