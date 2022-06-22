
module.exports = url => {
  if (/google\./.test(url))
    return 'organic';

  if (/(facebook|twitter|linkedin|instagram|pinterest|)\./)
    return 'social';

  if (!url)
    return 'direct';
}