import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
function CartProvider({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleTotal = (accumulator, currentItem) => {
    if (currentItem.newPrice) {
      return accumulator + currentItem.amount * currentItem.newPrice;
    } else {
      return accumulator + currentItem.amount * currentItem.price;
    }
  };

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setAmount(amount);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce(handleTotal, 0);
      setTotal(total);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    const cartItems = cart.find((cartItem) => {
      return cartItem._id === id;
    });
    if (cartItems) {
      const newCarts = [...cart].map((newCart) => {
        if (newCart._id === id) {
          return { ...newCart, amount: cartItems.amount + 1 };
        } else {
          return newCart;
        }
      });
      setCart(newCarts);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const increaseCart = (id) => {
    const newCart = cart.find((item) => {
      return item._id === id;
    });
    addToCart(newCart, id);
  };

  const decreaseCart = (id) => {
    const cartItem = cart.find((item) => {
      return item._id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item._id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeCart(id);
    }
  };

  const removeCart = (id) => {
    const newCarts = cart.filter((item) => {
      return item._id !== id;
    });

    setCart(newCarts);
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        openCart,
        amount,
        total,
        cart,
        setOpenCart,
        addToCart,
        increaseCart,
        decreaseCart,
        removeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
