//This declaration lets checkoutList be mutable and persistent on screen changes
let checkoutList = JSON.parse(sessionStorage.getItem("checkoutList")) || [];

const greyHat = {name: "Grey hat", size: "S", price: 125};
const stripedBobbleHat = {name: "Striped bobble hat", size: "M", price: 140};
const greyMittens = {name: "Grey mittens", size: "M", price: 135};
const whiteScarf = {name: "White scarf", size: "M", price: 120};
const darkGreySocks = {name: "Dark-grey socks", size: "M", price: 90};
const pinkSocks = {name: "Pink socks", size: "L", price: 90};
const beigeSweater = {name: "Beige sweater", size: "L", price: 350};
const pinkPatternButtonUp = {name: "Pink pattern button-up", size: "L", price: 400};

const customerName = document.getElementById("name")
const contact = document.getElementById("contact")
const pickupPassword = document.getElementById("pp")

const qName = document.getElementById("question-name")
const qEmail = document.getElementById("question-email")
const qText = document.getElementById("question-text")

const validDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "live.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
    "gmx.com"
];

//Pushing items to the checkout array
function pushCheckout(item) {
    if (checkoutList.length <= 20) {
    checkoutList.push(item)
    console.log(checkoutList)
    saveCheckout();
    }

    else {
        alert("You may not have more than 20 items in your cart, please checkout first")
    }
}

//Ensures the checkoutList is correctly formatted and stored
function saveCheckout() {
    sessionStorage.setItem("checkoutList", JSON.stringify(checkoutList));
}

//Display checkout items
function displayCheckout() {
    const checkoutDisplay = document.getElementById("checkoutDisplay");

    if (!checkoutDisplay) return;
    checkoutDisplay.innerHTML = "";

    if (checkoutList.length === 0) {
        checkoutDisplay.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    checkoutList.forEach((item) => {
        const line = document.createElement("p");
        line.textContent = `${item.name} - ${item.size} - R${item.price}`;
        checkoutDisplay.appendChild(line);
    });
}

//Add to checkout button logic vvv
const greyHatButton = document.getElementById("addGreyHat");
if (greyHatButton) {
    greyHatButton.addEventListener("click", function () {
        pushCheckout({...greyHat})
    })
}
const stripedBobbleHatButton = document.getElementById("addStripedBobbleHat");
if (stripedBobbleHatButton) {
    stripedBobbleHatButton.addEventListener("click", function () {
        pushCheckout({...stripedBobbleHat})
    })
}
const greyMittensButton = document.getElementById("addGreyMittens");
if (greyMittensButton) {
    greyMittensButton.addEventListener("click", function () {
        pushCheckout({...greyMittens})
    })
}
const whiteScarfButton = document.getElementById("addWhiteScarf");
if (whiteScarfButton) {
    whiteScarfButton.addEventListener("click", function () {
        pushCheckout({...whiteScarf})
    })
}
const darkGreySocksButton = document.getElementById("addDarkGreySocks");
if (darkGreySocksButton) {
    darkGreySocksButton.addEventListener("click", function () {
        pushCheckout({...darkGreySocks})
    })
}
const pinkSocksButton = document.getElementById("addPinkSocks");
if (pinkSocksButton) {
    pinkSocksButton.addEventListener("click", function () {
        pushCheckout({...pinkSocks})
    })
}
const beigeSweaterButton = document.getElementById("addBeigeSweater");
if (beigeSweaterButton) {
    beigeSweaterButton.addEventListener("click", function () {
        pushCheckout({...beigeSweater})
    })
}
const pinkPatternButtonUpButton = document.getElementById("addPinkPatternButtonUp");
if (pinkPatternButtonUpButton) {
    pinkPatternButtonUpButton.addEventListener("click", function () {
        pushCheckout({...pinkPatternButtonUp})
    })
}
document.addEventListener("DOMContentLoaded", function () {
    displayCheckout();
});

//Lightbox logic vvv
const triggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close');

triggers.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        lightboxImage.src = this.href;
        lightbox.style.display = 'flex'
    })
})

if (lightbox) {
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    })
}

if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
    })
}

//Search logic done as class project vvv
const textSearch = document.getElementById("textSearch");
const accordionToggle = document.querySelector(".accordionToggle");
const sizeAccordion = document.getElementById("sizeAccordion");
const sizeOptions = document.querySelectorAll(".sizeOption");
let selectedSize = "all";

function applySizeFilter() {
    const textSearchContent = textSearch ? textSearch.value.trim().toLowerCase() : "";
    const catalogueElements = document.querySelectorAll(".catalogueItem");

    catalogueElements.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        const itemSize = (item.dataset.size || "all").toLowerCase();
        const matchesText = !textSearchContent || text.includes(textSearchContent);
        const matchesSize = selectedSize === "all" || itemSize === selectedSize;

        item.style.display = matchesText && matchesSize ? "block" : "none";
    });
}

if (textSearch) {
    textSearch.addEventListener("keyup", applySizeFilter);
}

