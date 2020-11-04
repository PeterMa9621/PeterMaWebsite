<template>
    <div class="w-100" style="height: 800px">
        This is open layer map
        <div id="map"></div>
        <b-button @click="changeMode">Change</b-button>
    </div>
</template>

<script>
    import 'ol/ol.css';
    import {Map} from 'ol';
    import {View} from 'ol';
    import {fromLonLat} from 'ol/proj';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import VectorLayer from "ol/layer/Vector";
    import VectorSource from "ol/source/Vector";
    import Draw from "ol/interaction/Draw";
    import Style from "ol/style/Style";
    import Fill from "ol/style/Fill";
    import Stroke from "ol/style/Stroke";
    import CircleStyle from "ol/style/Circle";
    import Feature from "ol/Feature";
    import Point from "ol/geom/Point";
    import { v4 as uuidv4 } from 'uuid';
    export default {
        name: "index",
        props: [],
        data() {
            return {
                isEditing: false,
                map: {},
                vectorSource: null,
                draw: null,
                markers: {}
            }
        },
        mounted() {
            this.initMap();
            this.initCurrentLocation();
        },
        methods: {
            initMap() {
                this.vectorSource = new VectorSource({wrapX: false});
                this.map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        }),
                        new VectorLayer({
                            source: this.vectorSource,
                            style: new Style({
                                image: new CircleStyle({
                                    radius: 10,
                                    fill: new Fill({
                                        color: '#1f1bff',
                                    }),
                                }),
                            })
                        }),
                    ],
                    view: new View({
                        center: [-110, 50],
                        zoom: 16
                    })
                });

                this.map.on('singleclick', (e) => {
                    if (this.map.hasFeatureAtPixel(e.pixel) === true) {
                        this.map.getFeaturesAtPixel(e.pixel).forEach(feature => {
                            alert(feature.markerId);
                            this.vectorSource.removeFeature(feature);
                        });
                    } else {
                        let marker = new Feature(new Point(e.coordinate));
                        let id = uuidv4();
                        marker.markerId = id;
                        this.markers[id] = marker;
                        this.vectorSource.addFeature(marker);
                    }
                    console.log(e);
                });
                if(!this.isEditing) {
                    //this.initMapInteraction('Point');
                }
                this.$emit('onFinishInitMap', this.map);
            },
            initCurrentLocation() {
                if(navigator.geolocation) {
                    // timeout at 60000 milliseconds (60 seconds)
                    let options = { timeout:60000 };
                    navigator.geolocation.getCurrentPosition((position => {
                        let latitude = position.coords.latitude;
                        let longitude = position.coords.longitude;
                        this.map.getView().animate({zoom: 16}, {center: fromLonLat([longitude, latitude])});
                    }), ()=>{}, options);
                } else {
                    alert("Sorry, browser does not support geolocation!");
                }
            },
            initMapInteraction(drawType) {
                this.draw = new Draw({
                    source: this.vectorSource,
                    type: drawType,
                });
                this.map.addInteraction(this.draw);
            },
            changeMode() {
                this.isEditing = !this.isEditing;
            }
        },
        watch: {
            isEditing(newValue) {
                if(!newValue) {
                    this.initMapInteraction('Point');
                } else {
                    this.map.removeInteraction(this.draw);
                }
            }
        }
    }
</script>

<style scoped>

</style>
