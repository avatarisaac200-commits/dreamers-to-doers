const base = require("./covener-impact-footprints");

module.exports = async function handler(req, res) {
  return base(req, res);
};

module.exports.handleNodeRequest = base.handleNodeRequest;
module.exports.readCovenerImpactFootprints = base.readCovenerImpactFootprints;
