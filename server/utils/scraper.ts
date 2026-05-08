import * as cheerio from 'cheerio'

const scraperURL = async (URL: string) => {
  try {
    const response = await fetch(URL)
    const html = await response.text()
    const $ = cheerio.load(html)
    const content = $('main').text()

    return content
  } catch (err) {
    console.log(err)
  }
}

export default scraperURL