const agregarContainer = document.querySelector('#agregar-container');

(async () => {

    const { data } = await axios.get('/api/adds');

    const rol = data.rol;   
      
            if (rol === 'admin') {
                agregarContainer.innerHTML = `               
                <a href="/agregar" id="agregar-items" class="p-4 m-4 w-20 h-20 bg-blue-300 hover:bg-blue-600 hover:scale-110 duration-500 flex items-center justify-center lg:w-40 lg:h-16 rounded-lg">

                <button class="flex justify-center">
                        <p class="hidden text-lg font-bold flex-row gap-2 lg:flex">Agregar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full lg:hidden">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                </button>

                </a>
                `;

            }else{
                agregarContainer.innerHTML = ``;
            }

})();