<template>
  <div>
    <h4>Equipment</h4>
    Weapon: <span v-if="equipment.equippedWeapon != null">{{ equipment.equippedWeapon.name }}</span>
  </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
  name: "ABCPlayerEquipment",
  data() {
    return {
      equipment: App.game.equipment
    }
  },

}
</script>

<style scoped>

</style>
