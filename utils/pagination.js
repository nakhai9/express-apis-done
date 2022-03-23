

// interface Pagination{
//      maxItems: number;
//      pageCurrent: number;
//      list: number[]; 
//    }
   
//    function pagination({maxItems, pageCurrent, list}: Pagination){
   
//      const delta = (list.length / maxItems) - Math.floor(list.length / maxItems);
   
//      let maxPage: number;
   
//      // Tong so trang phai co
//      if( delta > 0){
//        maxPage = Math.floor(list.length / maxItems) +1;
//      } else{
//        maxPage = Math.floor(list.length / maxItems);
//      }
   
//      return list.slice((pageCurrent - 1) * maxItems, pageCurrent * maxItems)
     
//    }
   
//    console.log(pagination({maxItems: 3, pageCurrent: 3, list: data}))

export const pagination = (maxItems, pageCurrent, list)=>{
     // Sai so 
     const delta = (list.length / maxItems) - Math.floor(list.length / maxItems);
     let maxPage;
     
     // Tong so trang phai co
     if( delta > 0){
       maxPage = Math.floor(list.length / maxItems) +1;
     } else{
       maxPage = Math.floor(list.length / maxItems);
     }

     return list.slice((pageCurrent - 1) * maxItems, pageCurrent * maxItems)
}