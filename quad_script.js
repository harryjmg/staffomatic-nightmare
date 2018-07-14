const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
link_to_schedule = "";

nightmare
  .goto('https://nightmare-test.staffomaticapp.com/login');

nightmare
  .wait('#login-form #user_email')
  .type('#login-form #user_email', 'harry.jmg+employee@gmail.com')
  .type('#login-form #user_password', 'crevette')
  .click('button.btn.btn-default')
  .wait('div.well a')
  //  Logged.
  .click('div.well a')
  .wait('ul.list-group.schedule-list')
  .evaluate( () => document.querySelectorAll('ul.list-group.schedule-list a')[document.querySelectorAll('ul.list-group.schedule-list a').length - 1].href)
  .then( function(url) {
    a = url.substr(0, url.indexOf('#'));
    b = url.substr(url.lastIndexOf('/'));
    working_url = a + '/schedules' + b
    console.log(working_url);
    nightmare.goto(working_url)
      .wait(10000)
      .then(console.log);
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
