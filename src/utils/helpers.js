export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

//  1. ve kısa method
export const getUniqueValues = (products,type) => {
  let unique = products.map((item)=> item[type]) 
  if(type === "colors"){
    unique = unique.flat() // colors array oldugu için bu sekilde yapıyoruz
    /* yani array içinde arrayleri sadece bir array içine alıyoruz */
    
  }
  return ["all",...new Set(unique)]
}




/* 2. ve uzun method
export const getUniqueValues = (products,type) => {
  let unique ;
  if(type === "category"){
     unique = products.reduce((first,second)=> {
         
      if(!first.includes(second.category)){
        first.push(second.category)
      }
    return first
  },["all"])
  }
  if(type === "company"){
    unique = products.reduce((first,second)=> {
         
      if(!first.includes(second.company)){
        first.push(second.company)
      }
    return first
  },["all"])

  }
  if(type === "colors"){

   unique = products.reduce((first,second)=> {
      let newSecond = second.colors.reduce((color)=> color)
       
       if(!first.includes(newSecond)){
         first.push(newSecond)
       }
     return first
   },["all"])

  }
  return unique
};
 */










     
