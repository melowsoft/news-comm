


function createArticle(e){
    e.preventDefault()
    const author = document.getElementById('author').value
    const avatar = document.getElementById('avatar').value
    const title = document.getElementById('title').value
    const url = document.getElementById('url').value
    let data = {author, avatar, title, url}
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.id && data.title){
            window.alert('Success! Your article has been created successfully')
            window.location.reload();
        }
    })
    .catch(err => console.log(err.message)) 
}


document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit').addEventListener('click', createArticle)
})