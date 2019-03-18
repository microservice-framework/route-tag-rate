'use strict'

const debug = {
  log: require('debug')('tag-rate:log'),
  debug: require('debug')('tag-rate:debug')
};


module.exports = {
  name: 'rate',
  type: 'request',
  handler: function(taggedTargets, config, allTargets, targetRequest){
    debug.debug('processing rate %O', config)
    if (!config || !config.rate) {
      debug.debug('skip. miss configured. No rate %O', config)
      return
    }
    let rate = config.rate
    if (typeof rate == "string") {
      rate = parseFloat(rate)
    }
    let voteSize = 1000
    if (config && config.voteSize) {
      voteSize = config.voteSize
    }
    let totalRequestsCount = 0
    for (let i in allTargets) {
      if (allTargets[i].stats && allTargets[i].stats.hit) {
        totalRequestsCount += allTargets[i].stats.hit
      }
    }
    debug.debug('totalRequestsCount %d', totalRequestsCount)
    for (let i in taggedTargets) {
      if (taggedTargets[i].stats && taggedTargets[i].stats.hit) {
        let targetRate = taggedTargets[i].stats.hit * 100 / totalRequestsCount
        if (targetRate < rate) {
          taggedTargets[i].vote += voteSize
          debug.debug('Applied vote:%d (total: %d) to %O',voteSize, taggedTargets[i].vote,
          taggedTargets[i])
        }
      }
    }
  }
}
