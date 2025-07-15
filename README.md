[![Automated AbuseIPDB Reports via Discord Webhook](https://i.imgur.com/HEgWwcF.png)](https://www.abuseipdb.com/)

## How to add IPs
1. Navigate to `/modules/ip/list.json`
2. Open the file and add your IPs to the JSON object under the "ips" array
3. Each IP should be added as a string in the array format
4. Example:
```json
{
    "ips": [
        "192.168.1.1",
        "10.0.0.1",
        "172.16.0.1",
        "8.8.8.8"
    ]
}
```

## .env
1. Copy the `.env.copy` file to `.env`
2. Open the `.env` file and replace `KEY_HERE` with your actual AbuseIPDB API key
```env
ABUSEIPDB_KEY = KEY_HERE
```

## Configure Discord Webhook
1. Go to `/modules/pinger/pinger.js`
2. Find the line with `EXAMPLE_DISCORD_WEBHOOK_URL`
3. Replace `EXAMPLE_DISCORD_WEBHOOK_URL` with your actual Discord webhook URL
```js
const DISCORD_WEBHOOK_URL = 'YOUR_ACTUAL_DISCORD_WEBHOOK_URL_HERE';
```

## Modify the check interval
1. Go to `/modules/cron/cron.js`
2. Find the interval setting code
3. Edit the interval time **time must be in milliseconds**
   - Example: 3600000 = 1 hour
   - Example: 86400000 = 24 hours (1 day)
   - Example: 604800000 = 7 days
   - Shorter intervals may lead to higher API usage

## Modify the confidence score
1. Go to `/modules/checker/checker.js`
2. Search for the following line:
```js
      const isBlocked = score >= 50; 
```
3. Change the number `50` to your desired threshold (0-100)
   - Higher values: Only IPs with higher abuse scores will be blocked
   - Lower values: More IPs will be considered abusive
   - The AbuseIPDB score ranges from 0 (safe) to 100 (malicious)