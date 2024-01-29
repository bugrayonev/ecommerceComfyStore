import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // maxPrice
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload], // default products degeri için kullanacagız
      filtered_products: [...action.payload], // productsları burada filter lacagız
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },

      /* 
      all_products ve filter_products ı spread oparetor ile almamızın sebebi ;
      eger biz bu bilgilerin kopyasını almazsak filtreleme işleminde default degere geldiğimizde 
      kodumuz düzgün çalışmaz
      */
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === "price-highest") {
      tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }

/* "products", "state.sort","state.filters" ve  
her products sayfası re-render oldugunda useEffect içindeki "FILTER_PRODUCTS" çalışacak */
  if (action.type === FILTER_PRODUCTS) {
      const {all_products} = state // all_products default deger olarak kalacak aşagıda  tempProducts ile kopyasını aldık [...all_products]
      const {text,category,color,company,price,shipping} = state.filters 
      let tempProducts = [...all_products] 
      //filtering

      //search  
      if(text){
        tempProducts = tempProducts.filter((product)=> {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      //category
      if(category !== "all"){
        tempProducts = tempProducts.filter((product)=> product.category === category )
      }
      
      //company 
      if(company !== "all"){
        tempProducts = tempProducts.filter((product)=> product.company === company )
      }
      //color 
      if(color !== "all"){
        tempProducts = tempProducts.filter((product)=> {
          return product.colors.find((c)=> c === color)
        } )
      }
      // price
      tempProducts = tempProducts.filter((product) => product.price <= price )

      // shipping
      if(shipping){
        tempProducts = tempProducts.filter((product)=> product.shipping=== true)
      }

      

   return { ...state,filtered_products:tempProducts };
  }


  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,

      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
