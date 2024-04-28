import { idbPromise } from "../../utils/helpers";

import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../utils/state/storeSlice';

const CartItem = ({ item }) => {


  const dispatch_redux = useDispatch();

  const removeFromCartRedux = item => {
    dispatch_redux(removeFromCart({
      
      _id: item._id
    }));
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch_redux(removeFromCart({
      
        _id: item._id
      }));
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch_redux(updateCartQuantity({
        _id: item._id,
        purchaseQuantity: parseInt(value)
      }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCartRedux(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
