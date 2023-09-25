import { createNotification } from '../components/notification.js';


const carBtn = document.querySelector('.car-btn');
const containerProductos = document.querySelector('#container-products');
const notification = document.querySelector('#notification');
const productos = document.querySelectorAll('.productos');
const agregarContainer = document.querySelector('#agregar-container');
const deleteBtn = document.querySelector('#delete-btn');

(async () => {

    const { data } = await axios.get('/api/products');

    const rol = data.rol;  
    const products = data.products 


    
        products.forEach(products => {
        const div = document.createElement('div');
        div.id = products.id;
        div.classList.add('productos', 'bg-white', 'shadow-md', 'p-4', 'rounded-lg');
        div.innerHTML = `
        <img src="${products.image}" alt="${products.titulo}" class="w-full h-32 object-cover rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mt-2">${products.titulo}</h2>
        <p class="text-gray-600 w-full p-1 break-words">${products.descripcion}.</p>
        <p class="text-gray-800 font-bold mt-2">$${products.price}</p>
        <button class="car-btn bg-#91CEDB hover:bg-#188196 text-black px-4 py-2 mt-4 rounded-lg h-12 w-full"><img src="/img/add-to-cart-3046.svg" alt="Añadir al Carrito" class=" w-full h-full"></button>
          `;
            
          if (rol === 'admin') {
            const boton = document.createElement('button');   
            boton.classList.add(
                'bg-red-600',
                'hover:bg-red-700',
                'text-black',
                'px-4',
                'py-2',
                'mt-4',
                'rounded-lg',
                'h-12',
                'w-full'
              );
              boton.id = 'delete-btn';
              boton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
              `;
              div.appendChild(boton);

                 }
          containerProductos.append(div);
    
        });


        
})();


containerProductos.addEventListener('click', async e => {
    e.preventDefault();

    const { data } = await axios.get('/api/products');
    const logiado = data.logiado;

    if (e.target.closest('#delete-btn')) {  
      const button = e.target.closest('#delete-btn');
      const imgSrc = button.parentElement.children[0].src;
      const split = imgSrc.split('/');
      const imgName = split[split.length - 1];
      button.parentElement.remove();



      await axios.delete(`/api/products/${button.parentElement.id}`, { data: { imgName: imgName } });
      }

    if (e.target.closest('.car-btn')) {
        
    const div = e.target.closest('.car-btn').parentElement;

        if (logiado) {

          console.log(div);
          try {
            
            const imgSrc = div.children[0].src;
            const split = imgSrc.split('/');
            const imgName = split[split.length - 1];

            const titulo =  div.children[1].innerHTML;

            const descripcion = div.children[2].innerHTML;

            const price$ = div.children[3].innerHTML;
            const splitPrice = price$.split('$');
            const price = splitPrice[splitPrice.length - 1]

            axios.post(`/api/carrito/${div.id}`)

            createNotification(false,'Agregado al carrito');
            setTimeout(() => {
                notification.innerHTML= '';
              }, 5000);

          } catch (error) {
            console.log(error);
            createNotification(true,'Ha ocurrido un error');
            setTimeout(() => {
                notification.innerHTML= '';
              }, 5000);

          }


        } else {
         
            createNotification(true,'Debe de Iniciar Sesion');
            setTimeout(() => {
                notification.innerHTML= '';
              }, 5000);
            
        }

    }

});

