console.log(window.location.href.split('='), "working")
const articleId = window.location.href.split('=')[1]

if(articleId){
         fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`)
         .then(response => response.json())
         .then(data => {
             const { avatar, title, url } = data
             document.getElementById('avatar').value = avatar
             document.getElementById('title').value = title
             document.getElementById('url').value = url
        })
        .catch(err => console.log(err.message)) 
}

function editArticle(e, id){
    e.preventDefault()
    const avatar = document.getElementById('avatar').value
    const title = document.getElementById('title').value
    const url = document.getElementById('url').value
    let data = { avatar, title, url}
     console.log(data, "from function")
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`,
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
        if(data.id && data.title){
            window.alert('Success! Your article has been Edited successfully')
            window.location.reload();
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit').addEventListener('click', editArticle)
})