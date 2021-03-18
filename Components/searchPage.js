
async function getAllProductsForSearch()    {

    let allProducts = [];

    await fetch("https://jamiestore.herokuapp.com/Products")
    .then (response => allProducts.push(response))
    .then (console.log(response));
}






var __POSTS = [ 
	{ id: 1, title: 'Apple', description: 'Description of post 1' }, 
	{ id: 2, title: 'Orange', description: 'Description of post 2' }, 
	{ id: 3, title: 'Guava', description: 'Description of post 3' }, 
	{ id: 4, title: 'Banana', description: 'Description of post 4' }
];

var __FOUND = __POSTS.find(function(post, index) {
	if(post.title == 'Guava')
		return true;
});

// On success __FOUND will contain the complete element (an object)
// On failure it will contain undefined  
console.log(__FOUND); // { id: 3, title: 'Guava', description: 'Description of post 3' }