let Nightmare = require('nightmare');
let nightmare = Nightmare({ show: true });

nightmare
  .goto('https://www.popularmechanics.com/culture/gaming/g18/15-best-new-board-games-of-the-year/')
  .wait('div.listicle-body-content')
  .evaluate(function () {
    const getPrice = (priceElement) => {
      const discountedPrice = priceElement.querySelector('.discount-price');
      const price = discountedPrice ? discountedPrice.innerHTML : priceElement.innerHTML;
      return price.trim();
    }
    const games = document.querySelectorAll('.listicle-slide-product');
    const titles = []
    games.forEach(gameObject => titles.push(
      {
        name: gameObject.querySelector('.listicle-slide-hed-text').innerHTML,
        price: getPrice(gameObject.querySelector('.product-slide-price'))
      }
      ))
    return titles
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

