const config = require('./config')
const _ = require('./helpers')

/**
 * Question Schema
 *
 * Prefixes factor slugs with question dir
 */
class QuestionSchema {
	constructor () {
		return this
	}

	normalize (attrs) {
		// console.log('normalize()')
		// console.log(result)
		let result = { ...attrs }
		result = this.#expandFactorPaths(result)
		result = this.#removeExtension(result)
		result.inputName = this.#extractInputName(attrs.path)
		return result
	}

	extractInputName (attrs) {
		return this.#extractInputName(attrs.path)
	}

	#expandFactorPaths (attrs) {
		// console.log('#expandFactorPaths()')
		// console.log(attrs)
		const copy = { ...attrs }
		for (const f of copy.factors) {
			f.path = copy.dir + '/factors/' + f.slug
			delete f.slug
		}

		return copy
	}

	#extractInputName (questionPath) {
		return questionPath.replace(config.contentDir, '').split('/').join('-')
	}

	#removeExtension (attrs) {
		if (_.hasProp(attrs, 'extension')) {
			const copy = { ...attrs }
			delete copy.extension
			return copy
		} else {
			return attrs
		}
	}
}

const schema = new QuestionSchema()
module.exports = schema
