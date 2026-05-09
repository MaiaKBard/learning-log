import * as cheerio from 'cheerio'

const scraperURL = async (URL: string) => {
  try {
    const response = await fetch(URL)
    const html = await response.text()
    const $ = cheerio.load(html)
    const text = $('main').text()
    const title = $('title').text()

    return {text, title}
  } catch (err) {
    console.log(err)
    return { content: '', title: '' }
  }
}

export default scraperURL