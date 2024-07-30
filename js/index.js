const URL = "https://fakestoreapi.com/products";

const productsContainerHTML = document.querySelector('#product-card-container');

console.log(productsContainerHTML)

axios.get(URL).then(response => {
                const productos = response.data;
                renderProducts(productos)
            })
            .catch(error => {
                console.log(error)
            })


function renderProducts(products) {

    products.forEach(prod => {
        
        productsContainerHTML.innerHTML += 
                `<div class="card">
                    <img    src="${prod.image}" 
                            class="card-img-top" 
                            alt="${prod.title}">

                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text">${prod.description}</p>


                        <div class="fw-bold text-end text-secondary my-2">${prod.price}</div>


                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>`

    })

}










