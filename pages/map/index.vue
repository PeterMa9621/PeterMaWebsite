<template>
    <div>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                data-projection="EPSG:4326" style="height: 400px" @singleclick="onClickMap">
            <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

            <vl-geoloc @update:position="geolocPosition = $event">
                <template slot-scope="geoloc">
                    <vl-feature v-if="geoloc.position" id="position-feature">
                        <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                        <vl-style-box>
                            <vl-style-icon :src="markerIcon" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                        </vl-style-box>
                    </vl-feature>
                </template>
            </vl-geoloc>



            <vl-layer-vector :z-index="1">
                <vl-source-vector :features.sync="features" ident="the-source"></vl-source-vector>
                <vl-style-box>
                    <vl-style-icon :src="markerIcon" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                </vl-style-box>
            </vl-layer-vector>

            <vl-interaction-draw v-if="!isEditing" type="Point" source="the-source">
                <vl-style-box>
                    <vl-style-icon :src="markerIcon" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                </vl-style-box>
            </vl-interaction-draw>

            <vl-layer-tile id="osm" :z-index="0">
                <vl-source-osm></vl-source-osm>
            </vl-layer-tile>
        </vl-map>
        <b-button @click="isEditing = !isEditing">{{ isEditing?'Create':'Edit' }}</b-button>
    </div>
</template>

<script>
    import flagIcon from '../../assets/flag.png';
    import markerIcon from '../../assets/marker.png';
    import { v4 as uuidv4 } from 'uuid';
    export default {
        name: "index",
        data() {
            return {
                zoom: 2,
                center: [0, 0],
                rotation: 0,
                geolocPosition: undefined,
                markerIcon: markerIcon,
                flagIcon: flagIcon,
                markers: {},
                features: [],
                isEditing: false
            }
        },
        methods: {
            onClickMap(e) {
                let id = uuidv4();
                this.markers[id] = {
                    coordinates: e.coordinate
                };
            }
        },
        watch: {
            geolocPosition(newLocation) {
                this.center = newLocation;
            }
        }
    }
</script>

<style scoped>

</style>
