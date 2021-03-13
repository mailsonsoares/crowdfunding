const pledgeChecked = document.querySelector('[data-modal]'); 

//console.log(pledgeChecked);

pledgeChecked.addEventListener('click', (evento) =>{
    //evento.preventDefault();

    let allPledges = pledgeChecked.querySelectorAll('.pledges');
    //console.log(allPledges);

    allPledges.forEach( pledge =>{

        console.log(pledge);

        if(pledge.checked){
            console.log('Show!!!');
        }        
        else{
            console.log('não');
        }
        
    });
   
});





