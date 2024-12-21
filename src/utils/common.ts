import { CartItem } from "@/types/interfaces";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const extractCookie = (cookies: string | undefined, key: string) => {
  const parsedCookies = cookies
    ? cookies
      .split('; ')
      .reduce((acc: { [key: string]: string }, current) => {
        const [key, value] = current.split('=');
        return { ...acc, [key]: value };
      }, {})
    : {};

  const token = parsedCookies[key];
  return token;
}

export const fillInCart = (prevCart: CartItem[], product: CartItem) => {
  let cartItem: CartItem[] = [];
  const existingProduct = prevCart.find((item) => item.id === product.id);
  if (existingProduct) {
    cartItem = prevCart.map((item: CartItem) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cartItem = [...prevCart, { ...product, quantity: 1 }];
  }
  return cartItem;
}

export const checkTokenExist = (cookies: any) => {
  const accessToken = extractCookie(cookies, 'token') || null;
  let customer: any = null;
  if (accessToken) {
    customer = jwtDecode(accessToken) || null;
  }
  return customer;
}

export const customerOpenCart = async () => {
  const custId = localStorage.getItem('customerId');
  const customerId = custId ? +custId : 0;
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const api = `${apiUrl}/api/carts/customer/${customerId}`;
  const response = await axios.get(api).catch((err) => console.log(err));
  const productsInCart: CartItem[] = response?.data ? response?.data : [];
  console.log(productsInCart);
  return productsInCart;
}
