const textInfo = document.querySelector('#text-info');


(async () => {

  try {
    const email = window.location.pathname.split('/')[2];
    console.log(email);
    await axios.post(`/api/renvio/${email}`);
    textInfo.innerHTML = 'Se ha enviado la verificacion, ya puede cerrar esta pagina';

  } catch (error) {
    console.log(error);
    textInfo.innerHTML = error.response.data.error;


  }


})();