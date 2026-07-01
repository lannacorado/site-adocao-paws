const slides = document.querySelectorAll(".slide-1, .slide-2, .slide-3");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let atual = 0;

function trocarSlide(indice){

    slides.forEach(slide=>{
        slide.classList.remove("ativo");
    });

    slides[indice].classList.add("ativo");
}

function proximo(){

    atual++;

    if(atual >= slides.length){
        atual = 0;
    }

    trocarSlide(atual);
}

function anterior(){

    atual--;

    if(atual < 0){
        atual = slides.length - 1;
    }

    trocarSlide(atual);
}

next.addEventListener("click", proximo);
prev.addEventListener("click", anterior);

setInterval(proximo, 5000);

trocarSlide(atual);