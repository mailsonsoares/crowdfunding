// datas situation inicial
const totalAmountPromises = document.querySelector('.total-amount-promises');
const totalBackers = document.querySelector('.total-backers');
const leftDays = document.querySelector('.days');

const pBar = document.querySelector('.bar-fill');

// modal-start-selectors
const btnOpenModal = document.querySelectorAll('[data-modal-open]');
const btnCloseModal = document.querySelectorAll('[data-modal-close]');
const overlayModal = document.getElementById('overlay-modal');
const modalPledgeView = document.querySelectorAll('.modal-start .pledges');
const modalStart = document.querySelector('#modal-start');
const thankyouModal = document.querySelector('#modal-gratefulness');


//buttons-selectors
const btnBookmark = document.querySelector('.button.bookmark');
const bookmarkImg = document.querySelector('#bookmark-img');
const bookmarkSpan = document.querySelector('#bookmark-span');

//forms-selector
const standForm = document.querySelector('#bamboo-stand-form');
const standFormInput = document.querySelector('#bamboo-stand-form input');


// "database-situation"
const masterCraftDB = {
    initialStatus:{
        amountPromises: 89914,
        goal: 100000,
        backers: 5007,
        daysLeft: 56
    },
    views:
    [
        {
            name: 'Bamboo Stand',
            reward: 101,
            minPledge: 25,
            display: document.querySelectorAll('.inventory'),
            container: document.querySelectorAll('.bamboo')
        },
        {
            name: 'Black Edition',
            reward: 64,
            minPledge: 75,
            display: document.querySelectorAll('.inventory'),
            container: document.querySelectorAll('.black-edition')
        },
        {
            name: 'Black Edition',
            reward: 0,
            minPledge: 200,
            display: document.querySelectorAll('.inventory'),
            container: document.querySelectorAll('.black-edition')
        }
    ]
}

//Pledges forms
standForm.addEventListener('submit', (evt)=>{
    const pledgeOfAmount = parseInt(standFormInput.value);
    calcDB(pledgeOfAmount,0)
    updateDataSituation()
    updateAmountDisplay()
    closeModals(modalStart)
    openModals(thankyouModal)
    soldOff()
    updateProgressBar()
    evt.preventDefault()   
    
})


updateDataSituation()
updateAmountDisplay()
updateProgressBar()


// Open-Close modal
btnOpenModal.forEach( btnClicked =>{
    btnClicked.addEventListener('click', ()=>{
        const modal = document.querySelector(btnClicked.dataset.modalOpen);        
        if(btnClicked.dataset.pledge){            
            openModals(modal);
            if( btnClicked.dataset.pledge == '1'){// If you choose a pledge external, 
                                            //capture the index of the element from within the modal-start.
                openPreviouslyChosenPledges(3, modal);
            }else if(btnClicked.dataset.pledge == '2'){
                openPreviouslyChosenPledges(4, modal);
            }else if(btnClicked.dataset.pledge == '3'){
                openPreviouslyChosenPledges(5, modal);
            }

        }else{
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
    //{
    //     const modal_start = document.querySelector("#modal-start")
    //     modal_start.classList.remove('show')
    //     overlayModal.classList.remove('show')
    // }else{
        modal.classList.remove('show')
        overlayModal.classList.remove('show')
        uncheckRadioBtn()
        hideFormers() 
    // }     
}




// Show-hide footer pledges from the modal pledges
modalPledgeView.forEach(pledgeChecked =>{
    pledgeChecked.addEventListener('click', ()=>{
        checkRadioBtn(pledgeChecked); //Even if the click is on the pledge, 
                                      //the radio button is marked.      
        const footerPledge = pledgeChecked.querySelector('.footer');
        toggleForm(pledgeChecked, footerPledge);
    })
})


// Show-hide footer pledges from the external pledges
function openPreviouslyChosenPledges(chosenPledge, modal){
    //const pledge = document.querySelector("#modal-start").children[chosenPledge];
    const pledge = modal.children[chosenPledge];    
    const footer = pledge.querySelector('.footer');    
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

//updates the db values
function calcDB(amount, view){     
    masterCraftDB.initialStatus.amountPromises += amount; //sum the promised amount;    
    masterCraftDB.initialStatus.backers ++ //sum one more backer;
    if(view >= 0){
        masterCraftDB.views[view].reward-- //subtracts a reward.
    }
}

function updateDataSituation(){    
    totalAmountPromises.textContent = `$${masterCraftDB.initialStatus.amountPromises}`;
    totalBackers.textContent = `${masterCraftDB.initialStatus.backers}`;
    leftDays.textContent = `${masterCraftDB.initialStatus.daysLeft}`;

}

function updateAmountDisplay(){
    masterCraftDB.views.forEach(view =>{
        view.display.forEach(display =>{
            display.innerHTML = `${view.reward}`
        })
    })
}

function soldOff(){
    masterCraftDB.views.forEach(view =>{
        if(view.reward === 0){
            view.container.forEach(container =>{
                container.classList.add('sold-off');
                const button = container.querySelector('button');
                button.textContent = 'Sold off'
            })
        }
    })
}

function updateProgressBar(){
    const pb = (masterCraftDB.initialStatus.amountPromises/masterCraftDB.initialStatus.goal)*100;
    pBar.style.width = `${pb}%`;

}

