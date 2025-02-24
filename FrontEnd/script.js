import {fetchWorks,fetchCategories} from "./API.js"
import {initModal} from "./modal.js"
const works = await fetchWorks()
const categories = await fetchCategories ()


export async function displayGallery(works) {
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

displayGallery(works)

function initEditMode() {
    const authentificationToken = sessionStorage.getItem("authentificationToken");
    if (authentificationToken){
        const logout = document.querySelector(".aLogin")
        logout.textContent = "logout"
        logout.setAttribute ("href","")
        logout.addEventListener("click", async()=> {
            sessionStorage.removeItem("authentificationToken")
            logout.textContent = "login"
        })
        const edit = document.querySelector(".editMode");
        const button = document.createElement("button");
        const icon = document.createElement("i");
        icon.setAttribute("class","fa-regular fa-pen-to-square");
        button.textContent = "modifier" ;
        edit.appendChild(button);
        button.appendChild(icon);
        button.addEventListener("click" ,async()=> {
            const modal = document.querySelector(".modal");
            modal.classList.add("modalDisplay");
            await initModal()
        })
    }
    else {
        displayFilters(categories)
    }
}

initEditMode()

function initCloseModal() {
    const close = document.querySelector(".close");
    close.addEventListener("click" , ()=>{
        const title = document.querySelector(".modalTitle")
        const displayGallery = document.querySelector(".modalGallery")
        const line = document.querySelector(".line")
        const modalButton = document.querySelector(".modalButton")
        const modal = document.querySelector(".modal");
        const addPhoto = document.querySelector(".modalAdd")
        const form = document.querySelector("#form")
        const image = document.querySelector(".img-area")
        modal.classList.remove("modalDisplay");
        displayGallery.classList.remove("modalGalleryOff")
        line.classList.remove ("modalGalleryOff")
        modalButton.classList.remove ("modalGalleryOff")
        addPhoto.classList.remove("modalAddOn")
        image.innerHTML = ""
        image.classList.remove ("active")
        form.reset()
    })
}

initCloseModal()



