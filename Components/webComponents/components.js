import { UserControls } from "./userControls.js";
import { Header } from "./headerComponent.js";
import { Footer } from "./footerComponent.js";
import { ShopPage } from "./shopPage.js";
import { RandomProducts } from "./randomProducts.js";
import { DropdownMenu } from "./dropdownMenu.js";
import { SearchBar } from "./searchBar.js";
import { UserLogin } from "./userLogin.js";

customElements.define("custom-header", Header);
customElements.define("user-controls", UserControls);
customElements.define("custom-footer", Footer);
customElements.define("shop-page", ShopPage);
customElements.define("random-products", RandomProducts);
customElements.define("dropdown-menu", DropdownMenu);
customElements.define("search-bar", SearchBar);
customElements.define("user-login", UserLogin);