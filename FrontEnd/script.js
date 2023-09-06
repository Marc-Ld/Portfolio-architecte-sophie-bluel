import {fetchWorks,fetchCategories} from "./API.js"

const works = await fetchWorks()
console.log(works) 

const categories = await fetchCategories ()
console.log(categories)

function displayGallery(works) {
    for (let i=0; i < works.length; i++) {
        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = works[i].title;
        const image = document.createElement("img");
        image.src = works[i].imageUrl;
        image.alt = works[i].title;
        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    }
}

displayGallery(works)