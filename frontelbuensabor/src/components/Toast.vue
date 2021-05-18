<script>
export default {
  methods: {
    emitToast(msg, title) {
      this.$bvToast.toast(msg, {
        title: title,
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: true,
        variant: "info",
      });
    },
  },
};
</script>

<style></style>
