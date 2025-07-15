async function runJob(ipList, checker, pinger) {
  console.log(`[${new Date().toISOString()}] Running job`);

  try {
    const response = await checker(ipList());

    for (const [ip, info] of Object.entries(response)) {
      await pinger(ip, info);
    }

    console.log(`[${new Date().toISOString()}] Job completed`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in job:`, error.message);
  }
}

module.exports = runJob;
