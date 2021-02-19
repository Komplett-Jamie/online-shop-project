async function getCategoriesFromApi() {
    const CategoriesUrl = "http://jamiestore.herokuapp.com/Categories";

    const curlDetails = {
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        }
    }

    let apiFetch = await fetch(CategoriesUrl, curlDetails)

    var arr = await apiFetch.json();
// var cont = document.getElementById('lower-header-container');
// var ul = document.createElement('li');

// for (i = 0; i <= arr.length - 1; i++) {
//     var li = document.createElement('li'); 
//     li.innerHTML = arr[i];   
//     ul.appendChild(li);    
// }
// cont.appendChild(ul);
// var arrayContainer = document.getElementById('category_list');
// var list = document.createElement('li');

// for (i = 0; i < arr.length; i++)    {
//     if (arr[i].parentId === null)   {
//         return (arrayContainer.innerHTML += );
//     }
// };



//         document.getElementById("lower-header-container").innerHTML += "Id: " + arr[i].id + " Name: "+ arr[i].name + " ParentId: " + arr[i].parentId + "<br>";


//     }


const mainCategories = arr.filter(category => category.parentId === null);
for (i = 0; i < mainCategories.length; i++) {
    document.getElementById("category_list").innerHTML += `<li>${mainCategories[i].name}</li>`
}

// document.getElementById("category_list").innerHTML = mainCategories.map(mainCategorie =>
    
//     `<li>${mainCategorie.name}</li>`
// )


}
