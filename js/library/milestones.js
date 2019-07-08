/*
* jQuery Milestone Plugin 1.0.0 (works with jQuery 1.10+)
*
* This is a jQuery plugin that uses the bootstrap progress bar plugin to
* display a horizontal timeline with milestones.
*
*/
;(function ( $ ) {
	"use strict",

	$.fn.milestones = function( options ) {

		/*--------------------------
		Default settings
		--------------------------*/
		var settings = $.extend({
			labels					  : ["Step1","Step2","Step3","Step4"], 		// Array of labels for each milestone
			stage				      : 2,		                                //
			sunday         	          : 0,
			monday         	          : 0,
			tuesday        	          : 0,
			wednesday         	      : 0,
			thursday         	      : 0,
			friday         	          : 0,
			saturday        	      : 0,
			checkclass    		      : 'checkmark',
			clickable                 : false
		}, options );

		return this.each( function() {

			/*--------------------------
			Establish global variables
			--------------------------*/
			var id = $(this).attr('id');
			var labels = ($(this).data('labels') !== undefined ? $(this).data('labels') : settings.labels);
			var stage = ($(this).data('stage') !== undefined ? $(this).data('stage')-1 : settings.stage-1);
			var sunday = ($(this).data('sunday') !== undefined ? $(this).data('sunday') : settings.sunday);
			var monday = ($(this).data('monday') !== undefined ? $(this).data('monday') : settings.monday);
			var tuesday = ($(this).data('tuesday') !== undefined ? $(this).data('tuesday') : settings.tuesday);
			var wednesday = ($(this).data('wednesday') !== undefined ? $(this).data('wednesday') : settings.wednesday);
			var thursday = ($(this).data('thursday') !== undefined ? $(this).data('thursday') : settings.thursday);
			var friday = ($(this).data('friday') !== undefined ? $(this).data('friday') : settings.friday);
			var saturday = ($(this).data('saturday') !== undefined ? $(this).data('saturday') : settings.saturday);
			var checkclass = ($(this).data('checkclass') !== undefined ? $(this).data('checkclass') : settings.checkclass);
			var clickable = ($(this).data('clickable') !== undefined ? $(this).data('clickable') : settings.clickable);

			/*--------------------------
			Set variables based on globals
			--------------------------*/
			var ticks = labels.length;
			var div = ticks-1;
			var per = 100 / div;
			var len = stage * per;

			/*-----------------------------
			Insert the Milestone components
			------------------------------*/
			$(this).html('<div class="progress"><div class="progress-bar" role="progressbar" style="width:'+len+'%"> </div></div><div class="stage"></div><div class="labels"></div><div class="alt-label">Next Action: <span>'+labels[stage]+'</span></div>');

			/*-----------------------------
			Iterate to define the tickmarks
			and checkmarks
			------------------------------*/
			for (x=0;x<=div;x++){
				var lft = (per*x)-.4;
				var icon = '';
				var cls = ' forward';
				var day = '';
				var checkbox = '';
				if(x === 0){
				    day = 'monday';
				    if(monday === 1){
				        icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else if(x === 1){
				    day = 'tuesday';
				    if(tuesday === 1){
				        icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else if(x === 2){
				    day = 'wednesday';
				    if(wednesday === 1){
				        icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else if(x === 3){
				    day = 'thursday';
				    if(thursday === 1){
				        icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else if(x === 4){
				    day = 'friday';
				    if(friday === 1){
					    icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else if(x === 5){
				    day = 'saturday';
				    if(saturday === 1){
					    icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}else{
				    day = 'sunday';
				    if(sunday === 1){
				        icon = '<i class="fa fa-check '+checkclass+'"></i>';
					    cls = ' past';
				    }
				}
				
				if(clickable){
				   checkbox = '<input type="checkbox" class="checkday" datainternal-id="'+day+'"/>'; 
				}
				
				if (x === 0){
					$("#"+id+" .stage").append('<span class="tick first'+cls+'">'+icon+''+checkbox+'</span>');
					$("#"+id+" .labels").append('<label class="tick-label first"><span>'+labels[x]+'</span></label>');
				}else if (x == div){
					$("#"+id+" .stage").append('<span class="tick last'+cls+'">'+icon+''+checkbox+'</span>');
					$("#"+id+" .labels").append('<label class="tick-label last"><span>'+labels[x]+'</span></label>');
				}else{
					var n = labels[x].length/5;
					var llft = (per*x)-n;
					$("#"+id+" .stage").append('<span class="tick'+cls+'" style="left:'+lft+'%">'+icon+''+checkbox+'</span>');
					$("#"+id+" .labels").append('<label class="tick-label" style="left:'+llft+'%"><span>'+labels[x]+'</span></label>');
				}
			}
		});

	};
}( jQuery ));