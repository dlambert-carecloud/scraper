const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  Press(Nightmare)

  const nightmare = Nightmare({ show: true })


  await nightmare.goto('https://www.indeed.com/')
  await nightmare.type( '#text-input-what', 'Medical Biller')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.press('#text-input-where', 'Backspace')
  await nightmare.type('#text-input-where', 'United States')
  await nightmare.click('.icl-WhatWhere-button')
  await nightmare.wait('.clickcard > a')
  let role = await nightmare.evaluate(() => document.querySelector('.clickcard > a').innerText);
  let company = await nightmare.evaluate(() => document.querySelector('span.company').innerText);
  let location = await nightmare.evaluate(() => document.querySelector('.location').innerText);
  let joblink = await nightmare.evaluate(() => document.querySelector('.clickcard > a').href);

  let clickcards = await nightmare.evaluate(() => document.querySelectorAll('.clickcard'));
  await nightmare.then(console.log(clickcards));


  await nightmare.end()
  await nightmare.then(console.log(role, company, location, joblink))
  await nightmare.catch(error => {
    console.error('Search failed:', error)
  })

  await sleep(5000)
  await nightmare.end()
}

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