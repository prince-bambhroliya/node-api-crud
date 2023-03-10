const axios = require('axios')


exports.homeRoutes= (req,res) => {
    //make a request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function (response) {
        // console.log(response.data);
        res.render('index',{users:response.data})
    })
    .catch((err) => {
        res.send(err);
      });
}
exports.add_user= (req,res) => {
    res.render('add_user')
}

exports.update_user= (req,res) => {
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userData) {
        // console.log(response.data);
        res.render('update_user',{user:userData.data})
    })
    .catch((err) => {
        res.send(err);
      });
}
// exports.get_data = () => {

// }
// exports.get_data = (req,res) => {
//   try {
//    const userData=  UserDb.find()
//   const newData = {
//     users : userData
//   }   
//   const filePathName = path.resolve(__dirname,'../../views/getData.ejs')

//   const htmlString = fs.readFileSync(filePathName).toString()

//   const ejsData = ejs.render(htmlString,newData)

//   let option = {
//     format : 'Letter'
//   }

//   pdf.create(ejsData,option).toFile('users.pdf', (err,response) => {
//     if(err){
//       console.log("pdf wrong!!!");
//     }
//     else{
//       console.log('file generated');
//     }
//   } )


//   } catch (error) {
//     console.log("something went to wrong!!");
//   }
// }