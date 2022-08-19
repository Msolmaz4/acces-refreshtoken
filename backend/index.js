const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const users = [
  {
    id: 1,
    username: "ali",
    password: "2111",
    isAdmin: true,
  },
  {
    id: 2,
    username: "asa",
    password: "1111",
    isAdmin: true,
  },
];

let refreshToken=[]

app.post('/api/refresh',(req,res)=>{
     // refresh token olusturtduk
    const refreshToken = req.body.token

    if(!refreshToken) return res.status.apply(401).json('are zou not auathen')
    if(!refreshTokens.includes(refreshToken)){

        return res.status(403).json('refresh token weg')
    }
    jwt.verify(refreshToken, "myRefreshsecret",(err,user)=>{
        err && console.log(err)
        refreshToken =refreshTokens.filter((token)=> token !== refreshToken)
    })

})

const generateAccessToken = (user)=>{
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin},
    "mysecret",
    //sure ayarlanmasi
    {expiresIn:'20s'})
}
const generateRefreshToken= (user)=>{
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
    "myRefreshsecret",
    //sure ayarlanmasi
    {expiresIn:'20s'})
}



app.post("/api/login", (req, res) => {
  //gelemni req body yukleriy
  const { username, password } = req.body;
  //bunu postmandeb gorduk calisip calimadigini g;rmek icin ama ustedkini yoruma liariy
  //res.json('hallo')
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    //ilk once res.send le kontrol zaptiim
    // res.send(user)
    /* 
       localhost:8000/api/login postmande girinnde 
       {
    "username": "asa",
    "password": "1111"
} donus olarak bu gelir
       {
            "id": 2,
            "username": "asa",
            "password": "1111",
            "isAdmin": false
        }*/

    //token olusrutacagiy gennellikle accesToken yayilir
   const accessToken = generateAccessToken(user)
   const refreshToken = generateRefreshToken(user)
   refreshTokens.push(refreshToken)

  
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accesToken,

      /* post body raw  json ayarlar
        {
    "username": "asa",
    "password": "1111"
}
        {
    "username": "asa",
    "isAdmin": false,
    "accesToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2MDkwMjE2MH0.hnIHMan7z_eUyYhkAqFq3CXrKVotvhGWFZFtqmRIwbE"
}
        
        */
    });

    
  } else {
    res.status(404).json("biur kontrol");
  }
});

// OGRULAMA ZAPARIZ
//authorization icinde bir duzenleme zaptim type barert token yaptim
//authorization zaydik ama postamden key kisminda bunu zaydik logon deki token al bearer zay rasinda bir bosluk 
//koy ve tokeni yapistirir
//ilk siradaki tokeni secer const token =authHeader.split('')[1]

const verify = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        // split (' ') arasinda bir bosluk koy poastmande 
        const token =authHeader.split(' ')[1]
        jwt.verify(token, "mysecret",
        (err,user)=>{
            if(err){
                return res.status(403).json('token ...weg')
            }
            req.user= user
            next()
        }
        
        )
    
    }else{
        res.status(401).json('you are not authenticated')
    }
}

//burada delete verify bakiyoruz
//
app.delete('/api/users/:userId',verify,(req,res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin ){
        res.status(200).json('user losen')
    }else{
        res.status(403).json('von mir aus')
    }
 

})

app.listen(8000, () => {
  console.log("port 8000");
});
