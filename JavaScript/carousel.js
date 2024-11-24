const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');
const carouselDom = document.querySelector('.carousel');
const SliderDom = carouselDom.querySelector('.list');
// const thumbnailBorderDom = carouselDom.querySelector('.thumbnail');
const timeDom = document.querySelector('.carousel .time');

// Function to create carousel items
function createCarouselItem(item, type) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    if (type === 'list') {
        itemDiv.innerHTML = `
            <img src="${item.image}">
            <div class="content">
                <div class="author">${item.author}</div>
                <div class="title">${item.title}</div>
                <div class="topic">${item.topic}</div>
                <div class="des">${item.description}</div>
                <a href=${item.Link}>
                <div class="buttons">
                    <button>Check Work</button>
                </div>
                </a>
            </div>
        `;
    } 
    // else if (type === 'thumbnail') {
    //     itemDiv.innerHTML = `
    //         <img src="${item.image}">
    //         <div class="content">
    //             <div class="title">${item.title}</div>
    //             <div class="description">${item.description}</div>
    //         </div>
    //     `;
    // }
    return itemDiv;
}

fetch('assets/data.json')
    .then(response => response.json())
    .then(data => {
        data.list.forEach(item => SliderDom.appendChild(createCarouselItem(item, 'list')));
        // data.thumbnail.forEach(item => thumbnailBorderDom.appendChild(createCarouselItem(item, 'thumbnail')));
    })
    .catch(error => console.error('Error fetching data:', error));

let timeRunning = 0;
let timeAutoNext = 7000;
let runTimeOut;
let runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);

function showSlider(type) {
    const SliderItemsDom = SliderDom.querySelectorAll('.item');
    // const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        // thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        // thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    }

    carouselDom.classList.add(type);

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);
}

nextDom.onclick = () => showSlider('next');
prevDom.onclick = () => showSlider('prev');