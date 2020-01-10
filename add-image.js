console.log(window.location.href.split('=')[1]);
const articleId = window.location.href.split('=')[1]



function editArticle(e){
    e.preventDefault()
    
    const image = document.getElementById('image').value
    let data = { image }
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images`,
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
        console.log(data, "current data")
        if(data.id && data.image){
            window.alert('Success! Your Picture has been Uploaded successfully')
            window.location.reload();
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit').addEventListener('click', editArticle)
})