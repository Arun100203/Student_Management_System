const mysql = require("mysql");

// router.get('/',(req,res)=>{
//     res.render("home");
// });

const con = mysql.createPool({
    connectionLimit:10,
    host   : "localhost",
    user   : "root",
    password : "surya",
    database :"surya"
});

exports.view=(req,res)=>{
    con.getConnection((err,connecection)=>{
    if(err) throw err
    connecection.query("select * from users",(err,rows)=>{
        connecection.release();
        if(!err){
            
            res.render("home",{rows});
        }else{
            console.log("Error occur in connection"+err);
        }
    });
});
};

exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    con.getConnection((err,connecection)=>{
        if(err) throw err

        const {name,age,city} = req.body;
        connecection.query("insert into users (NAME,AGE,CITY) values (?,?,?)",[name,age,city],(err,rows)=>{
            connecection.release();
            if(!err){
                res.render("adduser",{msg:"Details are saved sucessfully!!..."});
            }else{
                console.log("Error occur in connection"+err);
            }
        });
    });
}

exports.edituser=(req,res)=>{
    con.getConnection((err,connecection)=>{
        if(err) throw err

        let id = req.params.id;
        
        connecection.query("select * from users where id=?",[id],(err,rows)=>{
            connecection.release();
            if(!err){
                
                res.render("edituser",{rows});
            }else{
                console.log("Error occur in connection"+err);
            }
        });
    });
}

exports.edit=(req,res)=>{
    con.getConnection((err,connecection)=>{
        if(err) throw err

        let {name,age,city}=req.body;
        let id = req.params.id;

        connecection.query("update users set NAME=?,AGE=?,CITY=? where id=?",[name,age,city,id],(err,rows)=>{
            connecection.release();
            if(!err){
                con.getConnection((err,connecection)=>{
                    if(err) throw err
            
                    let id = req.params.id;
                    
                    connecection.query("select * from users where id=?",[id],(err,rows)=>{
                        connecection.release();
                        if(!err){
                            
                            res.render("edituser",{rows,msg:"Details are edited sucessfully!!..."});
                        }else{
                            console.log("Error occur in connection"+err);
                        }
                    });
                });
                }else{
                console.log("Error occur in connection"+err);
            }
        });
    });
}

exports.delete=(req,res)=>{
    con.getConnection((err,connecection)=>{
        if(err) throw err

        let id = req.params.id;
        
        connecection.query("delete from users where id=?",[id],(err,rows)=>{
            connecection.release();
            if(!err){
                
                res.redirect("/");
            }else{
                console.log("Error occur in connection"+err);
            }
        });
    });
}


