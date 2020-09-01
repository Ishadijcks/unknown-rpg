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
  </div>
</template>

<script>
import {App} from "@/App.ts";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {TownId} from "@/game/features/world/towns/TownId";
import {ResourceAreaId} from "@/game/features/world/resourceareas/ResourceAreaId";
import {ResourceAreLocationIdentifier} from "@/game/features/world/resourceareas/ResourceAreaLocationIdentifier";

export default {
  name: "ABCWorld",
  data: function () {
    return {
      TownId: TownId,
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
  },

  computed: {
    possibleActions() {
      return this.world.getCurrentLocation().possibleActions
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
