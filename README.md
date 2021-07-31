# react-native-animation-flatlist-pexels
Repositorio + apk android con una animacion para flatlist, espero que te guste.

Puedes descargar el apk para ver el resultado final.

consideraciones:
* desinstale el modulo Jest para ligerar el apk-
* Instale el modulo: babel-plugin-transform-remove-console ( quita los logs en produccion, config. abajo )


/babel.config.js:

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};


*Hermes & proguard config.( revisar Documentacion en React Native, para optimizar el bundle apk final )

Tamaño final APK Android: 17Mb
Sin config.: 62Mb


INSTALACION DEL REPOSITORIO:
* cd app
*Run: 
npm install ( instalar todas las dependencias necesarias del proyecto )

