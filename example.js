const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

async function main() {
    Press(Nightmare)

    const nightmare = Nightmare({ show: true })

await nightmare
  .goto('https://www.indeed.com/')
  .wait(2000)
  .type( '#text-input-what', 'Medical Biller')
  .wait(2000)
  .press('#text-input-where')
  .wait(2000)
  .click('#text-input-where')
  .wait(2000)
  .click('#text-input-where')
  .insert('#text-input-where', 'United States')
  .click('.icl-WhatWhere-button')
  .wait('#jobtitle')
  .evaluate(() => document.querySelector('#jobtitle').innerText)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })

  function sleep(ms) {
    return new Promise(res => setTimeout(res, ms))
  }
  
  function Press(Nightmare) {
    Nightmare.action(
      'press',
      function(name, options, parent, win, renderer, done) {
        parent.respondTo('press', function(keyCode, done) {
          win.webContents.sendInputEvent({ type: 'keyDown', keyCode: keyCode })
          win.webContents.sendInputEvent({ type: 'keyUp', keyCode: keyCode })
          done()
        })
        done()
      },
      function(selector, keyCode, done) {
        // focus, press, blur
        // TODO: clean me up
        return this.evaluate_now(
          selector => document.querySelector(selector).focus(),
          () =>
            this.child.call('press', keyCode, () => {
              this.evaluate_now(
                selector => document.querySelector(selector).blur(),
                () => done(),
                selector
              )
            }),
          selector
        )
      }
    )
  }
}



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