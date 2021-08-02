console.log("Index is working");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch("http://localhost:3000/weather?address=abbotsford").then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             // console.log(data)
//             console.log(data.data)
//             console.log(data.location)
//         }
//     })
// })

const webForm = document.querySelector("form");
const search = document.querySelector("input");
const firstP = document.querySelector("#first_p");
const secondP = document.querySelector("#second_p");


webForm.addEventListener("submit", (event) => {
    event.preventDefault();
    firstP.innerText = "Loading..........";
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            firstP.innerText = null;
            if (data.error) {
                secondP.innerText = data.error;
            } else {
                // console.log(data)
                firstP.innerText = data.location;
                secondP.innerText = data.data;
                console.log(data.data)
                console.log(data.location)
            }
        })
    })
})