
// "database-situation"
const dataBaseBuilder = {
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
            reward: 3,
            minPledge: 25,
            display: document.querySelectorAll('.bamboo-inventory'),
            container: document.querySelectorAll('.bamboo-pledge')
        },
        {
            name: 'Black Edition',
            reward: 64,
            minPledge: 75,
            display: document.querySelectorAll('.black-edition-inventory'),
            container: document.querySelectorAll('.black-edition-pledge')
        },
        {
            name: 'Special Edition',
            reward: 1,
            minPledge: 200,
            display: document.querySelectorAll('.special-edition-inventory'),
            container: document.querySelectorAll('.special-edition-pledge')
        }
    ]
}

export {dataBaseBuilder};