import { BillingAddress } from "./billingAddressFormComponent.js";
import { CartForms } from "./cartForms.js";
import { CreditcardForm } from "./creditcardFormComponent.js";
import { FreightOptions } from "./freightOptionsComponent.js";

customElements.define("cart-forms", CartForms);
customElements.define("billing-address", BillingAddress);
customElements.define("creditcard-details", CreditcardForm);
customElements.define("freight-options", FreightOptions);