//importacion
importScripts('js/sw-utils.js');

const STATIC_CHACHE= 'static-v1';
const DYNAMIC_CHACHE= 'dinamic-v1';
const INMUTABLE_CHACHE= 'inmutable-v1';

const APP_SHELL = [
	// '/',
	'index.html',
	'css/style.css',
	'img/favicon.ico',
	'img/avatars/1.png',
	'img/avatars/2.jpg',
	'img/avatars/5.jpg',
	'img/avatars/6.jpg',
	'img/avatars/7.jpg',
	'img/avatars/3.jpg',
	'js/app.js',
	'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
	'https://fonts.googleapis.com/css?family=Quicksand:300,400',
	'https://fonts.googleapis.com/css?family=Lato:400,300',
	'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
	'css/animate.css',
	'js/libs/jquery.js'
];

self.addEventListener('install', e =>{
	const cacheStatic = caches.open( STATIC_CHACHE ).then(cache =>
		cache.addAll(APP_SHELL));

	const cacheInmutable = caches.open( INMUTABLE_CHACHE ).then(cache =>
		cache.addAll(APP_SHELL_INMUTABLE));

	e.waitUntil( Promise.all([cacheStatic, cacheInmutable ]) );
});

self.addEventListener('active', e =>{
	const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            // static-v4
            if (  key !== STATIC_CHACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });
    e.waitUntil( respuesta );
});

const respuesta = self.addEventListener('fetch', e =>{
	caches.match( e.request ).then( resp =>{
		if(res){
			return res;
		}else{
			return fecth( e.request ).then(resp =>{
				return actualizaCacheDinamico( DYNAMIC_CHACHE, e.request, newRes );
			});
			
		}
		
	});
	e.respondWith(respuesta);
});