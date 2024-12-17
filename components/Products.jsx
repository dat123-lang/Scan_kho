import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons'; // Đảm bảo bạn đã cài Feather icons nếu chưa

const Products = ({ item, deleteItemProduct1 }) => {
    return (
        <View style={styles.productRow}>
            <Image
                style={styles.coverImage}
                source={{ uri: item.image }}
            />
            <Text style={styles.productText}>{item.title}</Text>

            <TouchableOpacity onPress={() => deleteItemProduct1(item)}>
                <Feather name="trash" size={22} color={"#ee3d31"} />
            </TouchableOpacity>
        </View>
    );
};

export default Products;

const styles = StyleSheet.create({
    coverImage: {
        width: 50,        // Chiều rộng hình ảnh
        height: 50,       // Chiều cao hình ảnh
        marginRight: 15,  // Khoảng cách giữa hình ảnh và văn bản
    },
    productRow: {
        flexDirection: 'row', // Đặt các phần tử nằm ngang
        alignItems: 'center', // Căn chỉnh theo chiều dọc cho đều
        marginBottom: 15,     // Khoảng cách dưới mỗi dòng sản phẩm
        paddingVertical: 10,  // Khoảng cách trên và dưới mỗi dòng sản phẩm
        borderBottomWidth: 1, // Đường viền dưới mỗi sản phẩm
        borderBottomColor: '#ecf0f1', // Màu đường viền dưới
    },
    productText: {
        fontSize: 18,
        color: '#34495e',  // Màu chữ nhạt hơn cho các sản phẩm
        paddingVertical: 10, // Khoảng cách giữa các sản phẩm
        backgroundColor: '#ecf0f1', // Màu nền nhẹ cho các dòng sản phẩm
        borderRadius: 5,     // Viền bo tròn cho các sản phẩm
        marginLeft: 15,      // Khoảng cách giữa hình ảnh và tên sản phẩm
        paddingHorizontal: 15, // Khoảng cách hai bên
        fontWeight: '500',
        flex: 1,  // Cho phép văn bản chiếm không gian còn lại trong hàng
    },
    deleteButton: {
        padding: 5,  // Tạo khoảng cách xung quanh biểu tượng
    }
});
