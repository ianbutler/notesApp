angular.module('app')

	.controller('MyCtrl', [ '$scope', '$timeout', '$window', function( $scope, $timeout, $window ) {
		
		$scope.loadingPage = true;
		$scope.localStorage = true;
		$scope.noteModal = false;
		$scope.notes = [];

		// pulls up notes if you have them
		if (storageAvailable('localStorage')) {
			getNotes();
		}
		else {
			$scope.localStorage = false;
			$scope.loadingPage = false;
		}

		// brings up the text box to create a new note
		$scope.addNoteModal = function() {
			$scope.noteModal = true;
		}

		// changes the status of noteModal which makes it go away
		$scope.removeModal = function() {
			$scope.noteModal = false;
		}

		// adds a note
		$scope.addNote = function( newNote ) {
			$scope.notes.unshift({
				note: newNote,
				date: new Date()
			});

			$window.localStorage.notes = JSON.stringify($scope.notes);
			getNotes();
			$scope.noteModal = false;
		}

		// removes the note that the user clicks to remove
		$scope.removeNote = function( index ) {
			
			$scope.notes.splice(index,1);
			$window.localStorage.notes = JSON.stringify($scope.notes);
			getNotes();
		
		}

		// grabs notes in localstorage and stores them in an array
		function getNotes() {
			
			var noteString;

			if ( !window.localStorage.notes || !$window.localStorage.notes.length ) {
				$scope.loadingPage = false;
			}
			else {
				noteString = JSON.parse($window.localStorage.notes);
				$scope.notes = noteString;
				$scope.loadingPage = false;		
			} 

		};

		// below taken from Mozilla WebStorage API 
		// checks for local storage
		function storageAvailable(type) {
			
			try {
				var storage = window[type],
				x = '__storage_test__';
				storage.setItem(x, x);
				storage.removeItem(x);
				return true;
			}
			catch(e) {
				return false;
			}

		}

	}])