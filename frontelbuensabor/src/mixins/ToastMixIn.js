export default {
	methods : {
		emit(content) {
			this.$bvToast.toast(content.error, {
				title       : content.title,
				toaster     : 'b-toaster-top-center',
				solid       : true,
				appendToast : true
			});
		}
	}
};
