export class SearchBar extends HTMLElement  {
    constructor()   {
        super()
    }

    connectedCallBack() {
        this.innerHTML =   
        `
        <div id="searchBar">
            <input id="search_input" type="text" placeholder="Search for products...">
        </div>

        <style>
        #search_input {
            height:35px;
            border: 1px solid blue;
            padding:10px;
            flex: 0 1 600px;
            width:100%;
        }
        </style>
        `

        
        this.querySelector("#search_input").addEventListener("onkeyup", mainPageSearchInputUser(event))
    }

    mainPageSearchInputUser(event) {
        let inputContainer = this.querySelector("#search_input").value;
    
        if (key === "Enter") {
            // publishEvent("userSearchInput", inputContainer)
            location = "./../Pages/searchPage.html";

    }}
}