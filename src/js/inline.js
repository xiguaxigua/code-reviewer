import * as wilddog from 'wilddog'
import _throttle from 'lodash/throttle'

var config = {
  syncURL: "https://code-reviewer.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

document.addEventListener('mousemove', _throttle(sendPosigion, 1000))

ref.on("value", function(snapshot) {
    console.log(snapshot.val());
});

function sendPosigion (event) {
  ref.set({
    "mouse":{
      left: event.pageX,
      top: event.pageY
    }
  });
}