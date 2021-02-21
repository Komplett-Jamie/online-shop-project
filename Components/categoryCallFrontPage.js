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

    const mainCategories = arr.filter(category => category.parentId === null);

        for (i = 0; i < mainCategories.length; i++) {
        document.getElementById("category_list").innerHTML += `<li id="first_level_category_list"><button>${mainCategories[i].name}</button></li>`
        };

        //subcatergories

        // var newArray = [];

        // for (j = 0; j < arr.length; j++ )   {
        //     var id = arr[j].id;
        //     var parentId = arr[j].parentid;
            
        //     if (id === parentId)    {
        //         newArray.push(arr);
        //     }
        // }
        // console.log(newArray);

        var map = {};
        var node = {};
        var roots = [];
 
        for (j = 0; j < arr.length; j += 1) {
            map[arr[j].id] = j;
            arr[j].children = [];
        }

        for (j = 0; j < arr.length; j += 1) {
            node = arr[j];
            if (node.parentId !== null) {
            arr[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        console.log(node);


}