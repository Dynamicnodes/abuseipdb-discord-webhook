const ipListJson = require("./list.json");

function getIPs() {
  if (!ipListJson || !Array.isArray(ipListJson.ips)) {
    console.error("Invalid or missing ip list.json!");
    return [];
  }

  if (ipListJson.ips.length === 0) {
    console.warn("Warning: ip list is empty!");
    return [];
  }

  return ipListJson.ips;
}

module.exports = getIPs;
