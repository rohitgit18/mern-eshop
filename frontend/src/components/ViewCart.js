import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import WebApis from '../apis/WebApis';
import { removeItem, setCartItemList, updateQuantity } from "../redux-config/CartItemSlice";
import { useNavigate } from "react-router-dom";

export default function ViewCart() {
  const { token, user, isLoggedIn } = useSelector((store) => store.User || {});
  const { cartItemList, totalPrice } = useSelector((store) => store.CartItems || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if ( user?._id && token && isLoggedIn) {
      loadCartItems();
    } else {
      console.log('User,user._id, or token is not available');
    }
  },[user, token, isLoggedIn]);

  const loadCartItems = async () => {
    try {
      console.log('Fetching cart items with user._id:', user._id,   'and token:', token);
      const response = await axios.get(`${WebApis.VIEW_CART}${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Cart items response:', response.data);
      if (response.data?.cart?.cartItems &&  Array.isArray(response.data.cart.cartItems)) {
        dispatch(setCartItemList(response.data.cart.cartItems));
      }
      else {
        console.warn('cart data is not in the expected format');
      }
    }
    catch(err){
      console.error('Error fetching cart items:', err);
    }
  };

  const removeCartItems = async (index, productId) => {
    try {
        await axios.delete(`${WebApis.DELETECARTITEM}${productId}/${user._id}`);
        dispatch(removeItem(index));
      } catch (err) {
        console.error('Error removing cart item:',err);
        window.alert("Oops! something went wrong...");
      }
  };

  const loadCheckout = () => {
    navigate("/checkout");
  };
  return <>
    <div className="container mt-5">
      <header className="bg-danger d-flex justify-content-center align-items-center" style={{ height: "30px" }}>
        <h6 className="text-white" style={{ margin: 0 }}>Cart Details</h6>
      </header>
      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Product name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItemList && cartItemList.length > 0 ?(
              cartItemList.map((item, index) => (
              <tr id={"row" + index} key={index}>
                <td>{index + 1}</td>
                <td>{item.productId.title}</td>
                <td>{item.productId.brand ? item.productId.brand : "N/A"}</td>
                <td>{item.productId.price}</td>
                <td>
                  <input 
                  onChange={(event) => dispatch(updateQuantity({ qty: event.target.value, index }))} 
                  type="number" value={item.productId.qty} style={{ width: "50px", height: "20px" }} 
                  />
                </td>
                <td>{item.productId.price * item.productId.qty}</td>
                <td>
                  <small onClick={() => removeCartItems(index, item.productId._id)} 
                style={{ cursor: "pointer" }} className="text-danger">Remove</small></td>
              </tr>))
              ) : ( <tr>
               <td colspan="7">No item in the cart</td> 
               </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-3 p-3 ml-4">
          <div className="" style={{ height: "150px", boxShadow: "10px 10px 10px 10px black" }}>
            <h6 className="text-center bg-dark text-white p-2">Order Summery</h6>
            <div className="d-flex justify-content-between p-2">
              <small>Total Items</small>
              <small>{cartItemList ? cartItemList.length : 0}</small>
            </div>
            <div className="d-flex justify-content-between p-2">
              <small>Bill Amount</small>
              <small>{totalPrice ? totalPrice.toFixed(2) : "0.00"} Rs.</small>
            </div>
            <button className="btn btn-success" style={{ width: "100%" }} onClick={loadCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </>
}