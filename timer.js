/**
 * @fileoverview 使用requestAnimationFrame重写setInterval和setTimeout
 */
( function(){

	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
	for( var x = 0; x < vendors.length; ++x ) {
	    window.requestAnimationFrame = 
	    	window[ vendors[ x ] + 'RequestAnimationFrame' ];
	    window.cancelRequestAnimationFrame = 
	    	window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if( window.requestAnimationFrame ) {
	    window.setInterval = ( function() {
	        var list = [],
	            executer = function( now ){
	                for( var i = 0, len = list.length; i < len; i++ ){
	                    var c = list[ i ];

	                    if( now - c.lastFrame >= c.interval ) {
	                        c.lastFrame = now;
	                        c.callback();
	                    }
	                }
	                timer.__id = window.requestAnimationFrame( executer );
	            },
	            timer = function( callback, interval ) {
	                if( !callback ){
	                    return;
	                }

	                var now = ( new Date() ).getTime(),
	                    // 生成timer ID
	                    id =  now + '_' + Math.random();

	                list.push(
	                    {
	                        id: id,
	                        callback: callback,
	                        lastFrame: now,
	                        interval: interval
	                    }
	                );

	                if( !timer.__id ) {
	                	executer( ( new Date() ).getTime() );
	                }

	                return id;
	            }

	        timer.__list = list;

	        return timer;
	    } )();

	    window.clearInterval = function( id ){
	        var list = window.setInterval.__list;
	        for( var i = 0, len = list.length; i < len; i++ ){
	            var c = list[ i ];

	            if( c.id == id ) {
	                list.splice( i, 1 );
	            }
	        }

	        if( !list.length ) {
	        	window.cancelAnimationFrame( window.setInterval.__id );
	        	window.setInterval.__id = null;
	        }
	    };

	    window.setTimeout = ( function() {
	        // callback数组
	        var list = [],
	            executer = function( now ){
	                for( var i = 0, len = list.length; i < len; i++ ){
	                    var c = list[ i ];

	                    if( now - c.lastFrame >= c.interval ) {
	                        c.callback();
	                        list.splice( i, 1 );
	                    }
	                }

			        if( !list.length ) {
			        	window.cancelAnimationFrame( window.setTimeout.__id );
			        	window.setTimeout.__id = null;
			        	return;
			        }

	                timer.__id = window.requestAnimationFrame( executer );
	            },
	            timer = function( callback, interval ) {
	                if( !callback ){
	                    return;
	                }

	                var now = ( new Date() ).getTime(),
	                    // 生成timer ID
	                    id =  now + '_' + Math.random();

	                list.push(
	                    {
	                        id: id,
	                        callback: callback,
	                        lastFrame: now,
	                        interval: interval
	                    }
	                );

	                if( !timer.__id ) {
	                	executer( ( new Date() ).getTime() );
	                }

	                return id;
	            }

	        timer.__list = list;

	        return timer;
	    } )();

	    window.clearTimeout = function( id ){
	        var list = window.setTimeout.__list;
	        for( var i = 0, len = list.length; i < len; i++ ){
	            var c = list[ i ];

	            if( c.id == id ) {
	                list.splice( i, 1 );
	            }
	        }

	        if( !list.length ) {
	        	window.cancelAnimationFrame( window.setTimeout.__id );
	        	window.setTimeout.__id = null;
	        }
	    };
	}
} )();