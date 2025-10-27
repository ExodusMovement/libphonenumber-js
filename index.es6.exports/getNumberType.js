import withMetadataArgument from '../max/exports/withMetadataArgument.js'

import _getNumberType from '../es6/legacy/getNumberType.js'

export function getNumberType() {
	return withMetadataArgument(_getNumberType, arguments)
}
