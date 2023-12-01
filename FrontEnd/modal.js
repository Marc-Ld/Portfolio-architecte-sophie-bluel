import { fetchWorks,fetchCategories } from "./API.js";

let projectImage ;
let projectTitle ;
let projectCategory ;

function initModalTitle() {
    const modalContent = document.querySelector(".modalTitle");
    modalContent.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = "Galerie Photo"
    modalContent.appendChild(title);
    const prev = document.querySelector(".previous")
    prev.classList.add("modalGalleryOff")
}

function displayPhotos(works){
    const galleryPhoto = document.querySelector(".modalGallery")
    galleryPhoto.innerHTML="";
    for (let i=0; i< works.length; i++){
        const image = document.createElement("img");
        const deleteIcon = document.createElement("button")
        image.src = works[i].imageUrl;
        image.alt = works[i].title;
        galleryPhoto.appendChild(image);
        galleryPhoto.appendChild(deleteIcon);
        deleteIcon.addEventListener("click", async(event)=>{
            console.log(works[i].id)
            const UserId = sessionStorage.getItem("authentificationToken")
            
            try {
                const response = await fetch(`http://localhost:5678/api/works/${works[i].id}`,
                {
                    method : "DELETE",
                    headers : {
                        Authorization : `Bearer ${UserId}`,
                    }
                });
                if (response.ok){
                    displayPhotos(works)
                } else {
                    alert("Erreur lors de la supression")
                }
            } catch (error){
                console.error("Erreur lors de la suppression")
            }
        })
    }
}



function addPhoto(){
    const add = document.querySelector(".modalButton")
    add.addEventListener ("click",()=> {
        const modalContent = document.querySelector(".modalTitle")
        const prev = document.querySelector(".previous")
        modalContent.innerHTML = "" ;
        const titleElement = document.createElement("h2")
        const galleryPhoto = document.querySelector(".modalGallery")
        const line = document.querySelector(".line")
        const modalButton = document.querySelector(".modalButton")
        line.classList.add ("modalGalleryOff")
        modalButton.classList.add ("modalGalleryOff")
        galleryPhoto.classList.add("modalGalleryOff")
        const addPhoto = document.querySelector(".modalAdd")
        addPhoto.classList.add("modalAddOn")
        titleElement.textContent = "Ajout Photo"
        modalContent.appendChild(titleElement)
        prev.classList.remove ("modalGalleryOff")
        function previous(){
            prev.addEventListener("click",()=> {
                line.classList.remove("modalGalleryOff")
                modalButton.classList.remove ("modalGalleryOff")
                galleryPhoto.classList.remove("modalGalleryOff")
                addPhoto.classList.remove("modalAddOn")
                titleElement.textContent = "Photos"
                prev.classList.add("modalGalleryOff")
            })
        }
        previous()
    })
}

const inputFile = document.querySelector("#add-single-img");
const imgArea = document.querySelector(".img-area");


inputFile.addEventListener("change", function () {
	const image = this.files[0]
	if(image.size < 4000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll("img");
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement("img");
			img.src = imgUrl;
			imgArea.appendChild(img);
            img.classList.add("imported-img")
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 4MB");
	}
})

function addCategoriesList(categories){
    const categorySelect = document.getElementById("category")
    categorySelect.innerHTML="";
        for (let i=0; i<categories.length; i++){
            const option = document.createElement("option")
            option.value = categories[i].id
            option.textContent = categories[i].name
            categorySelect.appendChild(option)
    }
}

function initEventlistener() {
    const title = document.getElementById("title")
    const image = document.getElementById("add-single-img")
    const category = document.getElementById("category")
    title.addEventListener("change",(event)=>{
        projectTitle = event.target.value
    })
    image.addEventListener("change",(event)=>{
        projectImage = event.target.files[0]
    })
    category.addEventListener("change",(event) =>{
        projectCategory = event.target.value
    })

}


async function addProject(){
    const form = document.getElementById("form")
    const UserId = sessionStorage.getItem("authentificationToken");
    form.addEventListener("submit",async(event)=>{
        event.preventDefault()
        if (projectImage!=="" && projectTitle!=="" && projectCategory!=="") {
            const formData = new FormData();
            formData.append("title", projectTitle);
            formData.append("image", projectImage);
            formData.append("category", projectCategory);
            console.log(projectImage)
            try {
                const response = await fetch ("http://localhost:5678/api/works",{
                    method: "POST",
                    body : formData,
                    headers: {
                        Authorization: `Bearer ${UserId}`,
                    },
                })
                if (response.ok) {
                    initModalTitle()
                    displayPhotos(works)
                    displayGallery(works)
                } else {
                    alert("Erreur")
                }
            } catch(error){
                console.error(error)
            }
        } else {
            alert("Veuillez sélectionner une image, un tire et une catégorie")
        }
        
    })
}



export async function initModal () {
    const works = await fetchWorks()
    const categories  = await fetchCategories()
    initModalTitle()
    displayPhotos(works)
    addPhoto()
    addCategoriesList(categories)
    initEventlistener()
    addProject()
}