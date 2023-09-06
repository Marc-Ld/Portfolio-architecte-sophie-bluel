export async function fetchWorks () {
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const works = await responseWorks.json();
    return  works ;
}

export async function fetchCategories () {
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
    return  categories ;
}
