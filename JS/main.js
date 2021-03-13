// modal-start-selectors
const btnOpenModal = document.querySelectorAll('[data-modal-open]');
const btnCloseModal = document.querySelectorAll('[data-modal-close]');
const thankyouModal = document.querySelector('.modal-gratefulness');
const overlayModal = document.getElementById('overlay-modal');
const pledgeModal = document.querySelectorAll('.modal-start .pledges')

//buttons
const btnBookmark = document.querySelector('.button.bookmark');
const bookmarkImg = document.querySelector('#bookmark-img');
const bookmarkSpan = document.querySelector('#bookmark-span');



// "database"
const masterCraftDB ={
    initialStatus:{
        amauntBacked: 89914,
        goal: 100000,
        backers: 5007,
        daysLeft: 56
    }

}

btnOpenModal.forEach( btnClicked =>{
    btnClicked.addEventListener('click', ()=>{
        console.log(btnClicked.dataset);
        const modal = document.querySelector(btnClicked.dataset.modalOpen);
        openModals(modal);

    })
})

btnCloseModal.forEach(btnClicked =>{
    btnClicked.addEventListener('click', ()=>{
        const modal = btnClicked.closest('.modal-start')
        closeModal(modal)
    })
})

// Open-Close modal 
function openModals(modal){
    if(modal == null) return
    overlayModal.classList.add('show');
    modal.classList.add('show');
    
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('show')
    overlayModal.classList.remove('show')
    ocultaFormer()
}

// Show-hide footer modal

pledgeModal.forEach(pledgeChecked =>{
    pledgeChecked.addEventListener('click', ()=>{
        const footerPledge = pledgeChecked.querySelector('.footer'); ///Ver aqui
        toggleForm(pledgeChecked, footerPledge);
    })
})

function toggleForm(pledgeChecked, footerPledge){
    ocultaFormer()    
    pledgeChecked.classList.add('show');
    footerPledge.classList.add('show');

}

function ocultaFormer(){
    const openForm = document.querySelector('.modal-start .footer.show');
    const pledgeSelected = document.querySelector('.modal-start .pledges.show');
    if(openForm && pledgeSelected){
        openForm.classList.remove('show');
        pledgeSelected.classList.remove('show');
    }
}

btnBookmark.addEventListener('click', ()=>{
    bookmarkImg.classList.toggle('bookmarked');
    bookmarkSpan.classList.toggle('bookmarked');
    const bookmarkText =bookmarkSpan.innerHTML;
    if(bookmarkText == 'Bookmark'){
        bookmarkSpan.innerHTML = 'Bookmarked'
    }else if(bookmarkText == 'Bookmarked'){
        bookmarkSpan.innerHTML = 'Bookmark';
    }

})

