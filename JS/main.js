import {dataBaseBuilder} from './db.js'
import {calcDB, updateDataSituation, updateAmountDisplay, updateProgressBar, hideFormers} from './app.js'
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
const menuToggle = document.querySelector('.img-toggle');
const menu = document.querySelector('.menu');

//buttons-selectors
const btnBookmark = document.querySelector('.button.bookmark');
const bookmarkImg = document.querySelector('#bookmark-img');
const bookmarkSpan = document.querySelector('#bookmark-span');

//form-selector
const pledgesForm = document.querySelectorAll('[data-pledges]');

updateDataSituation(totalAmountPromises, totalBackers, leftDays);
updateAmountDisplay()
updateProgressBar(pBar);

pledgesForm.forEach(pledge =>{
    
    pledge.addEventListener('submit', (evt)=>{

        if(pledge.querySelector('.pledges-value') != null){
                       
            var valueForm = parseInt(pledge.querySelector('.pledges-value').value);

        }

  
        if(pledge.dataset.pledges == "1"){               
            closeModals(modalStart)
            openModals(thankyouModal)
                        
        }else if(pledge.dataset.pledges == "2"){
            startCalc(valueForm, 0);
            
        }else if(pledge.dataset.pledges == "3"){
            startCalc(valueForm, 1);
            
        }else if(pledge.dataset.pledges == "4"){
            startCalc(valueForm, 2);            
        }

        evt.preventDefault() 

    })

})


function startCalc(value,indexView){
    calcDB(value, indexView)
    updateDataSituation(totalAmountPromises, totalBackers, leftDays)
    updateAmountDisplay()
    closeModals(modalStart)
    openModals(thankyouModal)
    soldOff()
    updateProgressBar(pBar)      
}

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
    
    const pledge = modal.children[chosenPledge];    
    const footer = pledge.querySelector('.footer');    
    checkRadioBtn(pledge);
    toggleForm(pledge, footer);
}

function toggleForm(pledgeChecked, footerPledge){
    const openForm = document.querySelector('.modal-start .footer.show');
    const pledgeSelected = document.querySelector('.modal-start .pledges.show');
    hideFormers(openForm, pledgeSelected)
    pledgeChecked.classList.add('show');
    footerPledge.classList.add('show');
}

function uncheckRadioBtn(){
    let allRadioBtns = []; 
    allRadioBtns = document.querySelectorAll('.radio-pledges');

    allRadioBtns.forEach(radio =>{
        radio.checked = false;
    })

}


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
    limpaInputs()
    hideFormers()  
}

function checkRadioBtn(pledge){
    uncheckRadioBtn();
    let radioAtual= pledge.querySelector('.radio-pledges');    
    radioAtual.checked = true; //Mark chosen radio button  
}

function limpaInputs(){
    const allInputs = document.querySelectorAll('.pledges-value');

    allInputs.forEach( input =>{
        input.value = '';        
    })
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


function soldOff(){
    dataBaseBuilder.views.forEach(view =>{
        if(view.reward === 0){
            view.container.forEach(container =>{
                
                container.classList.add('sold-off');
                const button = container.querySelector('button');
                button.textContent = 'Sold off'
                button.classList.add('sold-off-button')
            })
        }
    })
}

menuToggle.addEventListener('click', () =>{
    menu.classList.toggle('show');
})




