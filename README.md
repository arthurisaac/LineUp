# LineUp
How to create release apk?
1. ionic cordova build android --release   
2. keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
3. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
4. zipalign -v 4 app-release-unsigned.apk LineUp.apk

