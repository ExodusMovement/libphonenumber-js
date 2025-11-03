import isViablePhoneNumber from './isViablePhoneNumber.js'

// https://www.ietf.org/rfc/rfc3966.txt

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */
export function parseRFC3966(text) {
	let number
	let ext

	// Replace "tel:" with "tel=" for parsing convenience.
	text = text.replace(/^tel:/, 'tel=')

	for (const part of text.split(';')) {
		const [name, value] = part.split('=')
		switch (name) {
			case 'tel':
				number = value
				break
			case 'ext':
				ext = value
				break
			case 'phone-context':
				// Only "country contexts" are supported.
				// "Domain contexts" are ignored.
				if (value[0] === '+') {
					number = value + number
				}
				break
		}
	}

	// If the phone number is not viable, then abort.
	if (!isViablePhoneNumber(number)) {
		return {}
	}

	const result = { number }
	if (ext) {
		result.ext = ext
	}
	return result
}

/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */
export function formatRFC3966({ number, ext }) {
	if (!number) {
		return ''
	}
	if (number[0] !== '+') {
		throw new Error(`"formatRFC3966()" expects "number" to be in E.164 format.`)
	}

	let uri = "tel:" + number;
	if (ext != null && ext !== "") {
		// Allow digits and DTMF characters only. Adjust if you need A-D.
		if (!/^[0-9A-D*#]+$/.test(ext)) {
			throw new Error("Invalid ext. Use digits or *, #, optionally A-D.");
		}
		// Encode anyway to be robust against future changes.
		uri += ";ext=" + encodeURIComponent(ext);
	}

	return uri
}