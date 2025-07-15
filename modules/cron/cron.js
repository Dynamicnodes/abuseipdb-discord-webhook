const runJob = require('./job');

function startCron(ipList, checker, pinger) {
  runJob(ipList, checker, pinger);

  setInterval(() => {
    runJob(ipList, checker, pinger);
  }, 60 * 60 * 1000);
}

module.exports = startCron;
