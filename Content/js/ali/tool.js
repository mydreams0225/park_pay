 ///阻止默认事件兼容性写法
            function stopDefault( e ) { 
                //阻止默认浏览器动作(W3C) 
                if ( e && e.preventDefault ) {
                    e.preventDefault(); 
                    console.log('1')
                }
                
                //IE中阻止函数器默认动作的方式 
                else{

                    window.event.returnValue = false; 
                    console.log('2')
                }
                
                return false; 
            }