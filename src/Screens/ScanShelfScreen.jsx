import { Camera, CameraView } from "expo-camera";
import { Stack, useFocusEffect } from "expo-router";
import {
    AppState,
    Linking,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Alert
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Overlay } from '../../components/Overlay'
import { NewLineKind } from "typescript";
import AddProductsScreen from './AddProductsScreen';
import { useNavigation } from 'expo-router';
import data from '../data/dataShelf.json'


const ScanScreen = () => {
    const navigation = useNavigation()


    const [shelf, setShelf] = useState(data.shelf)


    // dùng qlock để ngăn chặn việc quét nhiều mã scan cùng lúc trong thời gian ngắn (giúp tránh việc quét mã lên tục làm lỗi mã vạch)
    const qrLock = useRef(false) // cho khóa quét mã ban đầu được đặt ở trạng thái "mở khóa"

    // dùng AppState để theo dõi trạng thái của ứng dụng
    // vd một số trạng thái như active(đang hoạt động) , inactive(không hoạt động) , background(nền)
    const appState = useRef(AppState.currentState)

    useEffect(() => {
        // AppState.addEventListener("change", ...): đăng ký 1 hàm lắng nghe để theo dõi trạng thái của ứng dụng
        // vd mỗi khi người dùng thay đổi ứng dụng từ ứng dụng này sang ứng dụng khác thì hàm sẽ được gọi 
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) && // kiểm tra sang trạng thái trước đó có inactive hay là background không
                nextAppState === 'active' //kiểm tra xem trạng thái mới phải là active, tức là người dùng đã quay lại ứng dụng.
            ) {
                //nếu cả hai điều kiện trên đúng có nghĩa user đã quay lại ứng dụng từ chế độ nền
                qrLock.current = false //gỡ bỏ khóa quét mã vạch mà cho user tiếp tục quét mã 
            }
            appState.current = nextAppState // cập nhật lại trạng thái mới của ứng dụng , giúp cho nhưng lần kiểm tra sau luôn chính xác
            // console.log('qrLock khi gọi hàm', qrLock)
        })

        return () => {
            subscription.remove();// dọn dẹp (cleanup) khi component bị unmount hoặc khi useEffects

        }
    }, []) // Mảng dependencies rỗng, chỉ chạy 1 lần khi mount



    useFocusEffect(() => {
        // Khi trang này được focus, mở khóa quét mã
        qrLock.current = false;
    });


    const handleErrorEffect = () => {
        qrLock.current = false; // Mở khóa để người dùng có thể quét lại

    };

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
                            // console.log('data: ', data)

                            // Điều hướng đến một màn hình khác 

                            const matchedShelf = shelf.find(item => item.id === data);  // Tìm phần tử có id khớp

                            if (matchedShelf) {
                                // Nếu tìm thấy shelf trùng với mã quét, điều hướng tới màn hình K01
                                navigation.navigate('ADDPRODUCTSSCREEN', { shelfData: data });  // Điều hướng tới màn hình có tên là 'K01', 'K02'...

                                // console.log('id shelf',matchedShelf)
                            } else {
                                // Nếu không có shelf trùng với mã, hiển thị lỗi và thực hiện hiệu ứng khi nhấn OK
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

export default ScanScreen

const styles = StyleSheet.create({})