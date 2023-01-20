console.log('Module.js');

async function start() {
  await Promise.resolve('aaaa')
}

start().then(console.log)