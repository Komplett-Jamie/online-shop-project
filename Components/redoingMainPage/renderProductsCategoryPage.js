subscribeToEvent("categoryCallPageApiReturn", function(response)    {

    let baseCount = 0;
    let amountOfProductsPerPage = 19;
    let placing = document.getElementById("random-products");

    for (var i = baseCount; i <= (amountOfProductsPerPage + baseCount - 1) ; i++) {
        let productElement = document.createElement("div");
        productElement.innerHTML = `
            <a href="./../Pages/productPage.html?id=${response[i].id}">
                <img class="random-product-image" alt="${response[i].description}" src="${response[i].imageUrl}">
            </a>
            <div class="product">
                <div class="product-name">
                    <p>${response[i].name}</p>
                </div>
            </div>
            <div class="random-product-price-button-container">
                <p>Nå: <b>${response[i].price},-</b></p>
                <button class="add-to-cart-button" id="addToCart" onclick="checkCart(${JSON.stringify(response[i].id)})">Add to Cart</button>
            </div>`;
        productElement.className = "random-product-cointainer";

        placing.appendChild(productElement);

        for (let ele of response)    {
            if (ele > response.length)     
                break;
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
})