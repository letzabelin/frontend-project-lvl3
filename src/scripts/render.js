const feedsBlock = document.querySelector('#rss-feeds');
const articlesBlock = document.querySelector('#rss-articles');
const titlesOfFeeds = [];
const titlesOfArticles = [];

const renderFeed = ({ title, description, link }) => {
  if (titlesOfFeeds.includes(title)) return;
  titlesOfFeeds.push(title);

  const templateFeedItem = `
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">${title}</h5>
  </div>
  <p class="mb-1">${description}</p>
  `;

  const anchorElement = document.createElement('a');
  anchorElement.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
  anchorElement.setAttribute('href', link);
  anchorElement.innerHTML = templateFeedItem;

  feedsBlock.prepend(anchorElement);
};

const renderArticle = ({ title, link, description }) => {
  if (titlesOfArticles.includes(title)) return;
  titlesOfArticles.push(title);

  const templateArticleItem = `
  <li class="list-group-item d-flex justify-content-between align-items-center bg-light">
    <a href=${link} class="text-dark">${title}</a>
    <button type="button" class="btn btn-secondary ml-4" data-toggle="modal" data-target="#info-modal" data-whatever='${description}'>
      Информация
    </button>
  </li>
  `;

  const divElement = document.createElement('div');
  divElement.innerHTML = templateArticleItem;

  articlesBlock.prepend(divElement);
};

const typeOfRender = {
  feed: renderFeed,
  article: renderArticle,
};

export default (type, data) => data.map(typeOfRender[type]);