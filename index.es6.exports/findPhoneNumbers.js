import withMetadataArgument from '../max/exports/withMetadataArgument.js'

import _findPhoneNumbers from '../es6/legacy/findPhoneNumbers.js'

export function findPhoneNumbers() {
	return withMetadataArgument(_findPhoneNumbers, arguments)
}
