import React, { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);
    // 1.LoadProducts
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    dispatch({type:FILTER_PRODUCTS})
    dispatch({ type: SORT_PRODUCTS });
    // eslint-disable-next-line
  }, [products, state.sort,state.filters]);

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const updateSort = (e) => {
    // sort içinde sadece bir select oldugundan "name" i kullanmaya gerek yok
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e)=> {
    let name = e.target.name;
    let value = e.target.value

    if(name === "color"){
      value = e.currentTarget.getAttribute('data-color')
      // veya aşagıdaki kodu kullan
      // value = e.target.dataset.color 
      
    }
      if(name === "price"){
        value = Number(value)
      }
    if(name === "category"){
      value = e.target.textContent // category "button" içinde oldugu için degerini  "input" gibi e.target.value gibi alamayız
    }
    if(name === "shipping"){
      value = e.target.checked
    }
   
   dispatch({type:UPDATE_FILTERS,payload:{name,value}})
  }

  const clearFilters = ()=> {
        dispatch({type:CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider
      value={{ ...state, setListView, setGridView, updateSort,updateFilters,clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
