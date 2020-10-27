# LineUp
How to create release apk?
1. ionic cordova build android --release   
-genkey -v -keystore my-release-key.keystore -a2. keytool lias alias_name -keyalg RSA -keysize 2048 -validity 10000
3. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
4. zipalign -v 4 app-release-unsigned.apk LineUp.apk

