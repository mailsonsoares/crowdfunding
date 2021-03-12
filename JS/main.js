const pledgeChecked = document.querySelector('[data-modal]'); 

pledgeChecked.addEventListener('change', (evento) =>{
    
    let radio = evento.target;
    let pledge = radio.parentNode.parentNode.parentNode;

    let footerPladge = pledge.querySelector('.footer');

    footerPladge.classList.remove('footer');
    footerPladge.classList.add('show-footer');

    console.log(footerPladge);
   
});

