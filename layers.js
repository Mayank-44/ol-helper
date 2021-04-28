import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, Cluster } from 'ol/source';
import { getFeatureArray } from './features';
import GeoJSON from 'ol/format/GeoJSON';
import { validateLayerParams } from './validator/validateLayerParams';

/**
 *
 * @param {object} {
 * 	layerName (any): name of the layer (mandatory)
 *
 * 	featureArray ([{}]): array of objects, where each object contains `coordinates` key with value [long, lat]
 * 					and `metaData` key whose value can be of type `any`
 * 					example [{coordinates: [long, lat], metaData: "coordinates information"}]
 *
 * 	clusterSource (boolean): True if you want to get clusters of features based on clusterDistance
 *
 * 	clusterDistance (number): Minimum distance in pixels between clusters.
 *
 * 	style (style object): style to be applied to the layer.
 *
 * 	...layerProperties: all other properties passed in VectorLayer constructor
 * }
 * @returns Vector class object
 */
export function getLayer({
	layerName,
	featureArray = null,
	clusterSource = false,
	clusterDistance = 10,
	style = null,
	...layerProperties
}) {
	validateLayerParams({ layerName, clusterSource, clusterDistance });
	let features = featureArray ? getFeatureArray(featureArray) : [];
	if (!Array.isArray(features)) return features;
	let source = new VectorSource({
		features: features,
	});

	if (clusterSource) {
		source = new Cluster({
			distance: clusterDistance,
			source: source,
		});
	}

	let layer = new VectorLayer({
		source: source,
		name: layerName,
		...layerProperties,
	});
	layer.setStyle(style);
	layer.addFeature = addFeature;
	layer.addFeatures = addFeatures;
	layer.removeAllFeatures = removeAllFeatures;
	return layer;
}

/**
 *
 * @param {string} layerName name of the layer
 * @param {GeoJSON} geoJSONData geoJSON data
 * @returns Layer class object
 */
export function getGeoJSONLayer(layerName, geoJSONData) {
	if (!layerName) throw new Error('layer name not specified');
	let geojson = new GeoJSON();
	let geojosnobject = geojson.readFeatures(geoJSONData, {
		dataProjection: 'EPSG:4326',
		featureProjection: 'EPSG:3857',
	});
	let layerSource = new VectorSource({});
	layerSource.addFeatures(geojosnobject);
	var layer = new VectorLayer({
		source: layerSource,
		name: layerName,
	});

	layer.addFeature = addFeature;
	layer.addFeatures = addFeatures;
	layer.removeAllFeatures = removeAllFeatures;

	return layer;
}

/**
 *
 * @param {object} feature
 * @returns `this` reference
 */
function addFeature(feature) {
	this?.getSource()?.addFeature(feature);
	return this;
}

/**
 *
 * @param {array} featureArray
 * 		featureArray ([{}]): array of objects, where each object contains `coordinates` key with value [long, lat]
 * 					and `metaData` key whose value can be of type `any`
 * 					example [{coordinates: [long, lat], metaData: "coordinates information"}]
 * @returns `this` reference
 */
function addFeatures(featureArray) {
	this?.getSource()?.addFeatures(featureArray);
	return this;
}

/**
 *
 * @returns `this` reference
 */
function removeAllFeatures() {
	this?.getSource().clear();
	return this;
}
