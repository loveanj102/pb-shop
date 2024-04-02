window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
        document.querySelector('.navbar').classList.add('scrolled');
        document.querySelector('.nav-item').classList.remove('text-white');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
        document.querySelector('.nav-item').classList.add('text-white');
    }
});