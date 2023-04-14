// set loader function
function loader(status) {
    const loaderHtml = '<div class="loader"><img src="https://i.gifer.com/ZZ5H.gif"/></div>';

    const loader = document.querySelector('.loader');

    if (loader){
        if (status) {
            loader.style.display = 'flex';
        } else {
            loader.style.display = 'none';
        }      
    }else{
      const body = document.querySelector('body');
      body.insertAdjacentHTML('beforeend', loaderHtml);
    }
}