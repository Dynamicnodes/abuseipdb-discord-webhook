const { AbuseIPDBClient } = require("abuseipdb-client");

const client = new AbuseIPDBClient(process.env.ABUSEIPDB_KEY);

async function checkIpStatus(ipList) {
  const results = {};

  for (const ip of ipList) {
    try {
      const resp = await client.check(ip, {
        maxAgeInDays: 90,
        verbose: true
      });

      response = resp.result;
      if (!response.data) {
        console.log(ip, { error: true, message: "Invalid response from AbuseIPDB" });
        continue; 
      }

      const score = response.data.abuseConfidenceScore;

      const isBlocked = score >= 50; 

      results[ip] = {
        blocked: isBlocked,
        ...(isBlocked && {
          abuseConfidenceScore: response.data.abuseConfidenceScore,
          countryCode: response.data.countryCode,
          usageType: response.data.usageType,
          domain: response.data.domain,
          totalReports: response.data.totalReports,
          lastReportedAt: response.data.lastReportedAt,
          reports: response.data.reports || [],
        })
      };
    } catch (error) {
      results[ip] = {
        error: true,
        message: error.message
      };
    }
  }

  return results;
}

module.exports = checkIpStatus;
