// modal-start-selectors
const btnOpenModal = document.querySelectorAll('[data-modal-open]');
const btnCloseModal = document.querySelectorAll('[data-modal-close]');
const thankyouModal = document.querySelector('.modal-gratefulness');
const overlayModal = document.getElementById('overlay-modal');
const pledgeModal = document.querySelectorAll('.modal-start .pledges')


//buttons-selectors
const btnBookmark = document.querySelector('.button.bookmark');
const bookmarkImg = document.querySelector('#bookmark-img');
const bookmarkSpan = document.querySelector('#bookmark-span');


// "database-situation"
const masterCraftDB ={
    initialStatus:{
        amauntBacked: 89914,
        goal: 100000,
        backers: 5007,
        daysLeft: 56
    }

}


// Open-Close modal
btnOpenModal.forEach( btnClicked =>{
    btnClicked.addEventListener('click', ()=>{
        
        if(btnClicked.dataset.pledge){
            const modal = document.querySelector(btnClicked.dataset.modalOpen);
            openModals(modal);

            if( btnClicked.dataset.pledge == '1'){// If you choose a pledge external, 
                                                 //capture the index of the element 
                                                 //from within the modal-start.
                openPreviouslyChosenPledges(3);
            }else if(btnClicked.dataset.pledge == '2'){
                openPreviouslyChosenPledges(4);
            }else if(btnClicked.dataset.pledge == '3'){
                openPreviouslyChosenPledges(5);
            }

        }else{
            const modal = document.querySelector(btnClicked.dataset.modalOpen);
            openModals(modal);
        }
        
        

    })
})

btnCloseModal.forEach(btnClicked =>{
    btnClicked.addEventListener('click', ()=>{
        const modal = btnClicked.closest('.modal-start')
        closeModals(modal)
    })
})

 
function openModals(modal){
    if(modal == null) return
    overlayModal.classList.add('show');
    modal.classList.add('show');
    
}

function closeModals(modal){
    if(modal == null) return
    modal.classList.remove('show')
    overlayModal.classList.remove('show')
    uncheckRadioBtn()
    hideFormers()    
}


// Show-hide footer pledges from the modal pledges
pledgeModal.forEach(pledgeChecked =>{
    pledgeChecked.addEventListener('click', ()=>{
        checkRadioBtn(pledgeChecked); //Even if the click is on the pledge, 
                                      //the radio button is marked.      
        const footerPledge = pledgeChecked.querySelector('.footer');
        toggleForm(pledgeChecked, footerPledge);
    })
})


// Show-hide footer pledges from the external pledges
function openPreviouslyChosenPledges(chosenPledge){
    let pledge = document.querySelector("#modal-start").children[chosenPledge];
    let footer = pledge.querySelector('.footer');
    checkRadioBtn(pledge);
    toggleForm(pledge, footer);
}

function toggleForm(pledgeChecked, footerPledge){
    hideFormers()
    pledgeChecked.classList.add('show');
    footerPledge.classList.add('show');
}

function hideFormers(){
    const openForm = document.querySelector('.modal-start .footer.show');
    const pledgeSelected = document.querySelector('.modal-start .pledges.show');
    if(openForm && pledgeSelected){
        openForm.classList.remove('show');
        pledgeSelected.classList.remove('show');
    }
}

function uncheckRadioBtn(){
    let allRadioBtns = []; 
    allRadioBtns = document.querySelectorAll('.radio-pledges');   
    for( radioBtn of allRadioBtns){
        radioBtn.checked = false;
    }
}

function checkRadioBtn(pledge){
    uncheckRadioBtn();
    let radioAtual= pledge.querySelector('.radio-pledges');    
    radioAtual.checked = true; //Mark chosen radio button  
}

//
btnBookmark.addEventListener('click', ()=>{
    btnBookmark.classList.toggle('bookmarked');
    bookmarkImg.classList.toggle('bookmarked');
    bookmarkSpan.classList.toggle('bookmarked');
    const bookmarkText =bookmarkSpan.innerHTML;
    if(bookmarkText == 'Bookmark'){
        bookmarkSpan.innerHTML = 'Bookmarked'
    }else if(bookmarkText == 'Bookmarked'){
        bookmarkSpan.innerHTML = 'Bookmark';
    }

})

