// import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [mockUsers, setMockUsers] = useState([
//     {
//       username: "user",
//       email: "user@example.com",
//       password: "password123",
//       avatar: "https://picsum.photos/200/200?random=1",
//     },
//   ]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.product.id === product.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.product.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { product, quantity }];
//     });
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       setCartItems((prev) =>
//         prev.filter((item) => item.product.id !== productId)
//       );
//     } else {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product.id === productId ? { ...item, quantity } : item
//         )
//       );
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.product.id !== productId)
//     );
//   };

//   // Thêm hàm logout để xóa user mà không ảnh hưởng đến mockUsers
//   const logout = () => {
//     setUser(null);
//     setCartItems([]);
//     // setOrderHistory([]);
//     // Không thay đổi mockUsers để giữ nguyên danh sách người dùng
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         cartItems,
//         setCartItems,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         orderHistory,
//         setOrderHistory,
//         mockUsers,
//         setMockUsers,
//         logout, // Xuất hàm logout
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }

// import { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [mockUsers, setMockUsers] = useState(() => {
//     const savedUsers = localStorage.getItem('mockUsers');
//     return savedUsers
//       ? JSON.parse(savedUsers)
//       : [
//           {
//             username: "user",
//             email: "user@example.com",
//             password: "password123",
//             avatar: "https://picsum.photos/200/200?random=1",
//           },
//         ];
//   });

//   useEffect(() => {
//     // Cập nhật localStorage mỗi khi mockUsers thay đổi
//     localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
//   }, [mockUsers]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.product.id === product.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.product.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { product, quantity }];
//     });
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       setCartItems((prev) =>
//         prev.filter((item) => item.product.id !== productId)
//       );
//     } else {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product.id === productId ? { ...item, quantity } : item
//         )
//       );
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.product.id !== productId)
//     );
//   };

//   const logout = () => {
//     setUser(null);
//     setCartItems([]);
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         cartItems,
//         setCartItems,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         orderHistory,
//         setOrderHistory,
//         mockUsers,
//         setMockUsers,
//         logout,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [mockUsers, setMockUsers] = useState(() => {
    const savedUsers = localStorage.getItem('mockUsers');
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            username: "user",
            email: "user@example.com",
            password: "password123",
            avatar: "https://picsum.photos/200/200?random=1",
          },
        ];
  });

  useEffect(() => {
    // Cập nhật localStorage mỗi khi orderHistory hoặc mockUsers thay đổi
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [orderHistory, mockUsers]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        orderHistory,
        setOrderHistory,
        mockUsers,
        setMockUsers,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}