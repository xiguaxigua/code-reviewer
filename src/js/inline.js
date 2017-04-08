import * as wilddog from 'wilddog'
import _throttle from 'lodash/throttle'

var config = {
  syncURL: "https://code-reviewer.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
var id = new Date().getTime() + Math.random()
console.log(id)

var box = document.createElement('div')
box.classList.add('box')
var style = {
  width: '10px',
  height: '10px',
  backgroundColor: 'red',
  position: 'absolute',
  left: '1px',
  top: '1px'
}
Object.keys(style).forEach(key => {
  box.style[key] = style[key]
})
console.log(document.body)
document.body.appendChild(box)


document.addEventListener('mousemove', _throttle(sendPosigion, 1000))

ref.child('admin').set({
  id: id
})
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    var val = snapshot.val()
    if (val.admin.id !== id) {
      console.log('触发鼠标位置修改')
      box.style.left = val.mouse.left + 'px'
      box.style.top = val.mouse.top + 'px'
    }
});

function sendPosigion (event) {
  ref.child('mouse').set({
    left: event.pageX,
    top: event.pageY
  });
}
