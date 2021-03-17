let fetchedProducts = [];

async function getProductList()  {

    const urlParams = new URLSearchParams(location.search);
    let categoryId = urlParams.get("categoryId");

    const CategoriesUrl = `https://jamiestore.herokuapp.com/Products/ByCategory/${categoryId}`;

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    var arr = await apiFetch.json();

    fetchedProducts = arr;
    renderCategoryList()
}




let baseCount = 0;
let amountOfProductsPerPage = 19;


function renderCategoryList()    {
let placing = document.getElementById("random-products");

for (var i = baseCount; i <= (amountOfProductsPerPage + baseCount - 1) ; i++) {
    console.log(i);
    let productElement = document.createElement("div");
    productElement.innerHTML = `
        <a href="./../pages/productPage.html?id=${fetchedProducts[i].id}">
            <img class="random-product-image" alt="${fetchedProducts[i].description}" src="${fetchedProducts[i].imageUrl}">
        </a>
        <div class="product">
            <div class="product-name">
                <p>${fetchedProducts[i].name}</p>
            </div>
        </div>
        <div class="random-product-price-button-container">
            <p>Nå: <b>${fetchedProducts[i].price},-</b></p>
            <button class="add-to-cart-button" id="addToCart" onclick="checkCart(${JSON.stringify(fetchedProducts[i].id)})">Add to Cart</button>
        </div>`;
    productElement.className = "random-product-cointainer";

    placing.appendChild(productElement);

    for (let ele of fetchedProducts)    {
        if (ele > fetchedProducts.length)   break;
    }
}
baseCount = baseCount + amountOfProductsPerPage;

let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
};
const observer = new IntersectionObserver(handleIntersect, options);
observer.observe(document.querySelector("footer"));

function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
        console.warn("something is intersecting with the viewport");
        renderCategoryList();
        }
    }

}