/**
 * Setup the Networked-Aframe scene component based on query parameters
 */
AFRAME.registerComponent('dynamic-room', {
  init: function () {	
    var el = this.el;
    var params = this.getUrlParams();

    if (!params.room) {
      window.alert('Please add a room name in the URL, eg. ?room=myroom');
	}
	
	var roomid = params.room.split('|')[0];
	var roomname = params.room.split('|')[1];	
	var corpid = params.corpid;
	var username = params.username;
	
	/*
	// Set local user's name
	var p = document.createElement('a-entity');
	p.setAttribute('id', 'player');	
	p.setAttribute('camera', '');
	p.setAttribute('position', '0 3 0');
	//p.setAttribute('spawn-in-circle', 'radius:1');
	p.setAttribute('wasd-controls', '');
	p.setAttribute('look-controls', '');
	p.setAttribute('animation-mixer', 'clip', 'idle');
	p.setAttribute('networked', 'template:#'+corpid+'-avatar-template;attachTemplateToLocal:false;');
	p.setAttribute('movement-controls', 'constrainToNavMesh:true;');
		
	var c = document.createElement('a-entity');
	c.setAttribute('id', 'corp');
	c.setAttribute('class', 'corp');
	c.setAttribute('text', 'value', corpid);
	p.appendChild(c);

	var n = document.createElement('a-entity');
	n.setAttribute('class', 'nametag');
	n.setAttribute('text', 'value', username);	
	p.appendChild(n);
		
	var div = document.getElementById('player_div');
	div.setAttribute('corpid', corpid);
	div.setAttribute('display_name', username);
	div.appendChild(p);
	*/
	
	// Setup networked-scene		
    var networkedComp = {
		serverURL: 'wss://160.1.42.191/janus',
		app: 'VRMeeting',
		room: roomname,
		adapter: 'janus',
		audio: true,
		video: true,
		debug: true
	  };
  
	  //console.info('Init networked-aframe with settings:', networkedComp);
	  el.setAttribute('networked-scene', networkedComp);
	  el.emit("connect", null, false);	
  },

  getUrlParams: function () {
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);
    var urlParams = {};

    match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return urlParams;
  }
});