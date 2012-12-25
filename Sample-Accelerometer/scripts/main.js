document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state on device
document.addEventListener("touchstart", function() {}, false);

function onDeviceReady() {
	var accelerometerHelper = new AccelerometerApp();
	accelerometerHelper.run();
}

function AccelerometerApp() {

}

AccelerometerApp.prototype = {
	watchID : null,
	spanX : null,
	spanY: null,
	spanZ: null,
	spanTimeStamp: null,
  spanDiff: null,

	run: function() {
		var that = this,
    		startButton = document.getElementById("startButton"),
    		stopButton = document.getElementById("stopButton"),
        configButton = document.getElementById('configButton');

		that.spanX = document.getElementById("spanDirectionX");
		that.spanY = document.getElementById("spanDirectionY");
		that.spanZ = document.getElementById("spanDirectionZ");
		that.spanTimeStamp = document.getElementById("spanTimeStamp");
    that.spanDiff = document.getElementById("spanDiff")

		startButton.addEventListener("click",
									 function() {
										 that._startWatch.apply(that, arguments)
									 });
		stopButton.addEventListener("click",
									function() {
										that._stopWatch.apply(that, arguments)
									});
    configButton.addEventListener('click',
                  function(){
                    that._configWatch.apply(that, arguments)
                  });
	},

	// Start watching the acceleration
	_startWatch: function() {
		// Only start testing if watchID is currently null.
		var that = this;
		if (that.watchID === null) {
			// Update acceleration every .5 second
			var options = { frequency: 500 };
			that.watchID = navigator.accelerometer.watchAcceleration(function() {
				that._onAccelerometerSuccess.apply(that, arguments)
			},
            function(error) {
             that._onAccelerometerError.apply(that, arguments)
            },
            options);
		}
	},

	// Stop watching the acceleration
	_stopWatch: function() {
		var that = this;
		if (that.watchID !== null) {
			var emptyText = "";
			navigator.accelerometer.clearWatch(that.watchID);
			that.watchID = null;
			that.spanX.innerText = emptyText;
			that.spanY.innerText = emptyText;
			that.spanZ.innerText = emptyText;
			that.spanTimeStamp.innerText = emptyText;
		}
	},
  _configWatch: function(){
    var that = this
    alert('config val')
    _V_.Player.setSpeed(2.0)
  },

	//Get a snapshot of the current acceleration
	_onAccelerometerSuccess: function(acceleration) {
		var that = this;
		that.spanX.innerText = acceleration.x;
		that.spanY.innerText = acceleration.y;
		that.spanZ.innerText = acceleration.z;
		that.spanTimeStamp.innerText = acceleration.timestamp;

    var diffVal = function(){
      var accx = Math.abs(acceleration.x)
        , accy = Math.abs(acceleration.y)
        , accz = Math.abs(acceleration.z)
      return accx + accy + accz
    }

    that.spanDiff.innerText = diffVal()
	},

	//Failed to get the acceleration
	_onAccelerometerError: function(error) {
		alert("Unable to start accelerometer! Error code: " + error.code );
	}
}
