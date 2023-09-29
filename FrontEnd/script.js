import {fetchWorks,fetchCategories} from "./API.js"

const works = await fetchWorks()
console.log(works) 

const categories = await fetchCategories ()
console.log(categories)

function displayGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML="";
    for (let i=0; i < works.length; i++) {
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

function displayFilters(categories) {
    const filter = document.querySelector(".filter");
    const button = document.createElement("button");
    button.textContent = "Tous";
    button.addEventListener("click", ()=> {displayGallery(works)});
    filter.appendChild(button);
    for (let i=0; i < categories.length; i++) {
        const button = document.createElement("button");
        button.textContent = categories[i].name ;
        button.addEventListener("click",()=>{
            const filterWorks = works.filter( (work) => { return work.categoryId===categories[i].id});
            console.log("coucou",filterWorks);
            displayGallery(filterWorks);
        })
        filter.appendChild(button);
    }
}
displayFilters(categories)

displayGallery(works)