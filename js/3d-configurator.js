    // Sketchfab Viewer API: Start/Stop the viewer
var version = '1.5.2';
var uid = '4831a574a33148b4b7d863c428f26fc1';
var iframe = document.getElementById('api-frame');
var client = new window.Sketchfab(version, iframe);

var error = function() {
    console.error('Sketchfab API error');
};

var success = function(api) {
    api.start(function() {
        api.addEventListener('viewerready', function() {
            api.getSceneGraph(function(err, result) {

                api.getAnnotationList(function(p, list) {
                    var l = list.length;
                    for (var k = 0; k < l; k++) {
                        api.hideAnnotation(k);
                    }
                });
                //wall
                api.show(1024);
                //waterline front
                api.hide(380);
                //waterline front
                api.hide(5); 
                
                api.hide(150); //show roof if 4 seat clicked
                api.show(321); //show roof if 4 seat clicked

                api.hide(46);  //rear vent
                api.hide(6);
                api.hide(21);
                api.hide(45);
                api.hide(46); 
                api.hide(57);
                api.hide(77);
                api.hide(78);
                api.hide(89);
                api.hide(102);
                api.hide(117);
                api.hide(149);
                api.hide(150);
                api.hide(165);
                api.hide(165);
                api.hide(166);

                //rear extension
                api.hide(714); 
                api.hide(715);
                api.hide(725);
                api.hide(737);
                api.hide(751); 
                api.hide(761);
                api.hide(775);
                api.hide(785);
                api.hide(793);
                api.hide(801);
                api.hide(813);
                api.hide(825);
                api.hide(835);
                api.hide(845);
                api.hide(863);
                api.hide(877);
                api.hide(887);
                api.hide(901);
                api.hide(915);
                api.hide(929);
                api.hide(183);
                api.hide(214);
                api.hide(203);
                api.hide(194);

                if (err) {
                    console.log('Error getting nodes');
                    return;
                } 
            });

            //var id = 1024;
            document.getElementById('active2').addEventListener('click', function() {
                document.getElementById("active1").classList.remove("w--current");
                document.getElementById("active2").classList.add("w--current");

                document.getElementById("act1").classList.add("w--current");
                document.getElementById("act2").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
                api.hide(1024);
                api.show(5); 
                
                api.show(150); //show roof if 4 seat clicked
                api.show(321); //show roof if 4 seat clicked

                api.hide(46);  //rear vent
                api.show(6);
                api.show(21);
                api.show(45);
                api.show(46); 
                api.show(57);
                api.show(77);
                api.show(78);
                api.show(89);
                api.show(102);
                api.show(117);
                api.show(149);
                api.show(150);
                api.show(165);
                api.show(165);
                api.show(166);

                //rear extension
                api.show(714); 
                api.show(715);
                api.show(725);
                api.show(737);
                api.show(751); 
                api.show(761);
                api.show(775);
                api.show(785);
                api.show(793);
                api.show(801);
                api.show(813);
                api.show(825);
                api.show(835);
                api.show(845);
                api.show(863);
                api.show(877);
                api.show(887);
                api.show(901);
                api.show(915);
                api.show(929);
                 //waterline front
                api.hide(380);
                //waterline front
                api.hide(57);
                api.show(348); //extin
                api.show(336);
            });
            document.getElementById('active1').addEventListener('click', function() {
                document.getElementById("active2").classList.remove("w--current");
                document.getElementById("active1").classList.add("w--current");

                document.getElementById("act1").classList.add("w--current");
                document.getElementById("act2").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
                api.hide(5); 
                api.show(1024); 
                api.hide(6);
                api.hide(21);
                api.hide(45);
                api.hide(46); 
                api.hide(77);
                api.hide(78);
                api.hide(89);
                api.hide(102);
                api.hide(117);
                api.hide(149);
                api.hide(150);
                api.hide(165);
                api.hide(165);
                api.hide(166);

                //rear extension
                api.hide(714); 
                api.hide(715);
                api.hide(725);
                api.hide(737);
                api.hide(751); 
                api.hide(761);
                api.hide(775);
                api.hide(785);
                api.hide(793);
                api.hide(801);
                api.hide(813);
                api.hide(825);
                api.hide(835);
                api.hide(845);
                api.hide(863);
                api.hide(877);
                api.hide(887);
                api.hide(901);
                api.hide(915);
                api.hide(929);

                 //waterline front
                api.hide(380);
                //waterline front
                api.hide(57);
                //backwall
                api.hide(183);
                api.hide(214);
                api.hide(194);
                api.hide(203);

                api.show(369);  //front vent
                api.show(46);  //rear vent
                api.hide(380); //roof close
                api.hide(57);   //roof close
                api.show(150);
                api.show(321);

                api.show(348); //extin
                api.show(336); //extin 

            });

            //extin
            document.getElementById('act1').addEventListener('click', function() {
                document.getElementById("act1").classList.add("w--current");
                document.getElementById("act2").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
                //condition
                api.show(348); //extin
                api.show(336);
                api.show(5);
                //api.show(6);
                //api.show(21);

                api.show(150); //clsoe roof
                api.show(321); //close roof

                api.show(369);  //front vent
                api.show(46);  //rear vent
                api.hide(380); //roof close
                api.hide(57);   //roof close

                });
            //vent
            document.getElementById('act2').addEventListener('click', function() {
                document.getElementById("act2").classList.add("w--current");
                document.getElementById("act1").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
               
                //rear extin
                api.hide(5);
                api.hide(6);
                
                api.hide(369);  //front vent
                api.hide(46);  //rear vent
                
                api.show(165);

                //conditions
                api.show(150); //roof close
                api.show(321); //roof close
                api.hide(380); // waterline
                api.hide(57);  //waterline
                api.hide(348); //extin
                api.hide(336); //extin

             });
             
            //waterline
            document.getElementById('act3').addEventListener('click', function() {
                document.getElementById("act3").classList.add("w--current");
                document.getElementById("act1").classList.remove("w--current");
                document.getElementById("act2").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
                api.show(380);
                api.show(57);

                //conditions
                api.show(150); //roof close
                api.show(321); //roof close

                //condition
                api.hide(5);
                api.hide(6);
                
                api.show(369);  //front vent
                api.show(46);  //rear vent
                
                //front extin
                api.hide(336);
                api.hide(348); //extin
            });

            //openroof
            document.getElementById('act4').addEventListener('click', function() {
                document.getElementById("act4").classList.add("w--current");
                
                document.getElementById("act1").classList.remove("w--current");
                document.getElementById("act2").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act5").classList.remove("w--current");
                api.hide(150);
                api.hide(321);

                //condition
                api.hide(380); //waterlin
                api.hide(57); //waterline
               
                api.hide(348); //extin
                api.hide(336);
                api.hide(5);

                api.hide(579);
            });
            //closeroof
            document.getElementById('act5').addEventListener('click', function() {
                document.getElementById("act5").classList.add("w--current");
                document.getElementById("act1").classList.remove("w--current");
                document.getElementById("act3").classList.remove("w--current");
                document.getElementById("act4").classList.remove("w--current");
                document.getElementById("act2").classList.remove("w--current");
                api.show(150);
                api.show(321);

                api.hide(348); //extin
                api.hide(336); //extin
                api.hide(5);

                api.hide(380); // waterline
                api.hide(57);  //waterline

                api.show(369);  //front vent
                api.show(46);  //rear vent
            });
           

        // show/hide annotation 
        var btnSubscribe = document.querySelector("[name=checkbox]")
        btnSubscribe.addEventListener("change", function () {

            var subscribe = document.querySelector("[name=checkbox]");
            if (true === subscribe.checked) {
                api.getAnnotationList(function(p, list) {
                        //api.showAnnotation(list)
                            var l = list.length;
                           
                            for (var k = 0; k < l; k++) {
                                    api.showAnnotation(k);
                                }
                               
                });
            }else{
                api.getAnnotationList(function(p, list) {
                    //api.showAnnotation(list)
                        var l = list.length;
                         for (var k = 0; k < l; k++) {
                                api.hideAnnotation(k);
                            }
                });
            }
        });
        //end code for checkbox
           
    });

        api.addEventListener(
            'click',
            function(info) {
                console.log('click ' + info.position3D);
                if (info.instanceID) {

                    // hit
                    console.log('click ' + info.instanceID);
                }
            },
            { pick: 'fast' }
        );
        
    });

};

