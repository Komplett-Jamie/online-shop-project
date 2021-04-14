subscribeToEvent("fetchedProduct", function(response)    {
    document.getElementById("product-Id").innerHTML = response.id;
    document.getElementById("product-name").innerHTML = response.name;
    document.getElementById("product-description").innerHTML = response.description;
    document.getElementById("product-image").innerHTML = `<img src="${response.imageUrl.replace(/200/,600)}">`
    document.getElementById("product-price").innerHTML = response.price;
})