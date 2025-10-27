import withMetadataArgument from '../max/exports/withMetadataArgument.js'

import { searchPhoneNumbers as _searchPhoneNumbers } from '../es6/legacy/findPhoneNumbers.js'

export function searchPhoneNumbers() {
	return withMetadataArgument(_searchPhoneNumbers, arguments)
}
