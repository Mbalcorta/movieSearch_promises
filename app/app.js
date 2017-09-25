const rp = require('request-promise');

const cheerio = require('cheerio'); // Basically jQuery for node.js

const movieTitle = process.argv[2]

const options = {
  uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${movieTitle}&s=all`,
  transform : function(body){
      return cheerio.load(body)
  }
}

const movieSearch = (movieTitle) => {
  if(movieTitle) {
  rp(options)
    .then(($) => {
      return parseData($)
    })
    .then((textArray) => {
      return printText(textArray)
    })
    .catch((err) => {
      throw new Error(err)
    });
  } else {
    throw new Error('Error: must enter movie title')
  }
}

if(!module.parent){
  try {
    movieSearch(movieTitle)
  } catch(e){
    console.log(`${e.message}`)
  }
}

const parseData = ($) => {
  $('small').remove()
  const textArray =
    $('.findList')
    .first()
    .find('.result_text')
    .map((i, element)=>{
      return $(element).text()
    }).toArray()
  return textArray;
}

const printText = (textArray) => {
  try{
    textArray.forEach((eachMovieTitle) => {
      if(!module.parent){
         console.log(eachMovieTitle)
      }
    })
  } catch(e){
    throw new Error('Error: Cannot print Text')
  }

}

module.exports = {options, parseData, printText, movieSearch, parseData, rp, cheerio}
