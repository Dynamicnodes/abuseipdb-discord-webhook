

const axios = require('axios');

const DISCORD_WEBHOOK_URL = 'EXAMPLE_DISCORD_WEBHOOK_URL'; // Replace with your actual Discord webhook URL


async function sendIpReport(ip, info) {
  if (!info.blocked) return;

  const embed = {
    title: `🚨 Blocked IP: ${ip}`,
    color: 0xff0000,
    fields: [
      {
        name: 'Abuse Confidence Score',
        value: `${info.abuseConfidenceScore}%`,
        inline: true
      },
      {
        name: 'Total Reports',
        value: `${info.totalReports}`,
        inline: true
      },
      {
        name: 'Last Reported',
        value: info.lastReportedAt || 'Not available',
        inline: false
      },
      {
        name: 'Country',
        value: info.countryCode || 'Unknown',
        inline: true
      },
      {
        name: 'Usage Type',
        value: info.usageType || 'Unknown',
        inline: true
      },
      {
        name: 'Domain',
        value: info.domain || 'Unknown',
        inline: true
      }
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'AbuseIPDB Report System'
    }
  };

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed]
    });

    console.log(`[+] Report sent to Discord for IP ${ip}`);
  } catch (error) {
    console.error(`[-] Error sending report for IP ${ip}:`, error.message);
  }
}

module.exports = sendIpReport;
