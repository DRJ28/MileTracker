$(function() {
	$('.date').each(function(){
		$(this).datepicker();
	});


	showRuns();
	function showRuns(){
		var runs = getRunsObject();
		if (runs != '' && runs != null) {
			for(var i = 0; i < runs.length; i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+
					runs[i]['date']+'<br><strong>Distance:</strong>'+runs[i]['miles']+'m<div class="controls">'+
					'<a href="#edit" id="editLink" data-miles="'+runs[i]['miles']+'" data-date="'+runs[i]['date']+
					'">Edit</a> | <a href="#delete" id="deletelink" data-miles="'+runs[i]['miles']+'" data-date="'+runs[i]['date']+
					'" onclick="return confirm(\'Are you sure?\')">Delete</a></div></li>');
			}
		}else{
			$('#stats').html('<p>You have no logged runs</p>');
		}
	}

	$('#clearRuns').on('tap', clearRun);
	function clearRun(){
		localStorage.removeItem('totalRuns');
		window.location.href = 'index.html';
	}
	$('#stats').on('tap','#deletelink', deleteTap);
	function deleteTap(){
		debugger;
		var currentMile = $(this).data('miles');
		var currentDate = $(this).data('date');
		console.log(currentDate);
		console.log(currentMile);
		var runs = getRunsObject();
		for (var i = 0; i < runs.length; i++) {
			if (runs[i].date == currentDate && runs[i].miles == currentMile){
				console.log(runs.splice(i,1));
				localStorage.setItem('totalRuns', JSON.stringify(runs));
				break;
			}
		}
		window.location.href = 'index.html';
		return false;
	}
	$('#stats').on('tap','#editLink', editTap);
	function editTap(){
		$('#editMiles').val($(this).data('miles'));
		$('#editDate').val($(this).data('date'));
		localStorage.setItem('currentMile', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
	}
	$('#submitEdit').on('tap', editRun);
	function editRun(){
		var currentMile = localStorage.getItem('currentMile');
		var currentDate = localStorage.getItem('currentDate');
		var runs = getRunsObject();
		for (var i = 0; i < runs.length; i++) {
			if (runs[i].date == currentDate && runs[i].miles == currentMile){
				console.log(runs.splice(i,1));
				localStorage.setItem('totalRuns', JSON.stringify(runs));
				break;
			}
		}
		var currentDate = $('#editDate').val();
		var currentMile = $('#editMiles').val();
		var update_run= {
			date: currentDate,
			miles: currentMile
		}
		debugger;
		runs = getRunsObject();
		runs.push(update_run);
		alert('Run updated');
		localStorage.setItem('totalRuns', JSON.stringify(runs));
		window.location.href = 'index.html';
		return false;
	}
	$('#submitRun').on('tap', addRun);
	function addRun(){
		var mile = $('#addMiles').val();
		var dta = $('#addDate').val();
		var run = {
			date: dta,
			miles: mile
		};
		var runs = getRunsObject();
		runs.push(run);
		alert('Run Added');////
		localStorage.setItem('totalRuns', JSON.stringify(runs));
		window.location.href = 'index.html';
		return false;
	}

	function getRunsObject(){
		var runs = new Array();
		var currentRun = localStorage.getItem('totalRuns');
		if (currentRun != null) {
			var runs = JSON.parse(currentRun);
		}
		return runs.sort(function(a,b){
			return new Date(b.date) - new Date(a.date);
		});
	}

});

