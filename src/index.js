import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./GlobalStyles/GlobalStyles";
import MenuProvider from "./contexts/MenuContext";
import CartProvider from "./contexts/CartContext";
import FilterProvider from "./contexts/FilterContext";
import { AuthProvider } from "./contexts/AuthContext";
import FavoriteProvider from "./contexts/FavoritesContext";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <MenuProvider>
      <CartProvider>
        <FilterProvider>
          <FavoriteProvider>
            <BrowserRouter>
              <React.StrictMode>
                <GlobalStyles>
                  <App />
                </GlobalStyles>
              </React.StrictMode>
            </BrowserRouter>
          </FavoriteProvider>
        </FilterProvider>
      </CartProvider>
    </MenuProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
