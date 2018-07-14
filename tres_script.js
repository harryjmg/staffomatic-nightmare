const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
link_to_schedule = "";

// THIS BELOW IS NOT WORKING
function get_a_shift() {
  console.log("Saying Hello");
  nightmare
    // la ligne du dessous est longue et moche je sais
    .evaluate( () => document.querySelector('.category-id-118174').nextSibling.nextSibling.querySelectorAll('div[data-date="2018-07-30"] a'))
    .then( function(x) {
      nightmare.click(x).wait(3000).then(console.log);
    });
}

// THIS BELOW IS WORKING
nightmare
  .goto('https://nightmare-test.staffomaticapp.com/login')
  .wait('#login-form #user_email')
  .type('#login-form #user_email', 'harry.jmg+employee@gmail.com')
  .type('#login-form #user_password', 'crevette')
  .click('button.btn.btn-default')
  .wait('div.well a')
  //  Logged.
  .click('div.well a')
  .wait('ul.list-group.schedule-list')
  .click('ul.list-group.schedule-list .schedule-item-container:last-child a')
  .then( function() {
    nightmare
      .wait(3000)
      .then(get_a_shift());
    });


// console.log(link_to_schedule);
//
// nightmare
//   .goto(link_to_schedule)
//   .wait('#schedule-main');

  //.evaluate(() => document.querySelectorAll('ul.list-group.schedule-list:last-child a').href)

  // var nodes = div.querySelectorAll('[move_id]');
  // var first = nodes[0];
  // var last = nodes[nodes.length- 1];

  //  On schedule page.
  // .end()
  // .then(console.log)
  // .catch(error => {
  //   console.error('Search failed:', error)
  // })
