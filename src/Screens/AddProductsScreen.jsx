import { useNavigation } from 'expo-router';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Products from '../../components/Products'
import { ProductsContext } from '../../context/ProductContext'
const AddProductsScreen = ({ route }) => {
    const { shelfData } = route.params;  // Nhận dữ liệu shelfData từ tham số navigation
    const { productsfData } = route.params;  // Nhận dữ liệu productsfData từ tham số navigation

    const navigator = useNavigation()

    const { shelf01s, deleteItemProduct1 } = useContext(ProductsContext)

    return (
        <View style={styles.container}>
            {/* Tiêu đề Shelf ID */}
            {shelfData ? (
                <Text style={styles.shelfText}>Shelf ID: {shelfData}</Text>
            ) : (
                <Text style={styles.shelfText}>Error.</Text>
            )}


            {/* Cuộn sản phẩm */}
            <FlatList style={styles.productContainer}
                data={shelf01s}
                renderItem={({ item }) => (
                    <Products
                        item={item}
                        deleteItemProduct1={deleteItemProduct1}
                    />
                )}

            />


            {/* Các nút ở dưới */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => { navigator.navigate('SCANPRODUCTS') }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Scan </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => { navigator.goBack() }}>
                    <Text style={styles.buttonText}>End</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',  // Màu nền nhẹ cho màn hình
        justifyContent: 'flex-start',  // Căn đầu nội dung về phía trên
    },
    shelfText: {
        fontSize: 30,  // Tăng kích thước chữ để nổi bật
        fontWeight: 'bold',  // Chữ đậm để dễ nhìn hơn
        color: '#2980b9',  // Màu xanh lam tươi sáng cho tiêu đề
        marginBottom: 30,  // Khoảng cách dưới tiêu đề
        textShadowColor: '#bdc3c7',  // Thêm bóng cho chữ
        textShadowOffset: { width: 2, height: 2 },  // Bóng chữ lệch sang phải và xuống dưới
        textShadowRadius: 3,  // Độ mờ của bóng chữ
    },
    productContainer: {
        flex: 1, // Tự động điều chỉnh độ cao để cuộn được
    },
    buttonContainer: {
        marginTop: 30,  // Khoảng cách giữa các sản phẩm và nút
        flexDirection: 'row',  // Sắp xếp các nút ngang hàng
        justifyContent: 'space-between',  // Khoảng cách đều giữa các nút
    },
    button: {
        backgroundColor: '#2980b9',  // Màu nền của nút
        paddingVertical: 15,  // Đệm dọc cho nút
        paddingHorizontal: 25,  // Đệm ngang cho nút
        borderRadius: 5,  // Bo góc cho nút
        width: '45%',  // Đặt chiều rộng của nút chiếm 45% màn hình
        alignItems: 'center',  // Căn giữa văn bản trong nút
    },
    buttonText: {
        color: 'white',  // Màu chữ trắng cho nút
        fontSize: 18,  // Kích thước chữ trong nút
        fontWeight: 'bold',  // Chữ đậm
    }
});
