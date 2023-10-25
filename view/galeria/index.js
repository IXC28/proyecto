const container = document.querySelector('#container');




(async () => {

    const { data } = await axios.get('/api/galeria');

    const rol = data.rol;  
    const galeria = data.galeria;

    
    galeria.forEach(galery => {
        console.log(galery);
        const div = document.createElement('div');
        div.id = galery.id;
        div.classList.add('galerias', 'border', 'border-gray-300', 'p-4', 'flex', 'flex-col', 'items-center', 'rounded-md', 'h-96');
        div.innerHTML = `
        <div class="flex mb-2 w-full h-full">
        <div class="text-center mb-2 w-full h-80">
            <p class="text-2xl">Antes</p>
            <img src="${galery.imageBefore}" alt="Antes" class="w-full object-cover rounded-md h-80">
        </div>
        <div class="text-center mb-2 w-full h-80">
            <p class="text-2xl">Después</p>
            <img src="${galery.imageAfter}" alt="Después" class="w-full object-cover rounded-md h-80">
        </div>
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
                'w-4',
              );
              boton.id = 'delete-btn';
              boton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
              `;
              console.log(div.children[0]);
              div.children[0].appendChild(boton);

                 }
          container.append(div);
    
        });


        
})();


container.addEventListener('click', async e => {
  e.preventDefault();

  const { data } = await axios.get('/api/galeria');
  const logiado = data.logiado;

  if (e.target.closest('#delete-btn')) {  
    const button = e.target.closest('#delete-btn');
    const imgSrc1 = button.parentElement.parentElement.children[0].children[0].children[1].src;
    const split = imgSrc1.split('/');
    const imgName1 = split[split.length - 1];
    const imgSrc2 = button.parentElement.parentElement.children[0].children[1].children[1].src;
    const split2 = imgSrc2.split('/');
    const imgName2 = split2[split2.length - 1];
    console.log(imgName1, imgName2);

    button.parentElement.parentElement.remove();



    await axios.delete(`/api/galeria/${button.parentElement.parentElement.id}`, { data: { imgName1: imgName1,imgName2: imgName2  } });

    }


});