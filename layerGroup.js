import LayerGroup from 'ol/layer/Group';

export function getLayerGroup({ layerGroupName, ...rest }) {
	if (!layerGroupName) return new Error('layerGroupName is not defined');
	let layerGroup = new LayerGroup({
		name: layerGroupName,
		...rest,
	});

	layerGroup.addLayer = addLayer;
	layerGroup.removeLayer = removeLayer;
	return layerGroup;
}

function addLayer(layer) {
	if (!layer) return new Error('invalid layer');
	this?.getLayers()?.getArray()?.push(layer);
	return this;
}

function removeLayer(layer) {
	if (this) {
		let index = this?.getLayers()?.getArray()?.indexOf(layer);
		if (index !== -1) this?.getLayers()?.getArray()?.splice(index, 1);
	}
}
