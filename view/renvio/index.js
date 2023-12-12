const textInfo = document.querySelector('#text-info');


(async () => {

  try {
    const email = window.location.pathname.split('/')[2];
    console.log(email);
    await axios.post(`/api/renvio/${email}`);
    window.location.pathname = 'https://mail.google.com/';

  } catch (error) {
    console.log(error);
    textInfo.innerHTML = error.response.data.error;


  }


})();