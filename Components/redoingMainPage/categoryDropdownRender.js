// subscribeToEvent("categoryCall", function(categoryCall) {
//     makeCategoryTree(categoryCall);
// })

// function makeCategoryTree(categoryCall) {
//     var arr = categoryCall;
//     var mapObject = {};
//     var node = {};
//     var categoryTree = [];

//     for (var j = 0; j < arr.length; j += 1) {
//         mapObject[arr[j].id] = j;
//         arr[j].children = [];
//     }

//     for (var j = 0; j < arr.length; j += 1) {
//         node = arr[j];
//         if (node.parentId !== null) {
//         arr[mapObject[node.parentId]].children.push(node);
//         } else {
//             categoryTree.push(node);
//         }
//     }

//     for (var i = 0; i < categoryTree.length; i++)  {
//         extractedCategory = categoryTree[i];
//         renderCategory(extractedCategory, document.getElementById("category_list"));
//     }
// }

// function renderCategory(category, parent)   {
//     var listItem = document.createElement("li");
//     listItem.innerHTML = category.name;
//     listItem.className = "dropdown"

//     var categoryLink = document.createElement("li");
//     categoryLink.innerHTML = `<a href="categoryPage.html?categoryId=${category.id}">`+category.name+`</a>`;

//     var unorderedList = document.createElement("ul");
//     unorderedList.className = "submenu"

//     if (category.children.length > 0)   {
//         parent.appendChild(listItem);
//         listItem.appendChild(unorderedList);
//     }   else parent.appendChild(categoryLink);

//     for (var i = 0; i < category.children.length; i++)  {
//         extractedSubCategory = category.children[i];
//         renderCategory(extractedSubCategory, unorderedList);
//     }
// }