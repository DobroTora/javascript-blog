'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorCloud: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML)
};

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
  const linkHTMLData = {id: articleId, title: articleTitle};
  const linkHTML = templates.articleLink(linkHTMLData);

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

function generateTags(){ 
  let allTags = {};  
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){    
    const tagWrapper = article.querySelector(optArticleTagsSelector);    
    let html = '';   
    const tags = article.getAttribute('data-tags');      
    const splitTagsArray = tags.split(' ');   
    for(let tag of splitTagsArray){    
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);     
      html = html + linkHTML;         
      if(!allTags[tag]){   
        allTags[tag]=1;
      } else {
        allTags[tag]++;
      } 
    }      
    const tagsParams = calculateTagsParams(allTags);      
    tagWrapper.innerHTML = html; 
    const tagList = document.querySelector('.tags');
    const allTagsData = {tags: []};
    for(let tag in allTags){                 
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);   
  }
}

function calculateTagClass(count, params){     
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

generateTags();

  tagList.innerHTML = allTagsHTML;

  function tagClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href'); 
    const tag = href.replace('#tag-', ''); 
    const activeTags = document.querySelectorAll('.posts .active');
    for(let activeTag of activeTags){    
      activeTag.classList.remove('active');   
    }
    const tagLinksAsArrticle = document.querySelectorAll('a[href="' + href + '"]');
    for(let tagLinkAsArrticle of tagLinksAsArrticle){
      tagLinkAsArrticle.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]'); 
  }
  
  function addClickListenersToTags(){
    const tagLinks = document.querySelectorAll('.post-tags a');  
    const tagCloudLinks = document.querySelectorAll('.tags a');  
    for(let tagLink of tagLinks){
      tagLink.addEventListener('click', tagClickHandler);
    }   
    for(let tagCloudLink of tagCloudLinks){
      tagCloudLink.addEventListener('click', tagClickHandler);
    }  
  }
  
  addClickListenersToTags();


  function generateAuthors(event){ 
    let allAuthors = {}; 
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector('.post-author');    
      let html = '';
      const authors = article.getAttribute('data-author');     
      const splitAuthorsArray = authors.split(' ');          
      for(let author of splitAuthorsArray){      
        const linkHTMLData = {author: author};
        const linkHTML = templates.authorLink(linkHTMLData);
        html = html + linkHTML;
        if(!allAuthors[author]){
          allAuthors[author]=1;
        } else{
          allAuthors[author]++;
        }
      }         
      authorWrapper.innerHTML = html;
      const authorList = document.querySelector('.authors'); 
      let allAuthorsData = {authors: []};
      for(let author in allAuthors){        
          allAuthorsData.authors.push({
            author: author
          });
        }
        authorList.innerHTML = templates.authorCloud(allAuthorsData);
    }
  }
  
  generateAuthors();