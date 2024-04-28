import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';


import { useSelector,useDispatch } from 'react-redux';
import { toggleCart,addMultipleToCart,clearCart } from '../../utils/state/storeSlice';

import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

  const cart_redux = useSelector((state) => state.store.cart);
  const cartOpen = useSelector((state) => state.store.cartOpen);
  const dispatch_redux = useDispatch();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch_redux(clearCart());
      dispatch_redux(addMultipleToCart({ products: [...cart] }));
    }

    if (cart_redux.length) {
      getCart();
    }
  }, [cart_redux.length, dispatch_redux]);

  function toggleCartRedux() {
    dispatch_redux(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    cart_redux.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cart_redux.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCartRedux}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {cart_redux.length ? (
        <div>
          {cart_redux.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You have not added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
