const serviciosSection = document.querySelector('#servicios-section');
const paquetesSection = document.querySelector('#paquetes-section');

const whatsappNumber = "+584242410187";


(async () => {

    const { data } = await axios.get('/api/servicios');

    const rol = data.rol;  
    const service = data.service 
    
        service.forEach(servicios => {
        const div = document.createElement('div');
        div.id = servicios.id;
        div.classList.add('flex', 'flex-col', 'md:flex-row', 'md:space-x-4', 'mb-8', 'border', 'border-gray-300', 'p-4', 'rounded-md');
        div.innerHTML = `
        <div class="md:w-1/2">
        <img src="${servicios.image}" alt="${servicios.titulo}" class="w-full h-80 rounded-md shadow-lg">
    </div>
    <div class="md:w-1/2">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${servicios.titulo}</h3>
        <p class="text-gray-700 mb-2">${servicios.descripcion}</p>
        <p class="text-green-600 font-semibold text-xl">$${servicios.price}</p>
        <a id="link-wsp" href="" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              
            <span class="hidden md:inline">Hacer Pedido</span>
        </a>
    </div> `;
            
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
            'w-auto',
        );
        boton.id = 'delete-btn';
        boton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        // Agregamos el botón al div
        div.children[1].appendChild(boton);
        
     }
                 serviciosSection.append(div);
     

                 const linkWsp = document.querySelector('#link-wsp');

                
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (isMobileDevice) {
                    linkWsp.href = `https://wa.me/${whatsappNumber}?text=Deseo comprar : ${servicios.titulo}.
                    Con un precio total de : $${servicios.price}`;
                } else {
                  linkWsp.href = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Deseo comprar :${servicios.titulo}.
                  Con un precio total de : $${servicios.price}`;
                }
                   
        });

 

})();

(async () => {

    const { data } = await axios.get('/api/paquetes');
    const rol = data.rol;  
    const paquetes = data.paquete 
        paquetes.forEach(paquete => {
        const pack = document.createElement('div');
        pack.id = paquete.id;
        pack.classList.add('flex', 'flex-col', 'md:flex-row', 'md:space-x-4', 'mb-8', 'border', 'border-gray-300', 'p-4', 'rounded-md');
        pack.innerHTML = `
        <div class="md:w-1/2">
        <img src="${paquete.image}" alt="${paquete.titulo}" class="w-full h-80 rounded-md shadow-lg">
    </div>
    <div class="md:w-1/2">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${paquete.titulo}</h3>
        <p class="text-gray-700 mb-2">${paquete.descripcion}</p>
        <p class="text-green-600 font-semibold text-xl">$${paquete.price}</p>
        <a id="link-wsp-packs" href="" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              
            <span class="hidden md:inline">Hacer Pedido</span>
        </a>
    </div>
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
            'w-auto',
        );
        boton.id = 'delete-btn';
        boton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        // Agregamos el botón al div
        pack.children[1].appendChild(boton);
        
     }
              paquetesSection.append(pack);

                 const linkWsp = document.querySelector('#link-wsp-packs');

                
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (isMobileDevice) {
                    linkWsp.href = `https://wa.me/${whatsappNumber}?text=Deseo comprar : ${paquete.titulo}.
                    Con un precio total de : $${paquete.price}`;
                } else {
                  linkWsp.href = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Deseo comprar :${paquete.titulo}.
                  Con un precio total de : $${paquete.price}`;
                }
                   
        });

 

})();

serviciosSection.addEventListener('click', async e => {
    e.preventDefault();

    const { data } = await axios.get('/api/servicios');
    const logiado = data.logiado;

    if (e.target.closest('#delete-btn')) {  
      const button = e.target.closest('#delete-btn');
      const imgSrc = button.parentElement.parentElement.children[0].children[0].src;
      const split = imgSrc.split('/');
      const imgName = split[split.length - 1];

      button.parentElement.parentElement.remove();



      await axios.delete(`/api/servicios/${button.parentElement.parentElement.id}`, { data: { imgName: imgName } });
      }


});

paquetesSection.addEventListener('click', async e => {
    e.preventDefault();

    const { data } = await axios.get('/api/paquetes');
    const logiado = data.logiado;

    if (e.target.closest('#delete-btn')) {  
      const button = e.target.closest('#delete-btn');
      const imgSrc = button.parentElement.parentElement.children[0].children[0].src;
      const split = imgSrc.split('/');
      const imgName = split[split.length - 1];

      button.parentElement.parentElement.remove();



      await axios.delete(`/api/paquetes/${button.parentElement.parentElement.id}`, { data: { imgName: imgName } });
      }


});

