;

jQuery( function() {
    
    // 时间选择
	jQuery('.js-datetimepicker').each(function() {
		var str = document.getElementsByClassName('js-datetimepicker')[0].getAttribute("default_date");

		var start = new Date(Date.parse("2022-02-04 08:00".replace(/-/g,  "/")));
		var end = new Date(Date.parse("2022-02-20 22:00".replace(/-/g,  "/")));
		var defaultDate = new Date(Date.parse(str.replace(/-/g,  "/")));

		var $input = jQuery(this);
		$input.datetimepicker({
			format: $input.data('format') ? $input.data('format') : false,
			useCurrent: $input.data('use-current') ? $input.data('use-current') : false,
			locale: moment.locale('' + ($input.data('locale') ? $input.data('locale') : '') + ''),
			showTodayButton: $input.data('show-today-button') ? $input.data('show-today-button') : false,
			showClear: $input.data('show-clear') ? $input.data('show-clear') : false,
			showClose: $input.data('show-close') ? $input.data('show-close') : false,
			sideBySide: $input.data('side-by-side') ? $input.data('side-by-side') : false,
			inline: $input.data('inline') ? $input.data('inline') : false,
			minDate: start,
			maxDate: end,
			defaultDate: defaultDate,
		})
			.on('dp.change',function(ev){
				var value = $('.js-datetimepicker').val();

				var datetime = value;
				// datetime = datetime.replaceAll(" ","_").replaceAll(":","_").replaceAll("-","_");
				$.ajax({
					url: '/writeOldData/?date=' + datetime,
					type: 'get',
					success: function (data) {
					}
				});
			})
			.on('dp.hide',function(ev){
				window.location.reload();
			});
	});
    
    // // 日期选择
	// jQuery('.js-datepicker').each(function() {
	//     var $input = jQuery(this);
	// 	$input.datepicker({
	// 		weekStart: 1,
	// 		autoclose: true,
	// 		todayHighlight: true,
	// 		language: 'zh-CN',
	// 	});
	// });

});