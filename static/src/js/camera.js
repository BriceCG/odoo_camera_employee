odoo.define('camera.camera_attendance', function(require){
    "use.strict";
    var Widget = require('web.Widget');
    var widgetRegistry = require('web.widget_registry')
    var core = require('web.core');
    var QWeb = core.qweb;


    var CameraAttendance = Widget.extend({
     init: function(parent,value){
        this._super(parent);
        this.record = value.data
     },

     start: function(){
        this.$el.html(QWeb.render("CameraTemplateSource", {widget: self}));
        var video = this.el.querySelector('#videoElement');
        navigator.getUserMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;
        if(navigator.getUserMedia) {
            navigator.getUserMedia({video:true}, handleVideo, videoError);
          }

          function handleVideo(stream) {
            video.srcObject=stream;
            video.play()
          }

          function videoError(e) {

          }
          var canvas = this.el.querySelector('#canvas');
          var button = this.el.querySelector('#picture');
          var width = '200'
          var height = '200'
          var self = this;
          button.addEventListener('click', function(){
                var context = canvas.getContext('2d');
                canvas.width = width
                canvas.height = height
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                var image = canvas.toDataURL().split(';base64,')[1];
                self._rpc({
                    'model': 'hr.employee',
                    'method': 'write',
                    'args': [[self.record.id], {
                        'image_1920': image
                    }]
                }).then(function(data){
                    self.do_action({
                        'res_model': 'hr.employee',
                        'res_id': self.record.id,
                        'views': [[false, 'form']],
                        'type': 'ir.actions.act_window',
                    })
                })
          })

       },
    })

    widgetRegistry.add('Camera_attendance_mode', CameraAttendance)
})