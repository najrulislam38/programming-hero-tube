const loadPage = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    console.log(data.data);

    const headerContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="btn text-black bg-gray-300  text-lg font-medium focus:bg-red-500 focus:text-white">${category.category}</a></button>
        `;
        headerContainer.appendChild(div)
    })
}

loadPage()