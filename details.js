console.log(window.location.href.split('='), "working")
const articleId = window.location.href.split('=')[1]
function fetchArticleDetail(){
   return fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}`)
    .then(response => response.json())
    .then(data => renderArticleDetail(data))
    .catch(err => console.log(err.message))  
}



function renderArticleDetail(data){

    document.querySelector(".art-img").src = data.avatar;
    document.querySelector(".title").innerHTML=data.title
    document.querySelector(".date").innerHTML=new Date(data.createdAt)
    document.getElementById('add-img-container').innerHTML= `
    <a href="/add-image.html?id=${articleId}" class="add-img-btn">Add Image</a>
    `
}
 
function fetchArticleComments(){
    return fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments`)
    .then(response => response.json())
    .then(data => {
        renderArticleComments(data)}) 
        .catch(err => console.log(err.message)) 
}

function renderArticleComments(data){
    if(data.length !== 0){
        const commentContainer = document.querySelector(".description");
        for(let i = 0; i < data.length; i++){

        const comment = document.createElement("div")
               comment.classList.add('comment-card')     
        comment.innerHTML = `
        <p class="user-comment">${data[i].comment}</p>
        <div class="comment-flex">
        <img class="user-comment-image" src="${data[i].avatar}" width="30" height="30" alt="">
        <span class="name">${data[i].name}</span>
        </div>
        <div class="comment-actions">
        <a href="/edit-comment.html?id=${data[i].articleId}&${data[i].id}" class="edit" id="edit-btn">Edit</a>
        <span class="delete" id="delete-btn" onclick="deleteSingleComment(${data[i].articleId},${data[i].id})">Delete</span>
        
        </div>
        `
       commentContainer.childNodes[0].before(comment);
        }
       
    }
}

function renderCarousel(data){
    if(data.length !== 0){
        const carouselContainer = document.querySelector("#carousel");
        for(let i = 0; i < data.length; i++){

        const image = document.createElement("img")
        image.classList.add("img");
        image.classList.add("animate");
        image.src = data[i].avatar
       carouselContainer.childNodes[0].before(image);
        }
       
    }
}



function fetchArticlePictures(){
    return fetch(` http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/images`)
    .then(response => response.json())
    .then(data => renderCarousel(data)) 
    .catch(err => console.log(err.message)) 
}



function deleteSingleComment(articleID, commentID){
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleID}/comments/${commentID}`,
{
    method: 'DELETE'
})
    .then(response => response.json())
    .then(data => {
        if(data.id && data.comment){
            window.alert("Comment has been deleted!")
            window.location.reload();
        }
    })
    .catch(err => console.log(err.message)) 
}
function createComment(){
   name = document.getElementById('name').value
   avatar = document.getElementById('avatar').value
   comment = document.getElementById('comment').value
   const data = {name, avatar, comment, articleId}
    return fetch(`http://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article/${articleId}/comments`,
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
        if(data.id && data.comment){
            window.alert("Comment has been Added!")
            window.location.reload();
        }
    })
    .catch(err => console.log(err.message)) 
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('comment-btn').addEventListener('click', createComment)
})



fetchArticleDetail();
fetchArticleComments();
fetchArticlePictures();

//carousel here
var index = 0;
var amount = 0;//amount of images
var currTransl = []
var translationComplete = true;

var transitionCompleted = function(){
    translationComplete = true;
}

document.addEventListener("DOMContentLoaded", function(event) 
{
    amount = document.getElementsByTagName('img').length;
    document.getElementsByTagName('span')[0].innerHTML = amount;
    for(var i = 0; i < amount; i++)
    {
        currTransl[i] = -200;
        document.getElementsByTagName('img')[i].addEventListener("transitionend", transitionCompleted, true);                    
        document.getElementsByTagName('img')[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);                    
        document.getElementsByTagName('img')[i].addEventListener("oTransitionEnd", transitionCompleted, true);                    
        document.getElementsByTagName('img')[i].addEventListener("MSTransitionEnd", transitionCompleted, true);                  
    }
    console.log("DOM fully loaded and parsed");
});

function right()
{
    if(translationComplete === true)
    {
        translationComplete = false;
        index--;
        if(index == -1)
        {
            index = amount-1;
        }
        var outerIndex = (index) % amount;
        document.getElementById('index').innerHTML = outerIndex === 0 ? 5 : outerIndex;
        for(var i = 0; i < amount; i++)
        {
            var img = document.getElementsByClassName("img")[i];    
            img.style.opacity = '1';    
            img.style.transform = 'translate('+(currTransl[i]+200)+'px)';
            //img.className = 'img';
            //img.className.replace( /(?:^|\s)animate(?!\S)/g , '' );
            currTransl[i] = currTransl[i]+200;
        }
        
        var outerImg = document.getElementsByClassName("img")[outerIndex];
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]-200*(amount))+'px)';
        outerImg.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]-200*(amount);
    }
}

function left()
{
    if(translationComplete === true)
    {
        translationComplete = false;
        index++;
        var outerIndex = (index-1) % amount;
        document.getElementById('index').innerHTML = outerIndex+1;
        for(var i = 0; i < amount; i++)
        {
            var img = document.getElementsByClassName("img")[i];    
            img.style.opacity = '1';    
            img.style.transform = 'translate('+(currTransl[i]-200)+'px)';
            currTransl[i] = currTransl[i]-200;
        }
        var outerImg = document.getElementsByClassName("img")[outerIndex];
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]+200*(amount))+'px)';
        outerImg.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]+200*(amount);
    }
}