const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })


nightmare
  .goto('https://www.indeed.com/')
  .wait(2000)
  .type( '#text-input-what', 'Medical Biller')
  .click('#text-input-where')
  .wait(2000)
  .click('#text-input-where')
  .insert('#text-input-where', 'United States')
  .click('.icl-WhatWhere-button')
  .wait('.jobtitle')
  .evaluate(() => document.querySelector('.jobtitle').innerText)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })



//   .goto('https://duckduckgo.com')
//   .type('#search_form_input_homepage', 'Hailey Utke')
//   .click('#search_button_homepage')
//   .wait('#r1-0 a.result__a')
//   .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
//   .end()
//   .then(console.log)
//   .catch(error => {
//     console.error('Search failed:', error)
//   })