import { BigCart } from "./bigCartComponent.js";
import { BillingAddress } from "./billingAddressFormComponent.js";
import { CartForms } from "./cartForms.js";
import { CartItem } from "./CartItem.js";
import { CartSummary } from "./cartSummaryComponent.js";
import { ConfirmButton } from "./confirmCartButtonComponent.js";
import { CreditcardForm } from "./creditcardFormComponent.js";
import { FreightOptions } from "./freightOptionsComponent.js";

customElements.define("cart-forms", CartForms);
customElements.define("billing-address", BillingAddress);
customElements.define("creditcard-details", CreditcardForm);
customElements.define("freight-options", FreightOptions);
customElements.define("cart-summary", CartSummary);
customElements.define("cart-button", ConfirmButton);
customElements.define("big-cart", BigCart);
customElements.define("cart-item", CartItem);