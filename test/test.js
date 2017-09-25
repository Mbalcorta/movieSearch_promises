const expect = require('chai').expect
const mocha = require('mocha')
const {parseData, printText, movieSearch, parsedata, rp, cheerio} = require('../app/app.js')


describe('Movie search function', function() {
  context('when movie name not entered', function() {

      it('will throw an error', function() {
          expect(movieSearch).to.throw(Error)
      })
    })
context('when movie name entered', function() {
    it('will now throw an error', function() {
      expect(function(){
        movieSearch('findingnemo')
      }).to.not.throw(Error)
    })
  })
})

describe('Parse data function', function() {
  const options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`,
    transform : function(body){
        return cheerio.load(body)
    }
  }

  context('When data is parsed', function() {
      it('will return html without small tags', function() {
        return rp(options)
        .then(
          function($){
            parseData($)
            expect($('small').html()).to.be.an('null')
          }
        )
      })
    })
  context('when movie title passed in', function() {
      it('will return an array', function() {
        return rp(options)
        .then(parseData)
        .then(
          function(arrayOfTitles){
          expect(arrayOfTitles).to.be.an('array')
        })
      })
    })
  context('when movie title passed in', function() {
      it('will return an array containing movie title strings', function() {
        return rp(options)
        .then(parseData)
        .then(
          function(arrayOfTitles){
          expect(arrayOfTitles[0]).to.contain('Finding Nemo')
        })
      })
    })
})

describe('Print text function', function() {
  const options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=findingnemo&s=all`,
    transform : function(body){
        return cheerio.load(body)
    }
  }

  context('When array of strings passed in ', function() {
      it('will not throw an error', function() {
        return rp(options)
        .then(function($){
          return parseData($)
        })
        .then(function(arrayOfStrings){
          console.log(printText)
          expect(function(){
            printText(arrayOfStrings)
          }).to.not.throw('Cannot print Text')
        })
      })
    })

  context('When numbers passed in ', function() {
    it('will throw an error', function() {
        expect(function(){
          printText(123)
        }).to.throw('Error: Cannot print Text')
      })
    })
})