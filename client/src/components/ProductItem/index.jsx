import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

import { useSelector, useDispatch } from "react-redux";
import { addToCart,updateCartQuantity } from "../../utils/state/storeSlice";

import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {


  const dispatch_redux = useDispatch();
  const cart_redux = useSelector((state) => state.store.cart);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  


  const addToCartRedux = () => {
    const itemInCart = cart_redux.find((cartItem) => cartItem._id === _id)
   
    if (itemInCart) {
      dispatch_redux(updateCartQuantity({
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }));
      console.log("1")
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch_redux(addToCart({product: { ...item, purchaseQuantity: 1 }}));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
      console.log("2")
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCartRedux}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
