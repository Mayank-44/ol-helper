export function validateLayerParams(params) {
	if (!params.layerName) throw new Error('layer name not specified');

	if (typeof params.clusterSource !== 'boolean')
		throw new Error('clusterSource should be a boolean value');

	if (typeof params.clusterDistance !== 'number')
		throw new Error('clusterDistance should be a number');
}
