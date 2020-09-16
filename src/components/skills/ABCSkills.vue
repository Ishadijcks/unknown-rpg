<template>

  <div style="">
    <p v-for="skill in skillList" :key="skill.type">
      {{ skill.type }} lvl. {{ skill.getLevel() }}, {{ skill.getLevelProgress().actual }}/{{skill.getLevelProgress().target}}
    </p>
  </div>
</template>

<script>
import {App} from "@/App.ts";
export default {
  name: "ABCSkills",
  data: function () {
    return {
      skills: App.game.skills,
    }
  },
  computed: {
    skillList() {
      return this.skills.skills;
    }
  }
}
</script>

<style scoped>
</style>
