const destaques = document.getElementById('destaques')

fetch('http://localhost:3000/product')
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados);
        destaques.innerHTML = ''
        for (const dado of dados) {
            destaques.innerHTML += `
                <div class="custom-card-1 bg-transparent card border-0 radius-0 w-25 px-3">
                    <a class="text-decoration-none text-black" href="">
                        <div class="position-relative border radius-0 w-100 my-ratio d-flex align-items-center">
                            <div class="position-absolute d-flex pt-2 ps-2 w-100 top-0 z-index-1">
                                <svg width="30" height="30" viewBox="0 0 40 40" alt=""
                                    class="WishlistButtonstyles__StyledWishlistIcon-sc-1iowmvt-1 biMOpX">
                                    <rect fill="#F8F8F8" width="40" height="40" rx="20"></rect>
                                    <path
                                        d="M19.986 30l.014-.014.014.014 8.223-8.116-.018-.019a5.678 5.678 0 0 0 1.78-4.126C30 14.569 27.398 12 24.187 12A5.829 5.829 0 0 0 20 13.762 5.827 5.827 0 0 0 15.815 12C12.604 12 10 14.569 10 17.739a5.68 5.68 0 0 0 1.782 4.126"
                                        fill="white"></path>
                                    <path
                                        d="M26.84 20.417L20 27.204l-6.84-6.787A3.67 3.67 0 0 1 12 17.739C12 15.677 13.71 14 15.815 14a3.82 3.82 0 0 1 2.754 1.159l1.43 1.467 1.433-1.467A3.818 3.818 0 0 1 24.186 14C26.289 14 28 15.677 28 17.739a3.673 3.673 0 0 1-1.16 2.678M19.986 30l.014-.014.014.014 8.223-8.116-.018-.019a5.678 5.678 0 0 0 1.78-4.126C30 14.569 27.398 12 24.187 12A5.829 5.829 0 0 0 20 13.762 5.827 5.827 0 0 0 15.815 12C12.604 12 10 14.569 10 17.739a5.68 5.68 0 0 0 1.782 4.126"
                                        fill="#006DB7"></path>
                                </svg>
                                <p class="fs-7 fw-bold ps-2 mt-1">Adicionar à lista de desejos</p>
                            </div>
                            <div class="w-75 m-auto">
                                <img class="w-100 radius-0" src="./public/assets/img/76210.webp" alt="">
                            </div>
                            <button class="yellow-btn position-absolute bottom-0 mb-2 ms-2">
                                Exclusivo
                            </button>
                        </div>
                        <div class="card-body px-0 pb-0 d-flex justify-content-between flex-column border-0 radius-0">
                            <h6 class="lh-2 fw-bold">${dado.name}</h6>
                            <div class="score pb-1">
                                <img class="p-0" src="./public/assets/svg/fullstar.svg" alt="full star">
                                <img class="p-0" src="./public/assets/svg/fullstar.svg" alt="full star">
                                <img class="p-0" src="./public/assets/svg/fullstar.svg" alt="full star">
                                <img class="p-0" src="./public/assets/svg/fullstar.svg" alt="full star">
                                <img class="p-0" src="./public/assets/svg/fullstar.svg" alt="full star">
                            </div>
                            <h5 class="fw-bolder">R$: ${dado.price.toFixed(2)}</h5>
                            <button class="add-cart-btn w-100">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </a>
                </div>
        `
        }

    })
    .catch((err)=>{
        console.error(err.message);  
    })