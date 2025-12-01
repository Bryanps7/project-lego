const modal = document.querySelector(".modal")
const allButtonsImages = document.querySelectorAll("#button-super-heroe")
const closeButton = document.getElementById("modal_content--close")

allButtonsImages.forEach(simpleButton => {
    simpleButton.addEventListener('click', ()=>{
        modal.classList.remove('hidden')
        modal.classList.add('visible')
        })
    })
closeButton.addEventListener('click', () => {
    modal.classList.remove('visible')
    modal.classList.add('hidden')
})

// modal.addEventListener('click', (event) => {
//     if(!modal_content(event.target)){
//         modal.classList.remove("visible");
//         modal.classList.add("hidden");
//     }
// })
