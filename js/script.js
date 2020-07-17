'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const href = clickedElement.getAttribute('href');
  const activeArticle = document.querySelector(href);
  activeArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    article.classList.remove('post');
  }

  /* get the article id */
  const articleId = article.getAttribute('id');
  
  /* find the title element */
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  console.log('linkHTML:', linkHTML);

  /* get the title from the title element */
 const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

  /* create HTML of the link */
  titleList.innerHTML = titleList.innerHTML + linkHTML;

  /* insert link into titleList */
  html = html + linkHTML;

 titleList.innerHTML = html;

 const links = document.querySelectorAll('.titles a');
 console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();