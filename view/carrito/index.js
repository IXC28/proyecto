import { createNotification } from '../components/notification.js';

const productosContainer = document.querySelector('#productos-container'); 
const total = document.querySelector('#cantidad-total');
const preciosTotales = document.querySelector('#precio-total');
const precios = document.querySelector('#price');
const deleteBtn = document.querySelector('#delete-btn');
const linkWsp = document.querySelector('#link-wsp');
const datosPago= document.querySelector('#datos-pago');
const monto =document.querySelector('#monto');
const phoneInput = document.querySelector('#phone-input');
const refInput = document.querySelector('#ref-input');
const datosBtn = document.querySelector('#datosBtn');
const notification = document.querySelector('#notification');

let totalProducts = 0;

(async () => {

    const { data } = await axios.get('/api/carrito');

    console.log(data);

    const log = data.logiado;   

    if (log === false) {
              window.location.href = '/';
       }

})();

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
        <p id="titulo" class="font-semibold md:font-bold">${products.titulo}</p> 
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
    totalProducts = data.length;


    const titulos = data.map((product) => product.titulo);
    const titulosComoString = titulos.join(', ');
    
    console.log(titulosComoString);

    if (    total.innerHTML > 0  ) {
        const whatsappNumber = "+584242410187";
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobileDevice) {
            linkWsp.href = `https://wa.me/${whatsappNumber}?text=Deseo comprar : ${titulosComoString}.
            Con un precio total de : $${precioTotal}`;
        } else {
          linkWsp.href = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Deseo comprar : ${titulosComoString}.
          Con un precio total de : $${precioTotal}`;
        }
    }else{
        linkWsp.children[1].innerHTML = 'Agregar productos';
        //linkWsp.href = '/products';
    }
    
console.log(linkWsp.children[1]);



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

// Validation
const REF_VALIDATION = /^\d{12}$/;
const PHONE_VALIDATION =  /^[0][42][12][426][0-9]{7}$/ ;


let refValidation = false;
let phoneValidation = false;


const validation = (input, regexValidation) => {
  datosBtn.disabled = refValidation && phoneValidation ? false : true;


  if (input.value === '') {
    input.classList.remove('outline-red-700', 'outline-2', 'outline');
    input.classList.remove('outline-green-700', 'outline-2', 'outline');
    input.classList.add('focus:outline-indigo-700');

  } else if (regexValidation) {
    input.classList.remove('focus:outline-indigo-700');
    input.classList.remove('outline-red-700', 'outline-2', 'outline');
    input.classList.add('outline-green-700', 'outline-2', 'outline');
  } else if (!regexValidation) {
    input.classList.remove('focus:outline-indigo-700');
    input.classList.remove('outline-green-700', 'outline-2', 'outline');
    input.classList.add('outline-red-700', 'outline-2', 'outline');

  }
};

// events

refInput.addEventListener('input', e => {

  refValidation = REF_VALIDATION.test(e.target.value);
  validation(refInput, refValidation);

});

phoneInput.addEventListener('input', e => {

  phoneValidation = PHONE_VALIDATION.test(e.target.value);
  validation(phoneInput, phoneValidation);

});


let bolivares = 0;

linkWsp.addEventListener("click", async (e) => {
    e.preventDefault();
    if (linkWsp.children[1].innerHTML === 'Agregar productos') {
        window.location.href = '/products';
    }
 
  
    const precioAxio = await axios.get(`https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla`);
    const precioBolivares = precioAxio.data.price;
    const numeroEntero = parseInt(preciosTotales.innerHTML.replace(/\D/g, ''), 10)

    bolivares = numeroEntero*Number(precioBolivares);
    monto.innerHTML= `Bs.${bolivares}`;
    const datosDiv = linkWsp.parentElement.parentElement.children[4];

    datosDiv.classList.remove('hidden');
    

} );


datosPago.addEventListener("submit", async (e) => {
  e.preventDefault();

  
  try {
  const ref = refInput.value;
  const phone = phoneInput.value;
  const montoApagar = bolivares;

  const datos = {
    ref,
    phone,
    montoApagar
  };

  phoneInput.value = '';
  refInput.value = '';
  validation(refInput, false);
  validation(phoneInput, false);

  datosBtn.setAttribute('disabled','true');

  createNotification(false, 'se ha enviado la solicitud de verificacion');
  
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);

    const { data } = await axios.patch('/api/carrito', datos);




  } catch (error) {
    console.log(error);
    
  createNotification(true, error.response.data.error);
  
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
  }
});

