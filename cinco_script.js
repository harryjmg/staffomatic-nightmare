const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
link_to_schedule = "";

var my_wishes = [
  {hour: "08:00 - 18:00", date: '2018-07-30', 'dept': "18e arrondissement"},
  {hour: "08:00 - 18:00", date: '2018-07-31', 'dept': "18e arrondissement"}
]

// THIS BELOW IS WORKING
function get_a_shift() {
  console.log("Saying Hello");
  nightmare
    .evaluate( function() {
      var shifts_of_day = document.querySelector('.category-id-118174').nextSibling.nextSibling.querySelectorAll('div[data-date="2018-07-30"] a');
      shifts_of_day[0].click();
    })
    .wait('.btn.btn-default.action-assign')
    .evaluate( function() {
      document.querySelector('.btn.btn-default.action-assign').click();
    })
    .wait(500)
    .evaluate( function() {
      document.querySelector('button.close').click();
    })
    .then( function(x) {
      console.log('%c Dans la poche', 'color: green');
      console.log('%c Il est complet celui la putain', 'color: red');
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
      .wait('.ccc-event.shift')
      .evaluate( function() {
        function keep_wishes_only(element) {
          console.log(element);
          // for (var i = 0; i < my_wishes.length; i++) {
          //   if (my_wishes[i]["hour"] === element["hour"] &&
          //    my_wishes[i]["date"] === element["date"] &&
          //    my_wishes[i]['dept'] === element["dept"])
          //    { return true; }
          // }
           return false;
        }
        all_shifts = document.querySelectorAll('a.ccc-event.shift');
        all_my_shifts = all_shifts.filter(keep_wishes_only);
      })
      .then(console.log);
    });
