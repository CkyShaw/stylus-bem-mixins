'use strict'

const { series, src, dest } = require('gulp')
const stylus = require('gulp-stylus')
const stylusBemMixins = require('../lib/index.js')({
	namespace: 'my'
})

function compileTest() {
	return src('./test.styl')
		.pipe(stylus({ use: stylusBemMixins }))
		.pipe(dest('./'))
}
function compileRule() {
	return src('./rule.styl')
		.pipe(stylus({ use: stylusBemMixins }))
		.pipe(dest('./'))
}

exports.build = series(compileTest)
