import { fetchWorks } from "./API.js";


export function initModalTitle() {
    const modalContent = document.querySelector(".modalTitle");
    modalContent.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = "Galerie Photo"
    modalContent.appendChild(title);
}

function displayPhotos(works){
    const galleryPhoto = document.querySelector(".modalGallery")
    galleryPhoto.innerHTML="";
    for (let i=0; i< works.length; i++){
        const image = document.createElement("img");
        image.src = works[i].imageUrl;
        image.alt = works[i].title;
        galleryPhoto.appendChild(image);
    }
}

function addPhoto(){
    const add = document.querySelector(".modalButton")
    add.addEventListener ("click",async()=> {
        const modalContent = document.querySelector(".modalTitle")
        modalContent.innerHTML = "" ;
        const title = document.createElement("h2")
        const galleryPhoto = document.querySelector(".modalGallery")
        const line = document.querySelector(".line")
        const modalButton = document.querySelector(".modalButton")
        line.classList.add ("modalGalleryOff")
        modalButton.classList.add ("modalGalleryOff")
        galleryPhoto.classList.add("modalGalleryOff")
        const addPhoto = document.querySelector(".modalAdd")
        addPhoto.classList.add("modalAddOn")
        title.textContent = "Ajout Photo"
        modalContent.appendChild(title)
    })
}

export async function initModal () {
    const works = await fetchWorks()
    initModalTitle()
    displayPhotos(works)
    addPhoto()
}