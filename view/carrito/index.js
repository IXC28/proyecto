const productosContainer = document.querySelector('#productos-container'); 
const total = document.querySelector('#cantidad-total');
const preciosTotales = document.querySelector('#precio-total');
const precios = document.querySelector('#price');
const deleteBtn = document.querySelector('#delete-btn');
(async () => {

    const { data } = await axios.get('/api/carrito');
    data.forEach(products => {
    const div = document.createElement('div');
    div.id = products.id;
    div.classList.add('border-tm', 'border-gray-300','p-4');
    div.innerHTML = `
    <div class="flex flex-row justify-between items-center md:h-20">
    <div class="flex space-x-2 items-center w-3/4">  
        <img class="flex max-md:hidden h-20 rounded-2xl" src="${products.image}" alt="Producto">
        <p class="font-semibold md:font-bold">${products.titulo}</p> 
    </div>
    <p id="price" class="font-semibold md:font-bold md:pr-12">$${products.price}</p>

    <button id="delete-btn" class="p-1 rounded-lg md:h-11 md:w-1/12 w-1/6 h-full ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve" class="w-full h-full">
            <defs>
            </defs>
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                <path d="M 13.4 88.492 L 1.508 76.6 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 69.318 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 L 88.492 13.4 c 2.011 2.011 2.011 5.271 0 7.282 L 20.682 88.492 C 18.671 90.503 15.411 90.503 13.4 88.492 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 69.318 88.492 L 1.508 20.682 c -2.011 -2.011 -2.011 -5.271 0 -7.282 L 13.4 1.508 c 2.011 -2.011 5.271 -2.011 7.282 0 l 67.809 67.809 c 2.011 2.011 2.011 5.271 0 7.282 L 76.6 88.492 C 74.589 90.503 71.329 90.503 69.318 88.492 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            </g>
            </svg>
      </button>
</div>
      `;
      productosContainer.append(div);

    });
    
    const precioTotal = data.reduce((total, producto) => total + producto.price, 0);
    preciosTotales.innerHTML= `$${precioTotal}`;
    total.innerHTML = data.length;

})();





productosContainer.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.target.closest('#delete-btn')) {  
        const button = e.target.closest('#delete-btn');
        button.parentElement.parentElement.remove();



     await axios.delete(`/api/carrito/${button.parentElement.parentElement.id}`);
     
     const { data } = await axios.get('/api/carrito');
     const precioTotal = data.reduce((total, producto) => total + producto.price, 0);
     preciosTotales.innerHTML= `$${precioTotal}`;
     total.innerHTML = data.length;
    
    }

} );



