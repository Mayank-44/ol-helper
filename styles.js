import {
	Style,
	Stroke,
	Fill,
	Circle,
	Icon,
	Text,
	RegularShape,
} from 'ol/style';
import marker from './icons/marker.png';

/**
 *
 * @param {object} options
 * 			strokeColor: color of the strokes
 * 			fillColor: fill color between strokes
 * 			width: width of the stroke
 * @returns Style class object
 */
export const getLineStyle = (options) => {
	let defaults = {
		strokeColor: 'rgba(195, 0, 46,0.55)',
		fillColor: 'rgba(255, 255, 255, 0.55)',
		width: 1,
	};
	if (options) defaults = { ...defaults, ...options };
	return new Style({
		stroke: new Stroke({
			color: defaults.strokeColor,
			width: defaults.width,
		}),
		fill: new Fill({
			color: defaults.fillColor,
		}),
	});
};

/**
 *
 * @param {object} options
 * 			strokeColor: color of the strokes
 * 			fillColor: fill color between strokes
 * 			width: width of the stroke
 * @returns Style class object
 */
export const getStarStyle = (options) => {
	let defaults = {
		strokeColor: 'rgba(255, 255, 255,0.55)',
		fillColor: 'rgba(0,0,255,1.0)',
		width: 1,
	};
	if (options) defaults = { ...defaults, ...options };
	return new Style({
		image: new RegularShape({
			radius: 10.0,
			points: 5,
			radius2: 5.0,
			stroke: new Stroke({
				color: defaults.strokeColor,
				width: defaults.width,
			}),
			fill: new Fill({
				color: defaults.fillColor,
			}),
		}),
	});
};

/**
 *
 * @param {object} options
 * 			strokeColor: color of the strokes
 * 			fillColor: fill color between strokes
 * 			width: width of the stroke
 * 			radius: radius of the point circle
 * @returns Style class object
 */
export const getPointStyle = (options) => {
	let defaults = {
		strokeColor: 'rgba(0,0,0,1.0)',
		fillColor: 'rgba(0,0,255,1.0)',
		radius: 6,
		width: 0,
	};
	if (options) defaults = { ...defaults, ...options };
	return new Style({
		image: new Circle({
			radius: defaults.radius,
			stroke: new Stroke({
				color: defaults.strokeColor,
				width: defaults.width,
			}),
			fill: new Fill({
				color: defaults.fillColor,
			}),
		}),
	});
};

/**
 *
 * @param {object} options parameters of the Icon class constructor in openlayers
 * @returns Style class object
 */
export const getIconStyle = (options) => {
	return new Style({
		image: new Icon({
			anchor: [0.5, 0.9],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: marker,
			scale: 0.4,
			...options,
		}),
	});
};

/**
 *
 * @param {object} options
 * 			strokeColor: color of the strokes
 * 			fillColor: fill color between strokes
 * 			width: width of the stroke
 * 			radius: radius of the point circle
 * 			count: number of features overlapping
 * @returns Style class object
 */
export const getClusterStyle = (options) => {
	let defaults = {
		strokeColor: 'rgba(255,255,255,1.0)',
		fillColor: '#3399cc',
		radius: 6.0,
		width: 0,
		count: '',
	};
	if (options) defaults = { ...defaults, ...options };
	return new Style({
		image: new Circle({
			radius: 10,
			stroke: new Stroke({
				color: defaults.strokeColor,
			}),
			fill: new Fill({
				color: defaults.fillColor,
			}),
		}),
		text: new Text({
			text: defaults.count.toString(),
			fill: new Fill({
				color: '#fff',
			}),
		}),
	});
};

/**
 *
 * @param {object} options
 * 			strokeColor: color of the strokes
 * 			fillColor: fill color between strokes
 * 			width: width of the stroke
 * @returns Style class object
 */
export const getCircleStyle = (options) => {
	let defaults = {
		strokeColor: 'rgba(255, 0, 0, 0.5)',
		fillColor: 'rgba(255, 255, 255, 0.55)',
		width: 0,
	};
	if (options) defaults = { ...defaults, ...options };
	return new Style({
		stroke: new Stroke({
			color: defaults.strokeColor,
			width: defaults.width,
		}),
		fill: new Fill({
			color: defaults.fillColor,
		}),
	});
};
