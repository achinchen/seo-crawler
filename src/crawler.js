const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { argv } = require('process');
const argumentURL = argv[2]

async function getHTML(url) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    return body
  } catch (err) {
    console.error(err);
  };
};

function getMetadata($) {
  const title = $('title').text()
  const description = $('meta[name="description"]')
  return { title, description }
}

function getPageHero($) {
  const title = $('h2').text()
  const description = $('h2 ~ p').text()
  return { title, description }
}

async function getSEOContent(html) {
  const $ = cheerio.load(html)
  const metadata = getMetadata($)
  const pageHero = getPageHero($)
  return {
    metadata,
    pageHero
  }
}

async function crawler(url = argumentURL) {
  const html = await getHTML(url)
  const result = await getSEOContent(html)
  return result
}

module.exports = {
  crawler
}