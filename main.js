
var currentPage = 1
var articles = [];


function fetchArticles(page){
   return fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article?page=${page}&limit=9
    `)
    .then(response => response.json())
    .then(data => {
        console.log(data, "getting articles")
        articles = data;
        renderArticle()
    })
}



function renderArticle(){
    if(articles.length !== 0){
        const cardContainer = document.querySelector(".wrapper");
        cardContainer.innerHTML = ''
        for(let i = 0; i < articles.length; i++){

        const articleCard = document.createElement("div")
        articleCard.classList.add("card");
        articleCard.innerHTML = `
        <div class="card__image border-tlr-radius">
        <img src="${articles[i].avatar}" alt="image" class="border-tlr-radius">
        </div>
        <div class="card__content card__padding">
       <div class="card__meta">
           <time>${new Date(articles[i].createdAt)}</time>
       </div>

       <article class="card__article">
           <h2><a href="#">${articles[i].title}</a></h2>
           <span >${articles[i].url}</span>
           <br>
           <a href="/details.html?id=${articles[i].id}" class="detail-btn">View Detail</a>
           <button onclick="deleteArticle(${articles[i].id})" class="delete-btn">Delete</button>
           <a href="/edit.html?id=${articles[i].id}" class="edit-btn">Edit</a>
           
       </article>
   </div>
       `;
       cardContainer.prepend(articleCard);
        }
       
    }
}

function deleteArticle(id){
    return fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1//article/${id}
    `, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        if(data.id && data.title){
            window.alert('Artilcle has been Deleted!')
            window.location.reload();
        }
    })
    .catch(err => console.log(err.message)) 
}

document.getElementById('next').addEventListener('click', function(){
    currentPage = currentPage + 1
    articles = [];
   return fetchArticles(currentPage);
})
document.getElementById('prev').addEventListener('click', function(){
    currentPage = currentPage - 1
    articles = [];
   return fetchArticles(currentPage);
})

fetchArticles(currentPage);

console.log(currentPage)




