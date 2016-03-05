(function(){

	var settings = {
		channel: 'pi-house',
		publish_key: 'demo',
		subscribe_key: 'demo'
	};

	var pubnub = PUBNUB(settings);

	var door = document.getElementById('door');
	var Relay1 = document.getElementById('Relay1');
	var Relay2 = document.getElementById('Relay2');
	var Relay3 = document.getElementById('Relay3');
	var lightLiving = document.getElementById('lightLiving');
	var lightPorch = document.getElementById('lightPorch');
	var fireplace = document.getElementById('fireplace');

	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
			}
		}
	})

	/* 
		Data settings:

		Servo

		item: 'door'
		open: true | false

		LED

		item: 'light-*'
		brightness: 0 - 10

	*/

	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	// UI EVENTS

	door.addEventListener('change', function(e)
	{
		publishUpdate({item: 'good', open: this.checked});
	}, false);
	Relay1.addEventListener('change', function(e)
	{
		publishUpdate({item: 'Relay1', open: this.checked});
	}, false);
	Relay2.addEventListener('change', function(e)
	{
		publishUpdate({item: 'Relay2', open: this.checked});
	}, false);
	Relay3.addEventListener('change', function(e)
	{
		publishUpdate({item: 'Relay3', open: this.checked});
	}, false);

	
	lightLiving.addEventListener('change', function(e){
		publishUpdate({item: 'light-living', brightness: +this.value});
	}, false);

	lightPorch.addEventListener('change', function(e){
		publishUpdate({item: 'light-porch', brightness: +this.value});
	}, false);

	fireplace.addEventListener('change', function(e){
		publishUpdate({item: 'fireplace', brightness: +this.value});
	}, false);
})();
