<template>
  <section>
    <h4 class="font-weight-regular title">{{ title }}</h4>
    <h5 class="font-weight-light grey--text text--darken-3 subheading">
      {{ subTitle }}
    </h5>
  </section>
</template>

<script>
export default {
  name: 'Calcule',
  props: {
    subTitle: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>
