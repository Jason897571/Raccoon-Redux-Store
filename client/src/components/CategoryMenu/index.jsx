import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import {useDispatch,useSelector} from 'react-redux';
import {updateCategories, updateCurrentCategory} from '../../utils/state/storeSlice';


import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {


  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  
  const reduxCategories = useSelector((state) => state.store.categories);
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));

      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } 
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch(updateCurrentCategory({currentCategory: id}));
    
  };


  return (
    <div>
      <h2>Choose a Category:</h2>
      {reduxCategories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
