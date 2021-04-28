import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import LineString from 'ol/geom/LineString';

/**
 *
 * @param {object} param
 * 	example {
 * 	pointA: [long,lat],
 * 	pointB: [long,lat],
 * }
 * @returns Feature class object
 */
export function getLineString({ pointA, pointB }) {
	pointA = fromLonLat(pointA);
	pointB = fromLonLat(pointB);
	return new Feature({
		geometry: new LineString([pointA, pointB]),
	});
}

/**
 *
 * @param {object} param
 * 	example {
 * 	coordinates: [long,lat],
 * 	radius: 1,
 * 	metaData: `any`
 * }
 *  here, metaData is an optional parameter which can hold information regarding the coordinate
 * @returns Feature class object
 */
export function getCircle({ coordinates, radius = 1, metaData }) {
	let circle = new Circle(fromLonLat(coordinates), radius);
	return new Feature({
		geometry: circle,
		metaData: metaData,
	});
}

/**
 *
 * @param {object} param
 * example {
 * 	coordinates: [long,lat],
 * 	metaData: `any`
 * }
 *  here, metaData is an optional parameter which can hold information regarding the coordinate
 * @returns Feature class object
 */
export function getPoint({ coordinates, metaData }) {
	return new Feature({
		geometry: new Point(fromLonLat(coordinates)),
		metaData: metaData,
	});
}

/**
 *
 * @param {array} pointList array containing array of coordinates
 * example: [[long,lat], [long, lat],...]
 * @returns array of features
 */
export function getPolygon(pointList) {
	let isFirstPoint = true;
	let pointA = null;
	let pointB = null;
	let featureList = [];
	pointList.forEach((point) => {
		if (isFirstPoint) {
			pointA = point;
			isFirstPoint = false;
		} else {
			pointB = point;
			let line = getLineString({ pointA, pointB });
			featureList.push(line);
			pointA = pointB;
		}
	});
	return featureList;
}

/**
 *
 * @param {GeoJSON} geoJSON
 * @returns GeoJSON class object
 */
export function getGeoJSONPolygon(geoJSON) {
	var geojson = new GeoJSON();
	var geojosnobject = geojson.readFeatures(geoJSON, {
		dataProjection: 'EPSG:4326',
		featureProjection: 'EPSG:3857',
	});
	return geojosnobject;
}

/**
 *
 * @param {array} featureArray
 * featureArray [{}]: array of objects, where each object contains `coordinates` key with value [long, lat]
 * 						and `metaData` key whose value can be of type `any`
 * 						example [{coordinates: [long, lat], metaData: "coordinates information"}]
 *
 * @returns array of features
 */
export const getFeatureArray = (featureArray) => {
	let feature = [];
	if (featureArray) {
		feature = getFeatureArrayFromArray(featureArray);
	}
	return feature;
};

/**
 *
 * @param {array} featureArray array of objects, where each object contains `coordinates` key with value [long, lat]
 * 						and `metaData` key whose value can be of type `any`
 * @returns array of features
 */
function getFeatureArrayFromArray(featureArray) {
	let featureCount = featureArray.length;
	let features = new Array(featureCount);

	for (let index = 0; index < featureCount; ++index) {
		let objectKeys = Object.keys(featureArray[index]);
		if (
			!objectKeys.includes('coordinates') ||
			(typeof featureArray[index]['coordinates'][0] !== 'number' &&
				typeof featureArray[index]['coordinates'][0] !== 'number')
		)
			throw new Error('invalid featureArray');
		let coordinates = featureArray[index].coordinates;
		features[index] = getPoint({
			coordinates,
			metaData: featureArray[index].metaData,
		});
	}

	return features;
}
