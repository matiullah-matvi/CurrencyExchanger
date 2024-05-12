const exchangeUrl = "https://api.exchangerate-api.com/v4/latest/USD"; 
const dropdown = document.querySelector(".dropdown select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

let dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".btn");

dropdowns.forEach((select) => {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode == "PKR") {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    });

});

const updateExchange = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal == " " || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    let response = await fetch(exchangeUrl); // Fetch exchange rates from the API
    let data = await response.json();
    let rate = data.rates[toCurrency.value];

    let finalAmount = amountVal * rate;

    let msg = document.querySelector(".msg");

    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

function updateFlage(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {

    evt.preventDefault();
    updateExchange();
});

const exchangeUrl = "https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector(".btn");

dropdowns.forEach((select) => {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);

        if (select.name === "to" && currCode === "PKR") {
            newOption.selected = true;
        }
    }

    select.addEventListener("change", () => {
        updateFlage(select);
        if (select.name === "from") {
            updateExchange(); // Update exchange rates whenever "from" currency changes
        }
    });
});

const updateExchange = async () => {
    const amount = parseFloat(document.querySelector(".amount input").value) || 1;

    const fromCurrency = document.querySelector(".from select").value;
    const toCurrency = document.querySelector(".to select").value;

    const response = await fetch(exchangeUrl);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    const finalAmount = amount * rate;

    const msg = document.querySelector(".msg");

    msg.innerText = `${amount} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
};

function updateFlage(element) {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchange();
});

