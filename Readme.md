# ol-helper

`ol-helper` is a lightweight and easy to use featured-package library for creating interactive maps on web using [OpenLayers](https://openlayers.org/) with faster pace.

## Getting Started

```
npm install ol-helper
```

## How to use

Import just what you need for your application:

```js
import { getMap } from 'ol-helper/map';

this.map = getMap('map');

<div id='map' />;
```

above lines will render the map with [OSM](https://www.openstreetmap.org/) base tiles to the html markup with id `map`
by default, center is at long/lat [0,0] and zoom level is set to 1.

params:
`getMap` method takes two arguments, first if the target to which the map will render and second an object as parameter with properties of [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html) constructor.
**example**

```js
this.map = getMap(target='map',{
    center: [80,-34],
    zoom: 5,
    padding: [15,15,15,15],
    ...
})
```

**Note**: `getMap` method returns the Map object with some additional helper methods attached to it at the run-time.

- addLayerSwitcher
- deleteLayerByName
- deleteLayerGroupByName
- findLayerByName
- findLayerGroupByName

### Helper functions available to the `map` object

> **addLayerSwitcher**

this method will add the [`LayerSwitcher`](https://www.npmjs.com/package/ol-layerswitcher) on the map, which can be used to make layer visible/invisible by simply toggling the checkboxes along the the layer names.

```
    this.map.addLayerSwitcher();
```

**Note**: To see the layer on the LayerSwitcher dialogue box, it is mandatory to add the **_title_** property to the Layer or LayerGroup.

> **deleteLayerByName**

this method will delete a [VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html) from the map with given layer name as a parameter.

```
    this.map.deleteLayerByName('Vector_layer');
```

params:
method takes one argument that is the name of the layer to be deleted.

> **deleteLayerGroupByName**

this method will delete a [LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) from the map with given layerGroup name as a parameter.

```
    this.map.deleteLayerGroupByName('Layer_group');
```

params:
method takes one argument that is the name of the LayerGroup to be deleted.

> **findLayerByName**

this method will find a [VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html) from the map with given layer name as a parameter.

```
    this.map.findLayerByName('Vector_layer');
```

params:
method takes one argument that is the name of the layer to be found.

returns:
[VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html) object if found or `null`
**Note**: It does not matter if the layer is nested inside some LayerGroup, method will recursively search for the layer.

> **findLayerGroupByName**

this method will find a [LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) from the map with given LayerGroup name as a parameter.

```
    this.map.findLayerGroupByName('Vector_group');
```

params:
method takes one argument that is the name of the LayerGroup to be found.

returns:
[LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) object if found or `null`

## Add layer to the map

You can add a VectorLayer to a map by simply calling the `getLayer` fuction .

```js
import { getLayer } from 'ol-helper/layers';
import { getMap } from 'ol-helper/map';

this.map = getMap('map');
let layer = getLayer({
	layerName: 'Vector layer',
});
this.map.addLayer(layer);
```

above sample code snippet wil render the default map and will add an empty vector layer with property `name = layerName` to the map,
where, _layerName_ is a `mandatory` parameter or else it will throw an error.

params:
object with following keys
| Key | mandatory | Type | Value |
| ------ | ------ | ------ | ------ |
| layerName | Yes | string | name of the layer |
| featureArray | No |array | array of objects, where each object contains `coordinates` (mandatory) key with value [long, lat] and `metaData` key whose value can be of type `any` example [{coordinates: [long, lat], metaData: "coordinates information"}]|
| clusterSource | No | boolean | true/false, depends whether you want layer with clustering or not |
| clusterDistance | No | number | Minimum distance in pixels between clusters. |
| style | No |[Style](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html) object | given Style will be applied to the layer if passed as a parameter |

**Note**: All other [VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html) properties can be passed as parameters which will be applied to the layer.

_layer_ object returned by the **getLayer** function have all the default properties and methods present in [VectorLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html), but several other methods are also added :-

- addFeature
- addFeatures
- removeAllFeatures

**all these helper functions returns the same layer object, so you can chain these helper functions one-after-other.**

### Helper functions available to the `layer` object

> **addFeature**

this method will add the given feature to the current layer.

```js
import { getLayer } from 'ol-helper/layers';
import { getMap } from 'ol-helper/map';
import { getPoint } from 'ol-helper/features';

this.map = getMap('map');
let layer = getLayer({
	layerName: 'Vector layer',
});
let feature = getPoint({ coordinates: [-57, 30] });
layer.addFeature(feature);
this.map.addLayer();
```

param:
[Feature](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) object

> **addFeatures**

this method will add multiple Features to the current layer.

```js
import { getMap } from 'ol-helper/map';
import { getLayer } from 'ol-helper/layers';
import { getFeatureArray } from 'ol-helper/features';

this.map = getMap('map');
let layer = getLayer({
	layerName: 'Vector layer',
});
let featureData = [{ coordinates: [-57, 30] }, { coordinates: [-10, 90] }];
let featureArray = getFeatureArray(featureData);
layer.addFeatures(featureArray);
this.map.addLayer();
```

param:
array of [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)

> **removeAllFeatures**

this method will remove all the [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) from the current layer.

```js
layer.removeAllFeatures();
```

### Add [LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) to the `map`

```js
import { getMap } from 'ol-helper/map';
import { getLayer } from 'ol-helper/layers';
import { getLayerGroup } from 'ol-helper/layerGroup';

this.map = getMap('map');
let newLayerGroup = getLayerGroup({ layerGroupName: 'Test group' }); // get LayerGroup with name 'Test group'
newLayerGroup.setProperties({ title: 'Test group' }); // will show LayerGroup on LayerSwitcher dialogue box
let layer = getLayer({
	layerName: 'Vector layer',
});
newLayerGroup.addLayer(layer); // add layer to LayerGroup
this.map.addLayer(newLayerGroup); // add LayerGroup to the map
newLayerGroup.removeLayer(layer); // remove layer from LayerGroup
```

methods added to the LayerGroup at the run-time

> **addLayer**

will add the layer to the LayerGroup

```js
layerGroup.addLayer(layer);
```

> **removeLayer**

will remove the layer from the LayerGroup

```js
layerGroup.removeLayer(layer);
```

**Note**: to see the [LayerGroup](https://openlayers.org/en/latest/apidoc/module-ol_layer_Group-LayerGroup.html) on the [LayerSwitcher](https://www.npmjs.com/package/ol-layerswitcher) dialogue box add _title_ property to the LayerGroup.

### Helper functions to get basic [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)

here are some helper functions which can be used to get Feature objects from your _geospatial_ data

- getLineString
- getCircle
- getPoint
- getPolygon
- getGeoJSONPolygon
- getFeatureArray

> **getLineString**

Above method will return a new [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) whose geometry is [LineString](https://openlayers.org/en/latest/apidoc/module-ol_geom_LineString-LineString.html)
params:
method accepts an object with two keys `pointA` and `pointB` and values are array of longitude and latitude.

```js
    import { getLineString } from 'ol-helper/features';

    let pointA = [-34,80]; // [long,lat]
    let pointB = [-19,10]; // [long,lat]
    let lineStringFeature = getLineString({pointA, pointB});
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeature(lineStringFeature);
```

> **getCircle**

Above method will return a new [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) whose geometry is [Circle](https://openlayers.org/en/latest/apidoc/module-ol_geom_Circle-Circle.html)
params:
method accepts an object with three keys `coordinates`, `radius` and `metaData`.

```js
    import { getCircle } from 'ol-helper/features';

    let options = {
        coordinates: [-12,50]; // [long,lat]
        radius: 500;
        metaData: "information related to the coordinates"
    }
    let circleFeature = getCircle(options);
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeature(circleFeature);
```

> **getPoint**

Above method will return a new [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) whose geometry is [Point](https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html)
params:
method accepts an object with two keys `coordinates`and `metaData`.

```js
    import { getPoint } from 'ol-helper/features';

    let options = {
        coordinates: [-12,50]; // [long,lat]
        metaData: "information related to the coordinates"
    }
    let pointFeature = getPoint(options);
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeature(pointFeature);
```

> **getPolygon**

Above method will return an array of [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) where geometry of each feature is [LineString](https://openlayers.org/en/latest/apidoc/module-ol_geom_LineString-LineString.html)
params:
method accepts an array of coordinates.

```js
    import { getPolygon } from 'ol-helper/features';

    let param = [[-12,50], [-42,14], [-90, 78], [-12,50]];
    let polygonFeature = getPolygon(param);
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeature(polygonFeature);
```

> **getGeoJSONPolygon**

Above method will return a [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) where geometry is [MultiPolygon](https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiPolygon-MultiPolygon.html)
params:
method accepts an array of coordinates.

```js
    import { getPolygon } from 'ol-helper/features';
    import { getLineStyle } from 'ol-helper/styles'

    let param = [[-12,50], [-42,14], [-90, 78], [-12,50]];
    let polygonFeature = getPolygon(param);
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeature(polygonFeature).setStyle(getLineStyle());
```

> **getFeatureArray**

Above method will return an array of [Features](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html) where geometry is [Point](https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html)
params:
method accepts an array of objects, where each object should contain key `coordinates` and its value is long-lat pair [long,lat] and second key is optional `metaData` which will contain the information regarding the `coordinates`.

```js
    import { getFeatureArray } from 'ol-helper/features';
    import { getPointStyle } from 'ol-helper/styles'

    let featureArray = [
        {coordinates: [-90,78], metaData: "coordinates information"},
        {coordinates: [-10,08], metaData: "coordinates information"},
        {coordinates: [10,88], metaData: "coordinates information"},
    ];
    let features = getFeatureArray(featureArray);
    .
    . //code to get new layer or find existing layer
    .
    layer.addFeatures(features).setStyle(getPointStyle());
```

### Helper functions to get basic [Styles](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html)

here are some helper functions which can be used to get Styles for your geospatial data.

- getLineStyle
- getStarStyle
- getPointStyle
- getIconStyle
- getClusterStyle
- getCircleStyle

**Note**: params are not mandatory for above helper methods, all these Styles methods have default styles applied to them.

> **getLineStyle**

```js
import { getLineStyle } from 'ol-helper/styles';

// code to layer and add features to it
layer.setStyle(getLineStyle());
```

params:
an object with three properties
`strokeColor`: color of the strokes
`fillColor`: color which will be filled between strokes
`width`: width of the strokes

```js
import { getLineStyle } from 'ol-helper/styles';

.
.   // code to layer and add features to it
.
let options = {
    strokeColor: 'rgba(195, 0, 46,0.55)',
	fillColor: 'rgba(255, 255, 255, 0.55)',
	width: 1,
}
layer.setStyle(getLineStyle(options));
```

> **getStarStyle**

```js
import { getStarStyle } from 'ol-helper/styles';

// code to layer and add features to it
layer.setStyle(getStarStyle());
```

params:
an object with three properties
`strokeColor`: color of the strokes
`fillColor`: color which will be filled between strokes
`width`: width of the strokes

```js
import { getStarStyle } from 'ol-helper/styles';

.
.   // code to layer and add features to it
.
let options = {
    strokeColor: 'rgba(195, 0, 46,0.55)',
	fillColor: 'rgba(255, 255, 255, 0.55)',
	width: 1,
}
layer.setStyle(getStarStyle(options));
```

> **getPointStyle**

```js
import { getPointStyle } from 'ol-helper/styles';

// code to layer and add features to it
layer.setStyle(getPointStyle());
```

params:
an object with four properties
`strokeColor`: color of the strokes
`fillColor`: color which will be filled between strokes
`width`: width of the strokes,
`radius`: radius of the point

```js
import { getPointStyle } from 'ol-helper/styles';

.
.   // code to layer and add features to it
.
let options = {
    strokeColor: 'rgba(195, 0, 46,0.55)',
	fillColor: 'rgba(255, 255, 255, 0.55)',
	width: 1,
	radius: 6
}
layer.setStyle(getPointStyle(options));
```

> **getIconStyle**

```js
import { getIconStyle } from 'ol-helper/styles';

// code to layer and add features to it
layer.setStyle(getIconStyle());
```

params:
any/all properties of [Icon](https://openlayers.org/en/latest/apidoc/module-ol_style_Icon-Icon.html) class constructor

```js
import { getIconStyle } from 'ol-helper/styles';

.
.   // code to layer and add features to it
.
let options = {
    anchor: [0.5, 0.9],
	anchorXUnits: 'fraction',
	anchorYUnits: 'fraction',
	src: "./image.png",
	scale: 0.4,
}
layer.setStyle(getIconStyle(options));
```

> **getClusterStyle**

```js
import { getMap } from 'ol-helper/map';
import { getClusterStyle, getIconStyle } from 'ol-helper/styles';
import { getLayer } from 'ol-helper/layers';

let map = getMap('map');
let clusterArrayData = [
	{ coordinates: [-57, 30], metaData: { id: 256 } },
	{ coordinates: [-57, 35], metaData: { id: 256 } },
	{ coordinates: [-57.1224, 37], metaData: { id: 256 } },
	{ coordinates: [-57.1224, 47], metaData: { id: 256 } },
	{ coordinates: [-57, 31], metaData: { id: 256 } },
];
let clusterLayer = getLayer({
	layerName: 'Cluster layer',
	title: 'Cluster layer',
	featureArray: clusterArrayData,
	clusterSource: true,
	clusterDistance: 10,
});
clusterLayer.setStyle(function (features) {
	let featureCount = features.get('features').length;
	if (featureCount > 1) return getClusterStyle({ count: featureCount });
	return getIconStyle();
});
map.addLayer(clusterLayer);
```

**params:**
an object with five properties
`strokeColor`: color of the strokes
`fillColor`: color which will be filled between strokes
`width`: width of the strokes,
`radius`: radius of the point,
`count`: number of features overlapping

> **getCircleStyle**

```js
import { getCircleStyle } from 'ol-helper/styles';

// code to layer and add features to it
layer.setStyle(getCircleStyle());
```

params:
an object with three properties
`strokeColor`: color of the strokes
`fillColor`: color which will be filled between strokes
`width`: width of the strokes

```js
import { getCircleStyle } from 'ol-helper/styles';

let circleLayer = getLayer({ layerName: 'circle', title: 'circle' });
circleLayer.addFeature(getCircle({ coordinates: [-83, 12], radius: 500000 }));
let options = {
	strokeColor: 'rgba(195, 0, 46,0.55)',
	fillColor: 'rgba(255, 255, 255, 0.55)',
	width: 1,
};
circleLayer.setStyle(getCircleStyle(options));
map.addLayer(circleLayer);
```
