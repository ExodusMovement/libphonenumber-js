import { expect } from 'chai'

import parse, {
	ParseError,
	parsePhoneNumber,
	parsePhoneNumberWithError,
	parsePhoneNumberFromString,

	isValidPhoneNumber,
	isPossiblePhoneNumber,
	validatePhoneNumberLength,

	findNumbers,
	searchNumbers,
	findPhoneNumbersInText,
	searchPhoneNumbersInText,
	PhoneNumberMatcher,

	AsYouType,

	Metadata,
	isSupportedCountry,
	getCountries,
	getCountryCallingCode,
	getExtPrefix,

	getExampleNumber,

	formatIncompletePhoneNumber,
	parseIncompletePhoneNumber,
	parsePhoneNumberCharacter,
	parseDigits,

	parseRFC3966,
	formatRFC3966
} from '../core/index.js'

import Library from '../core/index.js'

import metadata from '../metadata.min.json' with { type: 'json' }
import examples from '../examples.mobile.json' with { type: 'json' }

describe('exports/core', () => {
	it('should export ES6', () => {
		expect(ParseError).to.be.a('function')

		// `parsePhoneNumber()` named export has been renamed to `parsePhoneNumberWithError()`.
		expect(parsePhoneNumber('+12133734253', metadata).nationalNumber).to.equal('2133734253')
		expect(parsePhoneNumberWithError('+12133734253', metadata).nationalNumber).to.equal('2133734253')

		expect(parse('+12133734253', metadata).nationalNumber).to.equal('2133734253')
		expect(parsePhoneNumberFromString('+12133734253', metadata).nationalNumber).to.equal('2133734253')
		expect(parsePhoneNumberFromString('2133734253', metadata)).to.be.undefined

		expect(isValidPhoneNumber('+12133734253', metadata)).to.equal(true)
		expect(isPossiblePhoneNumber('+12133734253', metadata)).to.equal(true)
		expect(validatePhoneNumberLength('+12133734253', metadata)).to.be.undefined

		expect(findNumbers('+12133734253', 'US', metadata)[0].endsAt).to.equal(12)
		expect(searchNumbers('+12133734253', 'US', metadata)[Symbol.iterator]().next).to.be.a('function')
		expect(findPhoneNumbersInText('+12133734253', metadata)[0].number.number).to.equal('+12133734253')
		expect(searchPhoneNumbersInText('+12133734253', metadata)[Symbol.iterator]().next).to.be.a('function')
		expect(new PhoneNumberMatcher('+12133734253', undefined, metadata).find).to.be.a('function')

		expect(new AsYouType('US', metadata).input('+12133734253', metadata)).to.equal('+1 213 373 4253')

		expect(new Metadata(metadata).getCountryCodeForCallingCode('1')).to.equal('US')
		expect(isSupportedCountry('KZ', metadata)).to.equal(true)
		expect(getCountries(metadata).indexOf('KZ') > 0).to.equal(true)
		expect(getCountryCallingCode('KZ', metadata)).to.equal('7')
		expect(getExtPrefix('US', metadata)).to.equal(' ext. ')

		expect(getExampleNumber('RU', examples, metadata).nationalNumber).to.equal('9123456789')

		expect(formatIncompletePhoneNumber('+121337342', metadata)).to.equal('+1 213 373 42')
		expect(parseIncompletePhoneNumber('+1 213 373 42')).to.equal('+121337342')
		expect(parsePhoneNumberCharacter('+')).to.equal('+')
		expect(parseDigits('+123')).to.equal('123')

		expect(parseRFC3966('tel:+12133734253', metadata)).to.deep.equal({ number: '+12133734253' })
		expect(formatRFC3966({ number: '+12133734253' }, metadata)).to.equal('tel:+12133734253')
	})
})