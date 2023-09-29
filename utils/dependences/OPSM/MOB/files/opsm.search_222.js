/*jslint forin: true, sloppy: true, unparam: true, vars: true, white: true */
/*global window, document, jQuery, log */

var opsm = window.opsm || {};

(function(window, document, $, opsm) {
	
	opsm.search = (function () {
		
		var initShowMoreButton = function() {
			var showMoreContentButton = $("#btn-show-more-articles"); 

			showMoreContentButton.on("click", function(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				var url = $(ev.target).data("url");
				$.ajax({
					url: (url.indexOf('https') > -1) ? url : url.replace('http', 'https'),
					type: "POST",
					dataType: 'html',
					async: true,
					beforeSend: function () {
						$("#load-more-articles-spinner").removeClass("d-none");
						$("#btn-show-more-articles").addClass("d-none");
					},
					success: function(data) {
						var getDataAttr = $(data).filter("#search-result-articles");
						var moreResults = getDataAttr.find(".row");
						moreResults.each(function() {
							$("#search-result-article-blog").append(this);
						});
						var countReceivedObjects = getDataAttr.find("#current-content-count").text();
						$("#current-content-count").text(parseInt($("#current-content-count").text()) + parseInt(countReceivedObjects));
						$("#load-more-articles-spinner").addClass("d-none");
						if ($("#current-content-count").text() !== $("#total-content-count").text()) {
							$("#btn-show-more-articles").data("url", getDataAttr.find("#btn-show-more-articles").data("url"));
							$("#btn-show-more-articles").removeClass("d-none");
						} else {
							$("#btn-show-more-articles").data("url", "");
						}
					},
			        error: function (xhr, ajaxOptions, thrownError) {
						$("#load-more-articles-spinner").addClass("d-none");
						$("#btn-show-more-articles").removeClass("d-none");
			        	var ajax_details = [xhr,ajaxOptions,thrownError];
						Genericcallbackerror(ajax_details,true);
			        }
				});
			});
		}
		
		var loadListeners = function () {
			$("#searches-found a").on("click", function() {
				var searchTerm = $(this).data("search-term");
				if (typeof searchTerm === "undefined" || searchTerm === null || searchTerm === "") {
					searchTerm = $(this).text();
				}
				if (searchTerm.indexOf("|") !== -1) {
					searchTerm = searchTerm.substring(0,searchTerm.indexOf("|")).trim()
				}
				$("#search-input").val(searchTerm);
				searchoverlay.updateAction();
				$("#search-submit").click();
			});
		}
		
		var init = function () {
			initShowMoreButton();
			loadListeners();
		}

		return {
			init : init,
			loadListeners: loadListeners
		};
	}());
	
}(window, document, jQuery, opsm));

jQuery(opsm.search.init);
