console.log("Starting AbuseIPDB checker...");
require("dotenv").config();

const checker = require("../modules/checker/checker");
const cron = require("../modules/cron/cron");
const ip = require("../modules/ip/ip");
const pinger = require("../modules/pinger/pinger");

cron(ip, checker, pinger)
