module.exports = function () {
	return function (stylus) {
		stylus.define('hit-all-special-nest-rule', function (calls, selector, bem) {
			var _globals = stylus.options.globals
			var bemInfo = {}

			if (_globals['$element-separator']) {
				bemInfo = {
					namespace: _globals['$namespace'].val,
					element: _globals['$element-separator'].val,
					modifier: _globals['$modifier-separator'].val,
					state: _globals['$state-prefix'].val
				}
			} else {
				bemInfo = {
					namespace: bem.vals['ns']['nodes'][0]['nodes'][0]['val'],
					element: bem.vals['es']['nodes'][0]['nodes'][0]['val'],
					modifier: bem.vals['ms']['nodes'][0]['nodes'][0]['val'],
					state: bem.vals['sp']['nodes'][0]['nodes'][0]['val']
				}
			}

			var callArr = calls.val.split('-')

			var hasM = callArr.includes('m')
			var hasWhen = callArr.includes('when')
			var hasPseudo = callArr.includes('pseudo')
			var hasPre = callArr.includes('pre')

			var hitCalls = hasM || hasWhen || hasPseudo || hasPre

			var normalSelector = selector.val

			var hitSelector =
				normalSelector.includes(bemInfo.modifier) ||
				normalSelector.includes('.' + bemInfo.state) ||
				normalSelector.includes(':') ||
				normalSelector.includes('.')

			return hitCalls || hitSelector
		})
	}
}
