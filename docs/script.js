'use strict';

// Two arrays keep the product catalog and the visitor's choices separate.
const products = [
  { id: 'sourdough', name: 'Country sourdough' },
  { id: 'wheat', name: 'Whole wheat' },
  { id: 'baguette', name: 'Baguette' },
  { id: 'croissant', name: 'Butter croissant' },
  { id: 'cookie', name: 'Chocolate chip cookie' },
  { id: 'cake', name: 'Celebration cake' }
];
const storageKey = 'northStar.favorites.v1';
let favorites = [];
let storageAvailable = true;

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    // Ignore corrupt data and IDs that are no longer in the catalog.
    favorites = Array.isArray(saved)
      ? [...new Set(saved.filter(id => products.some(product => product.id === id)))] : [];
  } catch (error) {
    favorites = [];
    storageAvailable = false;
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }
}

function favoriteNames() {
  return products.filter(product => favorites.includes(product.id)).map(product => product.name);
}

function renderFavorites(message = '') {
  const options = document.getElementById('favorite-options');
  if (!options) return;
  options.replaceChildren();
  products.forEach(product => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.product = product.id;
    button.textContent = product.name;
    button.setAttribute('aria-pressed', String(favorites.includes(product.id)));
    button.addEventListener('click', () => toggleFavorite(product.id));
    options.append(button);
  });
  const list = document.getElementById('favorite-list');
  list.replaceChildren();
  const names = favoriteNames();
  (names.length ? names : ['No favorites yet. Choose an item above.']).forEach(name => {
    const item = document.createElement('li');
    item.textContent = name;
    list.append(item);
  });
  document.getElementById('favorite-count').textContent = favorites.length;
  document.getElementById('clear-favorites').disabled = favorites.length === 0;
  document.getElementById('favorite-status').textContent = storageAvailable
    ? message : 'Browser storage is unavailable. Selections work on this page but may not be remembered.';
}

function toggleFavorite(id) {
  const selected = favorites.includes(id);
  favorites = selected ? favorites.filter(item => item !== id) : [...favorites, id];
  saveFavorites();
  renderFavorites(`${products.find(product => product.id === id).name} ${selected ? 'removed' : 'saved'}.`);
  // Rendering replaces buttons; restore focus for keyboard users.
  document.querySelector(`[data-product="${id}"]`).focus();
}

function initializeForm() {
  const form = document.getElementById('request-form');
  if (!form) return;
  form.noValidate = true; // JavaScript supplies consistent inline feedback.
  const ids = ['customer-name', 'email', 'request-type', 'pickup-date', 'item-details'];
  ids.forEach(id => {
    const field = document.getElementById(id);
    const error = document.createElement('span');
    error.id = `${id}-error`;
    error.className = 'field-error';
    field.insertAdjacentElement('afterend', error);
    field.setAttribute('aria-describedby', `${field.getAttribute('aria-describedby') || ''} ${error.id}`.trim());
    field.addEventListener('input', () => {
      document.getElementById('form-status').textContent = '';
      if (field.getAttribute('aria-invalid') === 'true') validateField(id);
    });
  });
  document.getElementById('request-type').addEventListener('change', () => {
    if (document.getElementById('pickup-date').getAttribute('aria-invalid') === 'true') validateField('pickup-date');
  });
  const useButton = document.getElementById('use-favorites');
  useButton.disabled = favorites.length === 0;
  document.getElementById('favorites-help').textContent = favorites.length
    ? `Remembered favorites: ${favoriteNames().join(', ')}. Add them to your request below.`
    : 'Save favorites on the Products page to bring them into a request.';
  useButton.addEventListener('click', () => {
    const details = document.getElementById('item-details');
    const text = `Items I am interested in: ${favoriteNames().join(', ')}. Please confirm quantities and availability.`;
    const combined = details.value.trim() ? `${details.value}\n${text}` : text;
    if (combined.length > 1500) {
      document.getElementById('favorites-help').textContent = 'Your request is too long to add favorites. Shorten it first; your text has been kept.';
      return;
    }
    details.value = combined;
    document.getElementById('request-type').value = 'preorder';
    validateField('item-details');
    validateField('request-type');
    useButton.disabled = true;
    document.getElementById('favorites-help').textContent = 'Favorites added. Include quantities and choose a pickup date.';
    details.focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault(); // This class project has no backend or real order submission.
    const invalid = ids.filter(id => !validateField(id));
    const status = document.getElementById('form-status');
    status.textContent = invalid.length
      ? `Please correct ${invalid.length} field${invalid.length === 1 ? '' : 's'} below. Your entries have been kept.`
      : 'Your practice request passed validation. Nothing was sent to the bakery. Your entries remain here for review.';
    if (invalid.length) document.getElementById(invalid[0]).focus();
    else status.focus();
  });
}

function validateField(id) {
  const field = document.getElementById(id);
  const value = field.value.trim();
  let message = '';
  if (id === 'customer-name' && (!value || value.length > 100)) message = 'Enter your name using 1–100 characters.';
  if (id === 'email' && (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) message = 'Enter a valid email address, such as name@example.com.';
  if (id === 'request-type' && !['preorder', 'question'].includes(value)) message = 'Choose a request type.';
  if (id === 'item-details' && (value.length < 10 || value.length > 1500)) message = 'Enter 10–1,500 characters about your request.';
  if (id === 'pickup-date' && document.getElementById('request-type').value === 'preorder' && !value) message = 'Choose a pickup date for your preorder.';
  document.getElementById(`${id}-error`).textContent = message;
  field.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

loadFavorites();
renderFavorites(favorites.length ? 'Your saved favorites have been restored.' : '');
const clearButton = document.getElementById('clear-favorites');
if (clearButton) clearButton.addEventListener('click', () => {
  favorites = [];
  saveFavorites();
  renderFavorites('Favorites cleared.');
  document.querySelector('[data-product]').focus();
});
initializeForm();
