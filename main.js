document.querySelector("#input").addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

/*apiRequest = () => {

    document.querySelector("#grid").textContent = "";

    const url = 'https://pokeapi.co/api/v2/pokemon-color/yellow/';

    fetch(url ,{
        //mode: 'no-cors',
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
        //let string = data.data[i].picture_big;
        //let properImage = string.replace('\\',"");
        image.style.backgroundImage = "url("+data.data[i].urls.raw + "&w=1366&h=768" +")";
        image.addEventListener("dblclick", function () {
            window.open(image.style.backgroundImage, '_blank');
        })
        document.querySelector("#grid").appendChild(image);
    }
}*/

apiRequest = () => {
    for(let i = 0;i < data.length;i++){

      let image = document.createElement("div");
      image.className = "img";
      image.style.backgroundImage = data.picture_medium;
      /*image.addEventListener("dblclick", function(){
        window.open(element.data[i].links.download, '_blank');
      })*/
      document.querySelector("#grid").appendChild(image);
    }
  }
