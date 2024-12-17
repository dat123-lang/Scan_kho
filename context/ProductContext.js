import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

// useReducer thì cho phép chúng ta cập nhật giá trị mới cho state

// chia sẻ state tới các component sử dụng useContext
export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {  //{ children } các prop

    //tạo State mảng tên shelf01 để chứa sản phẩm
    const [shelf01s, setShelf01s] = useState([]);
    const [shelf02s, setShelf02s] = useState([]);
    const [shelf03s, setShelf03s] = useState([]);
    const [shelf04s, setShelf04s] = useState([]);


    // Trạng thái kệ hiện tại đang quét
    const [currentShelf, setCurrentShelf] = useState(null);
    const [productName, setProductName] = useState('');

    
    //tạo addToProduct để thêm sản phẩm vào mảng
    const addToProduct1 = async (item) => {
        const itemExit = shelf01s.findIndex((shelf01) => shelf01.id === item.id)

        if (itemExit === -1) {
            const newItems = [...shelf01s, item]; // sao chép tất cả các phần tử trong mảng carts vào một mảng mới, sau đó thêm sản phẩm item vào cuối mảng đó.
            await AsyncStorage.setItem('shelf01s', JSON.stringify(newItems))// Lưu lại giỏ hàng vào AsyncStorage với khóa 'shelf01s'
            setShelf01s(newItems) // Cập nhật state kệ 1
        }
    }

    //tạo hàm delete cart
    const deleteItemProduct1 = async (item) => {
        const newItems = shelf01s.filter((shelf01) => shelf01.id !== item.id) //Hàm filter lặp qua mảng carts, và với mỗi phần tử trong mảng (được gọi là cart),
        await AsyncStorage.setItem('shelf01s', JSON.stringify(newItems))// Lưu lại giỏ hàng vào AsyncStorage với khóa 'carts'
        setShelf01s(newItems) // Cập nhật state kệ 1
    }


    const value = {
        shelf01s, //Đây là state của giỏ hàng, chứa danh sách các sản phẩm trong giỏ.
        addToProduct1,
        deleteItemProduct1



    }
    // Sau đó bao bọc toàn bộ thành phần DOM của component bằng thẻ Provider, đồng thời truyền giá trị mà mình muốn chia sẻ đến các component khác
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}