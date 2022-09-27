const { crawler } =  require('./crawler')
const fs = require('fs/promises');
const targets = require('./target.json')
const converter = require('json-2-csv');


async function crawlTargets() {
  const rawResult = await Promise.all(targets.map(crawler))
  const result = rawResult.map(({pageHero, metadata}, index) => ({
    url: targets[index],
    'metadata.title': metadata.title,
    'metadata.description': metadata.description,
    'pageHero.title': pageHero.title,
    'pageHero.description': pageHero.description
  }))
  const csvResult = await converter.json2csvAsync(result);
  await fs.writeFile('result.csv', csvResult, 'utf8');
  return result
}

crawlTargets()
