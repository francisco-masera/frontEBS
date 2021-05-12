export default class Utils {
	preventScroll = () => {
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		window.onscroll = function() {
			window.scrollTo(scrollLeft, scrollTop);
		};
	};
	enableScroll = () => {
		window.onscroll = function() {};
	};
}
