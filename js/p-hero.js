let globalData ;
const loadPage = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    // console.log(data.data);

    const headerContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="loadData('${category.category_id}')" class="btn text-black bg-gray-300  text-lg font-medium focus:bg-red-500 focus:text-white">${category.category}</a></button>
        `;
        headerContainer.appendChild(div);
    });
};

const loadData = async(categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const newData = data.data;
    globalData = newData;
    console.log(globalData);
    console.log(data.data);
    displayData(newData)
}

const displayData = (cardsId) => {
    // console.log(cardsId);
    const cardContainerElement = document.getElementById('card-container');
    cardContainerElement.innerHTML = "";
    const emptyContainer = document.getElementById('empty-container');
    emptyContainer.innerHTML = "";
    if (cardsId.length === 0){
        const div = document.createElement('div');
        div.innerHTML =`
            <div class="my-40 flex flex-col justify-center items-center gap-5">
            <img src="./../images/Icon.png" alt="">
            <p class="text-4xl text-black font-bold text-center">Oops!! Sorry, There is no <br>content here</p>
            </div>
        `;
        emptyContainer.appendChild(div)
    };
    

    cardsId.forEach((categoryCard) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card">
            <figure class="w-auto h-[200px] relative">
                <img src="${categoryCard.thumbnail}" alt="thumbnail" class="w-full h-full rounded-xl" />
                <p class="absolute right-3 bottom-3 bg-black text-white text-sm px-2 rounded-sm">${categoryCard.others?.posted_date ? Math.floor(`${categoryCard.others.posted_date}` / 3600) + "hrs " + Math.floor(`${categoryCard.others.posted_date}` % 3600 / 60 ) + "min age" : '' }</p>
            </figure>
            <div class="my-3 px-1">
            <div class="my-2 flex justify-start gap-3">
                <div class="author rounded-full w-10 h-10 flex justify-center items-center overflow-hidden">
                    <img src="${categoryCard?.authors[0]?.profile_picture}" alt="" class="w-full h-full object-fill">
                </div>
                <div>
                <h2 class="text-base text-black font-medium">${categoryCard.title}</h2>
                <div class="flex justify-start gap-2 my-2 text-sm">
                    <h3 class="text-gray-600 ">${categoryCard.authors[0].profile_name}</h3>
                    <p>${categoryCard.authors[0]?.verified? `<img class="w-4" src="./../images/verified.svg">`: ''  }</p>
                </div>
                <p class='text-sm'>${categoryCard.others.views} views</p>
                </div>
            </div>
            </div>
        </div>
        `;
        cardContainerElement.appendChild(div);
    });
}


document.getElementById('sort-data').addEventListener('click', function(){

     globalData.sort((a,b) => parseInt(b.others.views) - parseInt(a.others.views))
     displayData(globalData);
});


// console.log(loadData(1000));
loadPage();
loadData(1000);