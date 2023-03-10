const UserDb = require("../model/model");
//pdf get data require 
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

// exports.create = (req,res) => {
//     //validate request
//     if(!req.body){
//         res.status(400).send({message:"Content can not be empty!!"})
//         return;
//     }
//     //new user
//     const user = new UserDb({
//         name:req.body.name,
//         email:req.body.email,
//         gender:req.body.gender,
//         status:req.body.status,
//     })
//     console.log(user);
//     //save user in database

//     user
//     .save(user)
//     .than(data => {
//         res.send(data)
//         console.log(data);
//     })
//     .catch( (error) => {
//         res.status(500).send({
//             message:error.message || "Some problem"
//         })
//     })
// }

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new user
  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};
exports.find = (req, res) => {
  if(req.query.id){
    const id = req.query.id
    UserDb.findById(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({
            message:"User not Found!!"
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ Message: err.message || "Cloud not find the user" });
    });

  }else {

    UserDb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send("Cloud not find the data" );
      });
  }

};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to update can not be empty!" });
    return;
  }
  const id = req.params.id;
  UserDb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({
            message: `Cannot Update user with ${id}.Maybe user not Found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ Message: err.message || "Error when Data updated!!" });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  UserDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Delete with id ${id}.Maybe id is Wrong!!!`,
          });
      } else {
        res.send({
          message: "User was deleted successfully!!!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ Message: err.message || "Could not deleted !!" });
    });
};

// exports.get_data = (req,res) => {
//   try {
//    const userData=  UserDb.find()
//   const newData = {
//     users : userData
//   }   
//   const filePathName = path.resolve(__dirname,'../../views/getData.ejs')

//   const htmlString = fs.readFileSync(filePathName).toString()

//   const ejsData = ejs.render(htmlString,userData)

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