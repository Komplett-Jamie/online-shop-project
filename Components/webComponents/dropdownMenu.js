export class DropdownMenu extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
        <div id="lower-header-container">
        <ul id="category_list">
        </ul>
        </div>

    <style>
    #category_list  {
        position: absolute;
        display:flex;
        justify-content: space-evenly;
        list-style-type: none;
        padding: 8px;
        background-color: azure;
        width:100vw;
        cursor: pointer;
        }
    
    
    .dropdown .submenu{
        display:none;
        list-style-type: none;
        position:absolute;
        width:100%;
        height:100%;
    }
    
    .dropdown:hover > .submenu{
        display:block;
        list-style-type: none;
        position:relative;
    }
    
    #category_list .dropdown .submenu:hover{
        display:block;
        padding-bottom: 50px;
    
    }
    
    #category_list .dropdown .submenu > .dropdown .submenu{
        display:none;
        padding-left:10px;
    }
    
    #category_list .dropdown .submenu .dropdown:hover > .submenu{
        display:block;
        position: absolute;
        left:100%;
        top:0;
    }
    
    a{
        text-decoration: none;
    }
    
    </style>
        `;
        subscribeToEvent(
            "categoryCall",
            function (categoryCall) {
                this.makeCategoryTree(categoryCall);
            }.bind(this)
        );
    }

    makeCategoryTree(categoryCall) {
        var arr = categoryCall;
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

        for (var i = 0; i < categoryTree.length; i++) {
            var extractedCategory = categoryTree[i];
            this.renderCategory(
                extractedCategory,
                this.querySelector("#category_list")
            );
        }
    }

    renderCategory(category, parent) {
        var listItem = document.createElement("li");
        listItem.innerHTML = category.name;
        listItem.className = "dropdown";

        var categoryLink = document.createElement("li");
        categoryLink.innerHTML =
            `<a href="categoryPage.html?categoryId=${category.id}">` +
            category.name +
            `</a>`;

        var unorderedList = document.createElement("ul");
        unorderedList.className = "submenu";

        if (category.children.length > 0) {
            parent.appendChild(listItem);
            listItem.appendChild(unorderedList);
        } else parent.appendChild(categoryLink);

        for (var i = 0; i < category.children.length; i++) {
            var extractedSubCategory = category.children[i];
            this.renderCategory(extractedSubCategory, unorderedList);
        }
    }
}
