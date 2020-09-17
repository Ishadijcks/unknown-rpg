<template>
  <div>
    <h4>Equipment</h4>
    Weapon: <span v-if="weapon != null">{{ weapon.name }}</span>
    <button @click="unEquip('Weapon')">Unequip</button>
    <ul>
      <li>criticalChance: {{equipment.criticalChance}}</li>
      <li>dodgeChance: {{equipment.dodgeChance}}</li>
      <li>mageAttack: {{equipment.mageAttack}}</li>
      <li>mageDefense: {{equipment.mageDefense}}</li>
      <li>maxHealth: {{equipment.maxHealth}}</li>
      <li>meleeAttack: {{equipment.meleeAttack}}</li>
      <li>meleeDefense: {{equipment.meleeDefense}}</li>
      <li>rangeAttack: {{equipment.rangeAttack}}</li>
      <li>rangeDefense: {{equipment.rangeDefense}}</li>
    </ul>
  </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
  name: "ABCPlayerEquipment",
  data() {
    return {
      equipment: App.game.equipment,
    }
  },

  methods: {
    unEquip(type) {
      this.equipment.unEquip(type)
    }
  },
  computed: {
    weapon() {
      return this.equipment.equipment.Weapon
    }
  }

}
</script>

<style scoped>

</style>
