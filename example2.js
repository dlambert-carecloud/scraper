const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  Press(Nightmare)

  const nightmare = Nightmare({ show: true })

  maxpage = 15;
  currentPage = 0;

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

  while (currentPage < maxpage) {
    // let totalcards = await nightmare.evaluate(() => document.querySelectorAll('.clickcard').length);
    // await nightmare.then(console.log(totalcards));
    let clickcard1 = await nightmare.evaluate(() => document.querySelectorAll('.clickcard > a')[1].innerText);
    let company1 = await nightmare.evaluate(() => document.querySelectorAll('span.company')[1].innerText);
    let location1 = await nightmare.evaluate(() => document.querySelectorAll('.location')[1].innerText);
    let link1 = await nightmare.evaluate(() => document.querySelectorAll('.clickcard >a')[1].href);
    await nightmare.then(console.log(clickcard1, company1, location1, link1));
    await nightmare.click('.np');
    await nightmare.wait('.clickcard > a');
    await nightmare.wait(2000);

    currentPage++;
}


  await nightmare.end()
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