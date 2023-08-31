const loadPage = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    console.log(data.data);
}

loadPage()