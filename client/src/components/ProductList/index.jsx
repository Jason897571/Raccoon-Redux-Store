import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useSelector,useDispatch } from 'react-redux';
import { updateProducts } from '../../utils/state/cartSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = useSelector(_state => _state.cart.products);
  const dispatch_redux = useDispatch();
  const currentCategory = useSelector(_state => _state.cart.currentCategory)


  useEffect(() => {
    if (data) {
      
      dispatch_redux(updateProducts(
        data.products
      ));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch_redux(
          updateProducts({
            products: products,
          })
          
        );
      });
    }
  }, [data, loading, dispatch_redux]);

  function filterProducts() {
    if (!currentCategory) {

      console.log(products)
      return products;
      
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
