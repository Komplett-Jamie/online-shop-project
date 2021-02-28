async function getCategoriesFromApi() {
    const CategoriesUrl = "http://jamiestore.herokuapp.com/Categories";

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    var arr = await apiFetch.json();
    var fetchedArray = arr;
    makeCategoryTree(fetchedArray);
}

function makeCategoryTree(fetchedArray) {
    var arr = fetchedArray;
    var mapObject = {};
    var node = {};
    var categoryTree = [];

    for (var j = 0; j < arr.length; j += 1) {
        mapObject[arr[j].id] = j;
        arr[j].children = [];
    }

    for (var j = 0; j < arr.length; j += 1) {
        node = arr[j];
        if (node.parentId !== null) {
        arr[mapObject[node.parentId]].children.push(node);
        } else {
            categoryTree.push(node);
        }
    }

    for (var i = 0; i < categoryTree.length; i++)  {
        extractedCategory = categoryTree[i];
        renderCategory(extractedCategory, document.getElementById("category_list"));
    }
}

function renderCategory(category, parent)   {
    var listItem = document.createElement("li");
    listItem.innerHTML = category.name;
    var categoryLink = document.createElement("a");
    categoryLink.innerHTML = category.name;
    categoryLink.setAttribute("href", `/Pages/categoryPage.html?categoryId=${category.id}`);


    if (category.children.length > 0)   {
        parent.appendChild(listItem);
    }   else parent.appendChild(categoryLink);

    for (var i = 0; i < category.children.length; i++)  {
        extractedSubCategory = category.children[i];
        renderCategory(extractedSubCategory, listItem);
    }
}

async function getRandomProducts()  {
    const CategoriesUrl = "http://jamiestore.herokuapp.com/Products/Random/10";

    const curlDetails = 
    {
        method: 'GET',
    };

    let apiFetch = await fetch(CategoriesUrl, curlDetails);
    let randomProductObject = await apiFetch.json();
    renderRandomProducts(randomProductObject);
}

function renderRandomProducts(randomProductObject) {
    let object = randomProductObject;
    let placing = document.getElementById("random-products");

    for (var i = 0; i < object.length; i++) {
        placing.innerHTML += 
        `<a href="./../pages/productPage.html?id=${object[i].id}">
            <div class="product">
                <div class="product-name">
                    <p>${object[i].name}</p>
                </div>
                <br>
                <img alt="${object[i].description}" src="${object[i].imageUrl}">
                <p>Nå: <b>${object[i].price},-</b></p>
                </a>
                <button>Add to cart</button>
            </div>
        `
    }
}