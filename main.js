const empty_tag = "message_empty";
const error_message = "Nema pronađenih rezultata!";

let artistNames = [];
artistNames = data.map(item => item["name"]);

let resultDict = {};

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


window.addEventListener('load', () => {
    getImagesFromJSFile();
});

function handleElementVisibility(isVisible, element) {
    if (!isVisible) {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

document.querySelector("[data-search]").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    let visibleItemsCount = 0;
    artistNames.forEach(data => {
        const isVisible = data.toLowerCase().includes(value);
        if (isVisible) {
            visibleItemsCount++;
        }
        let element = document.getElementById(artistNames.indexOf(data).toString());
        handleElementVisibility(isVisible, element);
    });
    handleEmptyState(visibleItemsCount);
})

function handleEmptyState(visibleItemsCount) {
    let errorMessage = document.getElementById(empty_tag);
    handleElementVisibility(visibleItemsCount === 0, errorMessage);

}

function createImageByDataElement(i) {
    let imageContainer = document.createElement("div");
    imageContainer.id = i.toString();
    imageContainer.className = "imageContainer";

    let image = document.createElement("div");
    image.className = "img";
    image.style.display = "block";
    image.style.backgroundImage = "url(" + data[i].picture_medium + ")";

    let button = document.createElement("div");
    button.className = "button";
    button.textContent = "KUPI";
    button.id = "button" + i.toString();

    let nameText = document.createElement("div");
    nameText.className = "title";
    nameText.textContent = data[i]["name"];

    let locationName = document.createElement("div");
    locationName.className = "location";
    locationName.textContent = cities[Math.floor(Math.random() * cities.length)];

    let date = document.createElement("div");
    date.className = "date";
    let now = new Date();
    date.textContent = now.addDays(Math.floor(Math.random() * 60)).toLocaleDateString("de-DE");

    let price = document.createElement("div");
    price.className = "price";
    price.textContent = Math.floor(350 * Math.random() + 250).toString() + " KN";

    let dateDesc = document.createElement("div");
    dateDesc.className = "descriptionDate";
    dateDesc.textContent = "Lokacija:";

    let locationDesc = document.createElement("div");
    locationDesc.className = "descriptionLocation";
    locationDesc.textContent = "Datum:";

    let priceDesc = document.createElement("div");
    priceDesc.className = "descriptionPrice";
    priceDesc.textContent = "Cijena:";

    resultDict[i] = {
        "name": nameText.textContent,
        "location": locationName.textContent,
        "date": date.textContent,
        "price": price.textContent,
        "picture": data[i].picture_xl
    };

    imageContainer.appendChild(image);
    imageContainer.appendChild(button);
    imageContainer.appendChild(nameText);
    imageContainer.appendChild(locationName);
    imageContainer.appendChild(date);
    imageContainer.appendChild(price);
    imageContainer.appendChild(locationDesc);
    imageContainer.appendChild(dateDesc);
    imageContainer.appendChild(priceDesc);

    imageContainer.addEventListener("click", (ev) => {
        document.getElementById("grid").style.opacity = "0.3";
        document.getElementById("container").style.pointerEvents = "none";
        addDataToPopup(ev.currentTarget.id);
        document.getElementById("popup").classList.add("show");
    });

    return imageContainer;
}

function addDataToPopup(id) {
    let columnGroup = document.createElement("div");
    columnGroup.id = "group";
    columnGroup.className = "column";

    let name = document.createElement("div");
    name.textContent = resultDict[id]["name"];
    name.className = "result";

    let location = document.createElement("div");
    location.textContent = resultDict[id]["location"];
    location.className = "result";

    let date = document.createElement("div");
    date.textContent = resultDict[id]["date"];
    date.className = "result";

    let price = document.createElement("div");
    price.textContent = resultDict[id]["price"];
    price.className = "result";

    let rowGroup1 = document.createElement("div");
    rowGroup1.id = "rowGroup1";
    rowGroup1.className = "rowGroup";

    let rowGroup2 = document.createElement("div");
    rowGroup2.id = "rowGroup2";
    rowGroup2.className = "rowGroup";

    let image = document.createElement("div");
    image.style.backgroundImage = "url(" + data[id]["picture"] + ")";
    image.className = "resultImg";

    rowGroup1.appendChild(name);
    rowGroup1.appendChild(date);
    rowGroup2.appendChild(location);
    rowGroup2.appendChild(price);

    columnGroup.appendChild(image);
    columnGroup.appendChild(rowGroup1);
    columnGroup.appendChild(rowGroup2);

    document.getElementById("column").appendChild(columnGroup);
}

function createEmptyElement() {
    let message = document.createElement("div");
    message.className = "centerText";
    message.id = empty_tag;
    message.style.display = "none";
    message.textContent = error_message;
    document.querySelector("#centerText").appendChild(message);
}

function addListeners() {
    document.getElementById("cancelButton").addEventListener("click", () => {
        document.getElementById("grid").style.opacity = "1";
        document.getElementById("popup").classList.remove("show");
        emptyFieldsAndClear();
    });
    document.getElementById("acceptButton").addEventListener("click", () => {
        confirmation();
    });
}

function showSuccess() {
    document.getElementById("popup").classList.remove("show");
    document.getElementById("successPopup").classList.add("show");
    setTimeout(() => {
        document.getElementById("grid").style.opacity = "1";
        document.getElementById("successPopup").classList.remove("show");
    }, 2500);
}

function showError() {
    document.getElementById("popupError").classList.add("show");
}

function confirmation() {
    let nameValid = document.getElementById("name").value.length !== 0;
    let surnameValid = document.getElementById("surname").value.length !== 0;
    let emailValid = (document.getElementById("email").value.length !== 0) && (document.getElementById("email").value.includes("@"));
    let cardNumberValid = document.getElementById("cardNumber").value.toString().length === 16;

    if (nameValid && surnameValid && emailValid && cardNumberValid) {
        showSuccess();
        emptyFieldsAndClear();
    } else {
        showError();
    }
}

function emptyFieldsAndClear() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("popupError").classList.remove("show");
    document.getElementById("container").style.pointerEvents = "auto";
    document.getElementById("group").remove();
}

function getImagesFromJSFile() {
    for (let i = 0; i < data.length; i++) {
        let image = createImageByDataElement(i);
        document.querySelector("#grid").appendChild(image);
    }
    createEmptyElement();
    addListeners();
}