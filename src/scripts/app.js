import 'bootstrap/js/dist/modal';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import { updateArticles, addFeed } from './makeRequest';


export default () => {
  const state = {
    input: {
      inputField: 'empty',
    },
    button: {
      requestState: 'wait',
    },
    urlList: [],
    feedsList: [],
    articlesList: [],
  };

  watch(state);
  updateArticles(state);

  const input = document.querySelector('#rss-input');
  const addFeedButton = document.querySelector('#rss-button');

  const handleInput = (evt) => {
    const { value } = evt.target;
    const isValidURL = isURL(value) && !state.urlList.includes(value);
    state.button.requestState = 'wait';

    if (value === '') {
      state.input.inputField = 'empty';
    } else if (isValidURL) {
      state.input.inputField = 'valid';
    } else {
      state.input.inputField = 'invalid';
    }
  };

  const handleButton = (evt) => {
    evt.preventDefault();

    addFeed(state, input.value);
    state.button.requestState = 'requesting';
  };

  input.addEventListener('input', handleInput);
  addFeedButton.addEventListener('click', handleButton);

  $('#info-modal').on('show.bs.modal', function showModal(event) {
    const infoButton = $(event.relatedTarget);
    const articleDescription = infoButton.data('whatever');
    const modalWindow = $(this);
    modalWindow.find('#modal-description').text(articleDescription);
  });

  $(window).on('load', () => {
    $('.preloader').delay(1000).fadeOut('slow');
  });
};