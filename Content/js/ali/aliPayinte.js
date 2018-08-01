            $('#total').click(function (e) {
                            $('.layer-content').slideToggle();
              })
            $('.jiantou').click(function(e){
                $('.layer-content').slideToggle();
               })

            $('.form_edit').on('touchstart','.num',function(e){
              var oDiv = document.getElementById("total");
                  $(this).addClass('bg');   
                  //阻止菜单默认事件 
                   $(this).bind('contextmenu', function(e) {
                          e.preventDefault();
                      });         
             });
             var reg = /^((?:0|0\.)|(?:[1-9]\d*|[1-9]\d*\.))(?:\.\d{1,2})?$/;
            $('.form_edit').on('touchend','.num',function(e){
                 $(this).removeClass('bg');
                 // $('#total').removeClass('place');
                  var oDiv = document.getElementById("total");
                  var totalStr = oDiv.innerHTML; 
                  totalStr = totalStr + $(this).innerHTML;
                  if (reg.test(totalStr)) {
                      oDiv.innerHTML = totalStr;
                  }
              
                 $(this).bind('contextmenu', function(e) {
                      e.preventDefault();
                  });
           });
           $("#total").bind('DOMNodeInserted', function(e) {    
            if($(e.target).html()){
                
                 $('.submit').removeClass('pays');
                 $('.submit').attr('disabled', false);
               }
               // else{
                
               //  $('.submit').addClass('pays');
               //  console.log('zlza')
               //  $('.submit').attr('disabled','disabled');
               // }  
          });
           $('body').on('touchend','.wrappers',function(e){
                //阻止菜单默认事件 
                   $(this).bind('contextmenu', function(e) {
                          e.preventDefault();
                      });
           })
            
