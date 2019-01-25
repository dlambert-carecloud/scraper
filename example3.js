var Nightmare = require('nightmare');
var vo = require('vo');

vo(run)(function(err, result) {
if (err) throw err;
});

function* run() {
var nightmare = Nightmare(),
MAX_PAGE = 15,
currentPage = 0,

yield nightmare
    .goto('https://www.indeed.com/')
    .type( '#text-input-what', 'Medical Biller')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .press('#text-input-where', 'Backspace')
    .type('#text-input-where', 'United States')
    .click('.icl-WhatWhere-button')
    .wait('.clickcard > a')


while (currentPage < MAX_PAGE) {
        console.log("page 1");
        yield nightmare
            .click('.np')
            .wait('.clickcard > a')

        currentPage++;
}
yield nightmare.end();
}



// while (currentPage < MAX_PAGE) {
//     links.push(yield nightmare
//         .evaluate(function() {
//             var links = document.querySelectorAll("ol.searchCenterMiddle a");
//             console.log(links[0].href);
//             return links[0].href;
//         }));

//         yield nightmare
//             .click('.next')
//             .wait('body')

//         currentPage++;
//         nextExists = yield nightmare.visible('.next');
// }
// console.dir(links);
// yield nightmare.end();