if (accordionToggle && sizeAccordion) {
    accordionToggle.addEventListener("click", function () {
        const isOpen = sizeAccordion.classList.toggle("open");
        accordionToggle.setAttribute("aria-expanded", String(isOpen));
        sizeAccordion.setAttribute("aria-hidden", String(!isOpen));
        accordionToggle.querySelector(".accordionIndicator").textContent = isOpen ? "▴" : "▾";
    });
}

sizeOptions.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedSize = this.dataset.size;

        sizeOptions.forEach(function (option) {
            option.classList.toggle("active", option === button);
        });

        sizeAccordion.classList.remove("open");
        accordionToggle.setAttribute("aria-expanded", "false");
        sizeAccordion.setAttribute("aria-hidden", "true");
        accordionToggle.querySelector(".accordionIndicator").textContent = "▾";

        applySizeFilter();
    });
});

//Form logic vvv
const checkoutForm = document.querySelector('form[name="checkoutForm"]');

//Checks that all fields contain valid information in checkout
function formValidationCheckout() {
    if (checkoutList.length < 1) {
        alert("Please add at least one item to checkout")
        return false;
    }

    if (customerName.value.trim().length < 3) {
        alert("Your name must be at least three characters.")
        return false;
    }

    const contactValue = contact.value.trim()
    if (contactValue === "") {
        alert("Please enter your phone number or email")
        return false;
    }

    if (contactValue.includes("@")) {
        let domainValid = false
        for (let i = 0; i < validDomains.length; i++) {
            if (contactValue.toLowerCase().endsWith(validDomains[i])) {
                domainValid = true
            }
        }
        if (!domainValid) {
            alert("Your domain is invalid")
            return false;
        }   
    } 
    
    else {
        if (!/^\d{10}$/.test(contactValue)) {
            alert("Please enter a valid 10-digit phone number or email address.");
            return false;}
    }
    
    if (pickupPassword.value.trim().length < 5) {
        alert("Your password must be at least five characters.")
        return false;
    }

    return true;
}

//Validation for FAQ
function formValidationFAQ() {
    if (qName.value.trim().length < 3) {
        alert("Your name must be at least three characters.")
        return false;
    }

    const qEmailValue = qEmail.value.trim()
    if (!qEmailValue.includes("@")) {
        alert("Please enter your email")
        return false;
    }

    else {
        let domainValid = false
        for (let i = 0; i < validDomains.length; i++) {
            if (qEmailValue.toLowerCase().endsWith(validDomains[i])) {
                domainValid = true
            }
        }
        if (!domainValid) {
            alert("Your domain is invalid")
            return false;
        }   
    }

    if (qText.value.trim() === "") {
        alert("Please enter a message")
        return false;
    }

    return true;
}
function saveDate () {
    const dateGrab = new Date() 
    const dateNow = dateGrab.toLocaleDateString("en-ZA")
    return dateNow
}

//InnerHTML covered in class
function placeOrder() {
    if (formValidationCheckout() === true) {
        const invoiceField = document.getElementById("invoiceField");

        if (!invoiceField) return;

        const subtotal = checkoutList.reduce((sum, item) => sum +item.price, 0)
        const vat = subtotal * 0.15
        const total = subtotal + vat
        const dateInvoice = saveDate()

        const invoiceHTML = `
        <h2>Your Invoice</h2>
        <p><strong>Name:</strong> ${customerName.value}</p>
        <p><strong>Contact:</strong> ${contact.value}</p>
        <p><strong>Pickup Password:</strong> ${pickupPassword.value}</p>
        <p><strong>Date Ordered:</strong> ${dateInvoice}</p>

        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${checkoutList.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.size}</td>
                        <td>R${item.price}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <p><strong>Subtotal:</strong> R${subtotal}</p>
        <p><strong>VAT (15%):</strong> R${vat.toFixed(2)}</p>
        <p><strong>Total:</strong> R${total.toFixed(2)}</p>
    `;

    invoiceField.innerHTML = invoiceHTML;
    invoiceField.style.display = "block";

        customerName.value = "", contact.value = "", pickupPassword.value = ""

        checkoutList = [];
        sessionStorage.removeItem("checkoutList");
        displayCheckout()
        alert("Please save your invoice below")
    }
}

//Checkout form submission
if (checkoutForm) {
  checkoutForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const cartData = document.getElementById("cartData");
    if (cartData) cartData.value = JSON.stringify(checkoutList);

    const formData = new FormData(checkoutForm);

    if (!formValidationCheckout()) {
        return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        alert("Order placed");
        placeOrder();
        checkoutForm.reset();
      } else {
        alert("There was a problem submitting your order.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }
  });
}

//FAQ form submission
const faqForm = document.querySelector('form[name="faqForm"]');

if (faqForm) {
  faqForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(faqForm);

    if(!formValidationFAQ()) {
        return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        alert("Your question has been submitted for review");
        faqForm.reset();
      } else {
        alert("There was a problem sending your question.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }
  });
}