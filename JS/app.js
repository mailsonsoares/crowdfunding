import {dataBaseBuilder} from './db.js'

//updates the db values
export function calcDB(amount, view){     
    
    dataBaseBuilder.initialStatus.amountPromises += amount; //sum the promised amount;    
    dataBaseBuilder.initialStatus.backers ++ //sum one more backer;        
    dataBaseBuilder.views[view].reward -- //subtracts a reward.
   
}

export function updateDataSituation(totalAmountPromises, totalBackers, leftDays){

    totalAmountPromises.textContent = `$${dataBaseBuilder.initialStatus.amountPromises}`;
    totalBackers.textContent = `${dataBaseBuilder.initialStatus.backers}`;
    leftDays.textContent = `${dataBaseBuilder.initialStatus.daysLeft}`;

}

export function updateAmountDisplay(){
    dataBaseBuilder.views.forEach(view =>{
        view.display.forEach(display =>{                        
            display.innerHTML = `${view.reward}`
        })
    })
}

export function updateProgressBar(pBar){
    const pb = (dataBaseBuilder.initialStatus.amountPromises/dataBaseBuilder.initialStatus.goal)*100;
    pBar.style.width = `${pb}%`;

}

export function hideFormers(openForm, pledgeSelected){
    
    if(openForm && pledgeSelected){
        openForm.classList.remove('show');
        pledgeSelected.classList.remove('show');
    }
}