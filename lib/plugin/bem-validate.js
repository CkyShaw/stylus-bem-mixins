module.exports = function () {
	return function (stylus) {
		stylus.define('bem-validate', function (calls, selector, type) {
			var NestingRules = {
				e: ['b', 'b > m', 'b > when'],
				m: ['b', 'b > e', 'b > when > e'],
				when: ['b', 'b > e', 'b > m > e']
			}

			var NestingRulesInfo = {
				e: ['b > "e"', 'b > m > "e"', 'b > when > "e"'],
				m: ['b > "m"', 'b > e > "m"', 'b > when > e > "m"'],
				when: ['b > "when"', 'b > e > "when"', 'b > m > e > "when"']
			}

			var NameMap = {
				b: 'Block',
				e: 'Element',
				m: 'Modifier',
				when: 'When'
			}

			var fn = type.val

			if (fn == 'b') {
				if (String(calls) != 'null' || String(selector.val) !== '&') {
					throw new Error(
						`\x1b[91m Nesting Error: "${fn}" block mixins should be the outermost layer. \x1b[0m`
					)
				}
			} else {
				if (String(calls) == 'null') {
					throw new Error(
						`\x1b[91m Nesting Error: "${fn}" block mixins should be in "b" block mixins. \x1b[0m`
					)
				}

				var callArr = calls.val.split('-')
				var callNested = callArr.reverse().join(' > ')

				if (!NestingRules[fn].includes(callNested)) {
					throw new Error(
						`\x1b[91m Nesting Error: "${fn}" block mixins, nesting rules: ${NestingRulesInfo[fn].join(
							'，'
						)}. \x1b[0m`
					)
				}
			}
		})
	}
}
