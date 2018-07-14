const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
link_to_schedule = "Hola";

nightmare
  .goto('https://nightmare-test.staffomaticapp.com/login');

nightmare
  .wait('#login-form #user_email')
  .evaluate( (param) => console.log(param), link_to_schedule)
  .then( function(url) {
    nightmare.click('#schedule-420890')
      .wait(3000)
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
