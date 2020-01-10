console.log(window.location.href.split('=')[1].split('&'));
const articleId = window.location.href.split('=')[1].split('&')[0]
const commentId = window.location.href.split('=')[1].split('&')[1]

if(articleId){
         fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments/${commentId}`)
         .then(response => response.json())
         .then(data => {
             const {name, avatar, comment } = data
             console.log(data)
             document.getElementById('name').value = name
             document.getElementById('avatar').value = avatar
             document.getElementById('comment').value = comment
        })
        .catch(err => console.log(err.message)) 
}

function editArticle(e, id){
    e.preventDefault()
    const name = document.getElementById('name').value
    const avatar = document.getElementById('avatar').value
    const comment = document.getElementById('comment').value
    let data = { avatar, name, comment}
     console.log(data, "from function")
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments/${commentId}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "PUT",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.id && data.name){
            window.alert('Success! Your article has been Edited successfully')
            window.location.reload();
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit').addEventListener('click', editArticle)
})