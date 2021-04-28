import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import LayerGroup from 'ol/layer/Group';
import { fromLonLat } from 'ol/proj';
import LayerSwitcher from 'ol-layerswitcher';
import { Tile as TileLayer } from 'ol/layer';
import { Vector as VectorLayer } from 'ol/layer';
import { defaultZoom, defaultCenter } from './_defaults';
import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

/**
 *
 * @param {object} mapParams parameters of the View class constructor in openlayers
 * @returns Map class object
 */
export const getMap = (target = 'map', mapParams) => {
	let options = {
		zoom: defaultZoom,
		center: defaultCenter,
	};
	if (mapParams)
		mapParams.center = mapParams.center
			? fromLonLat(mapParams.center)
			: defaultCenter;

	options = { ...options, ...mapParams };
	let view = new View(options);

	let map = new Map({
		layers: [
			new LayerGroup({
				title: 'Base layers',
				layers: [
					new TileLayer({
						title: 'OSM',
						type: 'base',
						visible: true,
						source: new OSM(),
					}),
				],
			}),
		],
		target: target,
		view: view,
	});

	map.addLayerSwitcher = addLayerSwitcher;
	map.deleteLayerByName = deleteLayerByName;
	map.findLayerByName = findLayerByName;
	map.findLayerGroupByName = findLayerGroup;
	map.deleteLayerGroupByName = deleteLayerGroupByName;
	return map;
};

/**
 * add layerswitcher control to the map
 */
function addLayerSwitcher() {
	if (this) {
		let map = this;
		let layerSwitcher = new LayerSwitcher();
		map.addControl(layerSwitcher);
	}
}

/**
 *
 * @param {string} layerName name of the layer to be deleted
 */
function deleteLayerByName(layerName) {
	let map = this;
	map
		.getLayers()
		.getArray()
		.filter(
			(layer) =>
				(!(layer instanceof LayerGroup) && layer.get('name') === layerName) ||
				layer.get('title') === layerName
		)
		.forEach((layer) => map.removeLayer(layer));
}

/**
 *
 * @param {string} layerGroupName name of the layerGroup to be deleted
 */
function deleteLayerGroupByName(layerGroupName) {
	let map = this;
	map
		.getLayers()
		.getArray()
		.filter(
			(layer) =>
				(layer instanceof LayerGroup && layer.get('name') === layerGroupName) ||
				layer.get('title') === layerGroupName
		)
		.forEach((layer) => map.removeLayer(layer));
}

/**
 *
 * @param {string} layerName name of the layer to be found
 * @returns layer object if found else null
 */
function findLayerByName(layerName) {
	let arrayOfLayers = [];
	arrayOfLayers = this?.getLayers()?.getArray();
	let result = null;

	for (let object of arrayOfLayers) {
		if (
			object instanceof VectorLayer &&
			((object.get('name') && object.get('name') === layerName) ||
				(object.get('title') && object.get('title') === layerName))
		) {
			result = object;
			break;
		} else if (object instanceof LayerGroup) {
			result = findLayerByName.call(object, layerName);
		}
	}
	return result;
}

/**
 *
 * @param {string} layerGroupName name of the layerGroup to be found
 * @returns LayerGroup object if found else null
 */
function findLayerGroup(layerGroupName) {
	let map = this;
	let result = null;
	map.getLayers().forEach((layer) => {
		if (
			layer instanceof LayerGroup &&
			((layer.get('name') !== undefined &&
				layer.get('name') === layerGroupName) ||
				(layer.get('title') !== undefined &&
					layer.get('title') === layerGroupName))
		) {
			result = layer;
		}
	});
	return result;
}
