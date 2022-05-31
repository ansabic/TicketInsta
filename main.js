let item = data;
let artistNames = [];
artistNames = data.map(item => item["name"]);

//load images upon start up
window.addEventListener('load', () => {
    getImagesFromJSFile();
});

//search button
document.querySelector("[data-search]").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    artistNames.forEach(data => {
      const isVisible = data.toLowerCase().includes(value);
        let element = document.getElementById(artistNames.indexOf(data));
        if(!isVisible)
        {
            element.style.display = "none";
        }
        else
        element.style.display = "block";
    })
})

getImagesFromJSFile = () => {

    for (let i = 0; i < item.length - 1; i++) 
    {
        let image = document.createElement("div");
        image.className = "img";
        image.id = i;
        image.style.display = "block";
        image.style.backgroundImage = "url(" + item[i].picture_medium + ")";
        /*image.addEventListener("dblclick", function(){
          window.open(data.results[i].links.download, '_blank');
        })*/
        document.querySelector("#grid").appendChild(image);
    }
}