client.init(uid, {
    success: success,
    error: error,
    autostart: 1,
    preload: 1
});
//////////////////////////////////
// GUI Code
////////////////////////////////// 
function initGui() {
    var controls = document.getElementById('options');
    var buttonsText = '';
    buttonsText += '<div class="header"><img src="images/zenspace-logo.svg" alt=""></div><div class="options-type"><h5 class="heading">SmartPod Types</h5><div data-duration-in="300" data-duration-out="100" class="w-tabs"><div class="button-row w-tab-menu">';

    buttonsText += '<a data-w-tab="Tab 1" class="option-button w-inline-block w-tab-link w--current" id="active1"><img src="images/2seat.svg" alt="" class="option-button-icon"><div class="option-button-text">2 Seat SmartPod</div></a>';
    
    buttonsText += '<a data-w-tab="Tab 2" class="option-button w-inline-block w-tab-link" id="active2"><img src="images/4seat.svg" alt="" class="option-button-icon"><div class="option-button-text">4 Seat SmartPod</div></a></div></div></div>';
    
    buttonsText += '<div class="options-type"><h5 class="heading">Ceiling Type</h5><div data-duration-in="300" data-duration-out="100" class="w-tabs"><div class="button-row w-tab-menu">';
    
    buttonsText += '<a data-w-tab="Tab 1" class="option-button w-inline-block w-tab-link w--current" id="act1"><img src="images/fire.svg" alt="" class="option-button-icon"><div class="option-button-text">Close Roof With Extinguisher</div></a>';
    
    buttonsText += '<a data-w-tab="Tab 2" class="option-button w-inline-block w-tab-link" id="act2"><img src="images/vent.svg" alt="" class="option-button-icon" ><div class="option-button-text">Vented Roof</div></a>';
    
    buttonsText += '<a data-w-tab="Tab 3" class="option-button w-inline-block w-tab-link" id="act3"><img src="images/water.svg" alt="" class="option-button-icon"><div class="option-button-text">Closed Roof With Sprinkler Hose</div></a>';
    
    buttonsText += '<a data-w-tab="Tab 4" class="option-button w-inline-block w-tab-link" id="act4"><img src="images/open-roof.svg" alt="" class="option-button-icon"><div class="option-button-text">Open Roof</div></a>';
    
    buttonsText += '<a data-w-tab="Tab 5" class="option-button w-inline-block w-tab-link" id="act5"><img src="images/closed-roof.svg" alt="" class="option-button-icon"><div class="option-button-text">Close Roof</div></a>';

    buttonsText += '</div>';
    buttonsText += '<div class="tabs-content-2 w-tab-content"><div data-w-tab="Tab 1" class="w-tab-pane w--tab-active"></div><div data-w-tab="Tab 2" class="w-tab-pane"></div><div data-w-tab="Tab 3" class="w-tab-pane"></div><div data-w-tab="Tab 4" class="w-tab-pane"></div></div></div></div><div class="options-type features"><div class="w-form">';

    buttonsText += '<form id="wf-form-Form" name="wf-form-Form" data-name="Form"><label class="w-checkbox"><div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox" id="div-checked"></div><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" style="opacity:0;position:absolute;z-index:-1" value="1"/><span class="heading w-form-label">Show SmartPod Features</span></label></form>';
    
    buttonsText += '</div></div>';
    controls.innerHTML = buttonsText;
}
initGui();