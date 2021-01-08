module.exports = function () {
	return function (stylus) {
		stylus.define('find-block', function (calls, selector, nested) {
			if (!nested.val) return `^[0]`

			var normalSelector = selector.string.split(' ')
			var normalDeep = normalSelector.length

			var callArr = calls.string.split('-')

			var reIndex = callArr.indexOf('b')
			var orIndex = callArr.length - (reIndex + 1) + normalDeep

			return `^[${orIndex}..${orIndex}]`
		})
	}
}
