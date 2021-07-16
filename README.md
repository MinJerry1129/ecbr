

### comandos

#### Para listar os emuladores
```bash
emulator -list-avds
```
#### Para abrir o emaulador por linha de comando
```bash
emulator -no-snapshot -avd "nome_emulator"
```

#### Procedimento quando tiver bug
```bash
rm -rf node_modules
rm yarn.lock
yarn install
cd ./android
sudo chmod 755 ./gradlew
./gradlew clean
cd ..
npx jetify


yarn android
yarn start
```

## Ocorrendo error na Build Android remover as seguintes pastas
`android\app\src\main\res\draw**`
`android\app\src\main\res\raw**`


####
```bash
chmod 755 android/gradlew
```
#### Para rodar o projeto
```bash
yarn android
yarn start
```

## Gerando build APK
`./gradlew assembleRelease`

`https://blog.rocketseat.com.br/reduzindo-o-tamanho-das-builds-para-android-no-react-native/`

## Install IOS Permission - Config
`https://github.com/react-native-community/react-native-permissions`

## GeoLocation
`https://reactnative.dev/docs/geolocation.html`

## Imput Mask
`https://github.com/react-native-community/react-native-text-input-mask`


### comands create tag
git tag
git tag -a v1.4 -m "my version 1.4"
git push origin --tags
