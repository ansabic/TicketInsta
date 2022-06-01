const empty_tag = "message_empty";
const error_message = "Nema pronađenih rezultata!";

let artistNames = [];
artistNames = data.map(item => item["name"]);

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
    //image.style.backgroundSize = "fill";
    image.style.display = "block";
    image.style.backgroundImage = "url(" + data[i].picture_medium + ")";

    let button = document.createElement("div");
    button.className = "button";
    button.textContent = "KUPI";
    button.id = "button"+i.toString();

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

    imageContainer.appendChild(image);
    imageContainer.appendChild(button);
    imageContainer.appendChild(nameText);
    imageContainer.appendChild(locationName);
    imageContainer.appendChild(date);
    imageContainer.appendChild(price);
    imageContainer.appendChild(locationDesc);
    imageContainer.appendChild(dateDesc);
    imageContainer.appendChild(priceDesc);

    button.addEventListener("click",(event) => {
        document.getElementById("popup").style.display = "block";
        document.getElementById(event.currentTarget.id).style.display = "none";
    });

    return imageContainer;
}

function createEmptyElement() {
    let message = document.createElement("div");
    message.className = "centerText";
    message.id = empty_tag;
    message.style.display = "none";
    message.textContent = error_message;
    document.querySelector("#centerText").appendChild(message);
}

function getImagesFromJSFile() {
    for (let i = 0; i < data.length; i++) {
        let image = createImageByDataElement(i);
        document.querySelector("#grid").appendChild(image);
    }
    createEmptyElement();
}