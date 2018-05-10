# eContract

Fillimisht hapni ne dekstop git bash dhe shkruani komanden:
```
git clone https://github.com/diellzacunaj/eContract.git
```
Pasi qe te pefundoj klonimi, shkoni ne folderin contract-api me komandat:
```
cd eContract
```

Per te instaluar node modules vazhdoni me komanden:
```
npm install
```

Pas instalimit te moduleve,beni mongon run :
```
mongod
```
Per te pasur mundesi te shtoni dhe editoni kontratat duhet te jeni te regjistruar si user
Per te u regjistruar,hapni  Windows PowerShell ndiqni komandat :
```
1. mongo
2. use publicContracts
3. db.user.insert({name:"Tech",lastname:"Tech",email:"info@techstitution.com",password:"tech123",phoneNumber:"+38349123456"});
```
Ne nje terminal tjeter ,startoni serverin:

```
npm start
```

Pas startimit te serverit ,tani mund te hapni  http://localhost:3000/
