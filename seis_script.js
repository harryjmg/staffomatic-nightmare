const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
link_to_schedule = "";

var my_wishes = [
  {hour: "08:00 - 18:00", date: '2018-08-01', 'dept': "18e arrondissement"},
  {hour: "08:00 - 18:00", date: '2018-08-03', 'dept': "18e arrondissement"}
]

var useful_dept = Array.from(my_wishes, x => x["dept"]);
useful_dept = useful_dept.filter((v, i, a) => a.indexOf(v) === i);

var useful_date = Array.from(my_wishes, x => x["date"]);
useful_date = useful_date.filter((v, i, a) => a.indexOf(v) === i);

var useful_hour = Array.from(my_wishes, x => x["hour"]);
useful_hour = useful_hour.filter((v, i, a) => a.indexOf(v) === i);




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
      .wait(3000)
      .evaluate(
        function(my_wishes, useful_dept, useful_date, useful_hour) {
          // STARTING TO SHIT _______________________________________
          function useless_dept(dept) {
            return !useful_dept.includes(dept);
          }

          function useless_date(date) {
            return !useful_date.includes(date);
          }

          function useless_hour(hour) {
            return !useful_hour.includes(hour);
          }

          function doggystyle_the_shift(element, callback) {
            element.click();
            setTimeout(function(){
              console.log("a");
              var assign_btn = document.querySelector('.btn.btn-default.action-assign');
              if (assign_btn == undefined) {
                //console.log("Bitch left us");
                callback();
              }
              assign_btn.click();
              //console.log("Bitch fucked");
              setTimeout(function(){
                console.log("b");
                document.querySelector('button.close').click();
                callback();
              }, 4000);
            }, 2000);
          }

          function judge_and_execute(array, i, length) {
            console.log(i);
            if (i == length) return ;
            element = array[i];
            dept = element.parentElement.parentElement.parentElement.firstElementChild.textContent.trim();
            if (useless_dept(dept)) {
              console.log("useless");
              return judge_and_execute(array, i + 1, length);
            };
            date = element.parentElement.getAttribute('data-date').trim();
            if (useless_date(date)) {
              console.log("failed date");
              return judge_and_execute(array, i + 1, length);
            }
            hour = element.text.trim();
            if (useless_hour(hour)) {
              console.log("failed hour");
              return judge_and_execute(array, i + 1, length);
            }
            console.log("Not useless !");
            doggystyle_the_shift(element, function() {
              console.log("he");
              console.log(array);
              return judge_and_execute(array, i + 1, length);
            });
          }

          all_shifts = document.querySelectorAll('a.ccc-event.shift');
          console.log(all_shifts);
          judge_and_execute(all_shifts, 0, all_shifts.length);

          // return all_shifts.forEach(judge_and_execute);

          // for (let num of all_shifts) {
          //   judge_and_execute(num);
          //   console.log(result);
          // }

          // let promise = Promise.resolve();
          // all_shifts.forEach(function() {
          //   promise.then(function() {
          //     console.log("1");
          //   }, 4000)
          // });


          // ENDING TO THE SHIT ____________________________________
        },
        my_wishes, useful_dept, useful_date, useful_hour
    )
      .then();
    });
