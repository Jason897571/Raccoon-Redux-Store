import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useQuery } from '@apollo/client';

import { useSelector,useDispatch } from 'react-redux';
import { updateProducts } from '../../utils/state/storeSlice';

import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {


  const currentCategory = useSelector((state) => state.store.currentCategory);
  const products_redux = useSelector((state) => state.store.products);
  const dispatch_redux = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch_redux(updateProducts({products: data.products}));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch_redux(updateProducts({products: products}));
      });
    }
  }, [data, loading, dispatch_redux]);

  function filterProducts() {
    if (!currentCategory) {
      return products_redux;
    }

    return products_redux.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products_redux.length ? (
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
