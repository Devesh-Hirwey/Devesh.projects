const h1 = document.getElementById("toggle");

// h1.addEventListener('click', () => {

// });

function toggle() {
    const divs = document.querySelectorAll('[id^="bg-"]');
    const body = document.getElementById('BigThing');

    body.classList.toggle("night");
    divs.forEach(div => {
        const id = div.id;
        const bgClass = "bg-" + id.substring(3);
        const nbgClass = "nbg-" + id.substring(3);

        if (div.classList.contains(nbgClass)) {
            div.classList.remove(nbgClass);
            div.classList.add(bgClass);
        } else {
            div.classList.remove(bgClass);
            div.classList.add(nbgClass);
        }
    });
}
particlesJS.load('particles-js-1', 'assets/particles.json', function () {
    console.log('callback - particles-js-1 config loaded');
});

particlesJS.load('particles-js-2', 'assets/particles-2.json', function () {
    console.log('callback - particles-js-2 config loaded');
});

particlesJS.load('particles-js-3', 'assets/particles-2.json', function () {
    console.log('callback - particles-js-3 config loaded');
});