//console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    if(location != '') {
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.errorMsg) {
                    messageOne.textContent  = data.errorMsg
                } else {
                    messageOne.textContent = data.locationValue
                    messageTwo.textContent = data.dataForcastValue
                } 
            })
        })
    } else {
        messageOne.textContent = 'You must enter a location value'
    }
})