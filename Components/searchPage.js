// async function getAllProductsForSearch()    {

//     const apiDetails = {
//         method: 'GET',
//         headers:    {
//             'accept': 'text/plain'
//         }
//     }
//     let apiFetch = await fetch("https://jamiestore.herokuapp.com/Products", apiDetails);
//     var arr = await apiFetch.json();

// const filterItems = (arr, query) => {
//     return arr.filter(el => {
//         if ((el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) || (el.description.toLowerCase().indexOf(query.toLowerCase()) !== -1))
//             return true 
//         else 
//             return false 
//     })
// }
// console.log(filterItems(arr, "skjerm"))
// }