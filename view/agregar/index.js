
const selectBtn = document.querySelector('#select-btn');
const categoria = document.querySelector('#categoria');
const form = document.querySelector('#form');
const categoriaTitle = document.querySelector('#categoria-title');
const agregarBtn = document.querySelector('#agregar-btn');

(async () => {

    const { data } = await axios.get('/api/agregar');

    const rol = data.rol;   

      if (rol !== 'admin') {
                window.location.href = '/';
         }

})();

selectBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    const Categoriaselect = categoria.value;

    if (Categoriaselect === "productos")   {
        categoriaTitle.innerText = `Agregar Producto`;
        form.innerHTML = ``;
        form.innerHTML = `
        <!-- Campo de imagen -->
        <div class="mb-4">
          <label for="imagen" class="block text-gray-700 font-bold mb-2">Imagen:</label>
          <input type="file" id="imagen" name="imagen" accept="image/*" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
        </div>
  
        <!-- Campo de título o nombre del producto -->
        <div class="mb-4">
          <label for="titulo" class="block text-gray-700 font-bold mb-2">Título o Nombre:</label>
          <input type="text" id="titulo" name="titulo" placeholder="Escribe el título o nombre" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
        </div>
  
        <!-- Campo de breve descripción -->
        <div class="mb-4">
          <label for="descripcion" class="block text-gray-700 font-bold mb-2">Breve Descripción:</label>
          <textarea id="descripcion" name="descripcion" placeholder="Escribe una breve descripción" rows="3" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required></textarea>
        </div>
  
        <!-- Campo de precio -->
        <div class="mb-6">
          <label for="precio" class="block text-gray-700 font-bold mb-2">Precio:</label>
          <input type="number" id="precio" name="precio" placeholder="Ingrese el precio" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
        </div>
  
        <!-- Botón de enviar -->
        <div class="text-center">
          <button id="agregar-btn" type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Agregar Producto
          </button>
        </div>
        `;

    } else   if (Categoriaselect === "servicios")   {
      categoriaTitle.innerText = `Agregar Servicio`;
      form.innerHTML = ``;
      form.innerHTML = `
      <!-- Campo de imagen -->
      <div class="mb-4">
        <label for="imagen" class="block text-gray-700 font-bold mb-2">Imagen:</label>
        <input type="file" id="imagen" name="imagen" accept="image/*" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
      </div>

      <!-- Campo de título o nombre del producto -->
      <div class="mb-4">
        <label for="titulo" class="block text-gray-700 font-bold mb-2">Título o Nombre:</label>
        <input type="text" id="titulo" name="titulo" placeholder="Escribe el título o nombre" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
      </div>

      <!-- Campo de breve descripción -->
      <div class="mb-4">
        <label for="descripcion" class="block text-gray-700 font-bold mb-2">Breve Descripción:</label>
        <textarea id="descripcion" name="descripcion" placeholder="Escribe una breve descripción" rows="3" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required></textarea>
      </div>

      <!-- Campo de precio -->
      <div class="mb-6">
        <label for="precio" class="block text-gray-700 font-bold mb-2">Precio:</label>
        <input type="number" id="precio" name="precio" placeholder="Ingrese el precio" class="border border-gray-300 px-3 py-2 rounded-lg w-full" required>
      </div>

      <!-- Botón de enviar -->
      <div class="text-center">
        <button id="agregar-btn" type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
        Agregar Producto
        </button>
      </div>
      `;

  } 
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();
        const Categoriaselect = categoria.value;

        if (Categoriaselect === 'productos') {
          const titulo = document.querySelector('#titulo').value;
          const descripcion = document.querySelector('#descripcion').value;
          const precio = document.querySelector('#precio').value;
          const imagen = document.querySelector('#imagen').files[0]; 

          const formData = new FormData();
          formData.append('titulo', titulo);
          formData.append('descripcion', descripcion);
          formData.append('precio', precio);
          formData.append('imagen', imagen);
          formData.append('categoria', 'producto');

          try {
            await axios.post('/api/agregar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
          console.log(error);
          }

        }else if (Categoriaselect === 'servicios') {
          const titulo = document.querySelector('#titulo').value;
          const descripcion = document.querySelector('#descripcion').value;
          const precio = document.querySelector('#precio').value;
          const imagen = document.querySelector('#imagen').files[0]; 

          const formData = new FormData();
          formData.append('titulo', titulo);
          formData.append('descripcion', descripcion);
          formData.append('precio', precio);
          formData.append('imagen', imagen);
          formData.append('categoria', 'servicios');

          try {
            await axios.post('/api/agregar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
          console.log(error);
          }

        }
    

        form.innerHTML = '';
});