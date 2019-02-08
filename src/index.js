const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', setUpPage)

const url =  'http://localhost:3000/toys/'
const toyContainer = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('.add-toy-form')

function setUpPage() {
    renderAllToys()
    addFormHandler()
}

function getToys() {
    return fetch(url).then(res => res.json())
}

function renderAllToys() {
    toyContainer.innerHTML = ""
    getToys().then(function(data){
        data.forEach(renderToy)
    })
}

function renderToy(toy) {
    const toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyContainer.appendChild(toyCard)

    const name = document.createElement('h2')
    name.textContent = toy.name
    toyCard.appendChild(name)

    const image = document.createElement('img')
    image.src = toy.image
    image.className = 'toy-avatar'
    toyCard.appendChild(image)

    const likes = document.createElement('p')
    likes.textContent = toy.likes
    toyCard.appendChild(likes)

    const likeBtn = document.createElement('button')
    likeBtn.textContent = `Like ${toy.name} <3`
    toyCard.appendChild(likeBtn)
    likeBtn.dataset.id = toy.id

    likeBtn.addEventListener('click', () => increaseLike(toy))
}


function addFormHandler() {
    toyForm.addEventListener('submit', newToy)
}

function newToy() {
    event.preventDefault()
    let newName = event.target.name.value
    let newImage = event.target.image.value

    createToy(newName, newImage).then(renderToy)

    event.target.reset()
}

function createToy(newName, newImage) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            image: newImage
        })
    }).then(res => res.json())
}

function increaseLike() {
    let newLikes = parseInt(event.target.parentElement.querySelector('p').textContent)

    newLikes ++

    event.target.parentElement.querySelector('p').textContent = newLikes
    let id = event.target.dataset.id
    updateLikes(id, newLikes)
}

function updateLikes(id, newLikes) {
    return fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            id: id,
            likes: newLikes
        })
    })
}
