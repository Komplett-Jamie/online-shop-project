class divApi    {
    constructor()   {
        this.baseUrl = "https://jamiestore.herokuapp.com/"; 
    }

    async get(path)   {
        let apiFetch = await fetch(this.baseUrl + path);
        return apiFetch;
    }

    async Categories()    {
        return await this.get("Categories");
    }
}


const CategoriesUrl = "https://jamiestore.herokuapp.com/Categories";

const curlDetails = {
    method: 'GET',
    headers: {
        'accept': 'text/plain'
    }
}

let apiFetch = await fetch(CategoriesUrl, curlDetails);
var response = await apiFetch.json();