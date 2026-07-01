/* botão saiba mais */

const modal = document.getElementById("modal");
const conteudo = document.getElementById("conteudo-modal");


document.querySelectorAll(".card-button").forEach(botao => {


    botao.addEventListener("click", () => {


        fetch(botao.dataset.url)

        .then(response => response.text())

        .then(html => {


            conteudo.innerHTML = html;

            modal.classList.add("open");


        });


    });


});


document.querySelector(".modal-close")
.addEventListener("click", ()=>{

    modal.classList.remove("open");

});


document.querySelector(".modal-overlay")
.addEventListener("click", ()=>{

    modal.classList.remove("open");

});