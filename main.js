document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

apiRequest = () => {

    document.querySelector("#grid").textContent = "";

    const url = 'https://api.deezer.com/genre/0/artists';

    fetch(url ,{
        mode: 'no-cors',
        method: 'GET'
    })

        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })

        .then(data => {
            loadImages(data);
        }).catch(error => console.log(error))


}

loadImages = (data) => {
    for (let i = 0; i < data.data.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        let string = data.data[i].picture_big;
        image.style.backgroundImage = string.replace('\\',"");
        image.addEventListener("dblclick", function () {
            window.open(image.style.backgroundImage, '_blank');
        })
        document.querySelector("#grid").appendChild(image);
    }
}