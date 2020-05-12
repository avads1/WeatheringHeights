console.log('Client side javascript file is loaded!')
//This is client side javascript

//fetch is a browser based command! It will NOT run using node commands
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response, error) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data)
//         }
//     })


//     //The below code will not work.  response.json() needs a then() to complete the promise
//     // if (response.error) {
//     //     console.log('Invalid location')
//     // } else {
//     //     console.log(response.json())
//     // } 

// })

const searchLocation = document.querySelector('form')
const input = document.querySelector('input')
const message = document.querySelector('#message')
const fCast = document.querySelector('#fCast')

 
searchLocation.addEventListener('submit', (event) => {
    //Prevents the browser from refreshing on default when the button is clicked
    event.preventDefault()
    message.textContent = 'Loading....'
    fetch('/weather?address=' + input.value).then((response, error) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error
            } else {
                message.textContent = data.location
                fCast.textContent = data.forecast
            }
        })
    })
})