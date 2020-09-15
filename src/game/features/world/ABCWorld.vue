<template>
  <div>

    <!--    <p>We are the world</p>-->


    <!--    <br>-->
    <!--    <h3>Towns</h3>-->
    <!--    <p v-for="town of allTowns" :key="town.id"> {{ town }}</p>-->
    <!--    <br>-->
    <!--    <h3>Roads</h3>-->
    <!--    <p v-for="road of allRoads" :key="road.id"> {{ road }}</p>-->

    <h3>Player Position</h3>
    <p> {{ playerLocation }}</p>
    <button @click="moveToTown(TownId.SmallTown)">Move to Small Town</button>
    ----
    <button @click="moveToTown(TownId.ToonTown)">Move to Toon Town</button>
    ----
    <button @click="moveToTown(TownId.AwesomeTown)">Move to Awesome Town</button>
    ----
    <button @click="moveToResourceArea(ResourceAreaId.Lake1)">Move to Lake 1</button>

    <p>Open the console to see rejected movement</p>

    <h4>Actions in {{ this.world.playerLocation }}</h4>
    <button v-for="action in possibleActions" :key="action.description"
            @click="scheduleAction(action)">
      {{ action.description }}
    </button>

    <div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="681px"
           height="441px" viewBox="-0.5 -0.5 681 441"
           style="background-color: rgb(255, 255, 255);">
        <defs/>
        <abc-town :x="50" :y="150" :town="getTown(TownId.SmallTown)"></abc-town>
        <abc-town :x="250" :y="150" :town="getTown(TownId.ToonTown)"></abc-town>
        <abc-town :x="450" :y="150" :town="getTown(TownId.AwesomeTown)"></abc-town>

        <abc-road :from-x="90" :from-y="150" :to-x="210" :to-y="150" :road="getRoad(RoadId.OldTownRoad)"></abc-road>
        <abc-road :from-x="290" :from-y="150" :to-x="410" :to-y="150" :road="getRoad(RoadId.ToonToAwesome)"></abc-road>
      </svg>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {TownId} from "@/game/features/world/towns/TownId";
import {ResourceAreaId} from "@/game/features/world/resourceareas/ResourceAreaId";
import {ResourceAreLocationIdentifier} from "@/game/features/world/resourceareas/ResourceAreaLocationIdentifier";
import ABCTown from "@/game/features/world/ABCTown";
import ABCRoad from "@/game/features/world/ABCRoad";
import {RoadLocationIdentifier} from "@/game/features/world/roads/RoadLocationIdentifier";
import {RoadId} from "@/game/features/world/roads/RoadId";

export default {
  name: "ABCWorld",
  components: {
    'abc-town': ABCTown,
    'abc-road': ABCRoad,
  },
  data: function () {
    return {
      TownId: TownId,
      RoadId: RoadId,
      ResourceAreaId: ResourceAreaId,
      world: App.game.world,
    }
  },

  methods: {
    moveToTown(id) {
      this.world.moveToLocation(new TownLocationIdentifier(id))
    },
    moveToResourceArea(id) {
      this.world.moveToLocation(new ResourceAreLocationIdentifier(id))
    },
    scheduleAction(action) {
      App.game.player.addAction(action);
    },
    getTown(id) {
      return this.world.getLocation(new TownLocationIdentifier(id));
    },
    getRoad(id) {
      return this.world.getLocation(new RoadLocationIdentifier(id));
    }
  },

  computed: {
    possibleActions() {
      return this.world.getCurrentLocation().possibleActions;
    },
    playerLocation() {
      return this.world.playerLocation;
    },

    allTowns() {
      return this.world.towns;
    },
    allRoads() {
      return this.world.roads;
    },
  }
}
</script>

<style scoped>
div {
  border: 1px solid black;
}
</style>
