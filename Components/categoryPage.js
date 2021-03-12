
async function getProductList()  {

    const urlParams = new URLSearchParams(location.search);
    let categoryId = urlParams.get("categoryId");

    const CategoriesUrl = `http://jamiestore.herokuapp.com/Products/ByCategory/${categoryId}`;

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    var arr = await apiFetch.json();
    renderCategoryList(arr); 

}

async function renderCategoryList(arr) {

let object = arr;
let placing = document.getElementById("random-products");
for (var i = 0; i < object.length; i++) {
    placing.innerHTML += 
    `   
    <div class="random-product-cointainer">
        <a href="./../pages/productPage.html?id=${object[i].id}">
            <img class="random-product-image" alt="${object[i].description}" src="${object[i].imageUrl}">
        </a>
        <div class="product">
            <div class="product-name">
                <p>${object[i].name}</p>
            </div>
        </div>
        <div class="random-product-price-button-container">
            <p>Nå: <b>${object[i].price},-</b></p>
            <button class="add-to-cart-button" id="addToCart" onclick="checkCart(${JSON.stringify(object[i].id)})">Add to Cart</button>
        </div>
    </div>  
    `
}
}



// document.addEventListener("DOMContentLoaded", () => {
//         let options = {
//                 root: null,
//                 rootMargins: "0px",
//                 threshold: 0.5
//         };
//         const observer = new IntersectionObserver(handleIntersect, options);
//         observer.observe(document.querySelector("footer"));
//         getData();
// });

// function handleIntersect(entries) {
//         if (entries[0].isIntersecting) {
//             console.warn("something is intersecting with the viewport");
//             getData();
//         }
// }

// function getData() {
//     let main = document.querySelector("main");
//     console.log("fetch some JSON data");
//     fetch(URL)
//     .then(response => response.json())
//     .then(data => {
//         data.items.forEach(item => {
//             let fig = document.createElement("figure");
//             let fc = document.createElement("figcaption");
//             let img = document.createElement("img");
//             img.src = item.img;
//             img.alt = item.name;
//             fc.textContent = item.name;
//             fig.appendChild(img);
//             fig.appendChild(fc);
//             main.appendChild(fig);
//             });
//         });
// }


