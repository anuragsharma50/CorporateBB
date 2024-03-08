import jwt from "jsonwebtoken";

export const auth = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.redirect('/employee/login');
    }

    const {userId,admin} = await jwt.verify(token,process.env.JWT_SECRET);
    req.admin = admin;
    req.userId = userId;
    res.locals.userId = userId
    res.locals.admin = admin;
    next();
}

export const adminAuth = async (req,res,next) => {
    if(!req.admin) {
        console.log('Access not allowed')
        // return res.redirect('/signin');
        return res.render('login',{error:"Access not allowed, you require admin access to perform this task"});
    }
    next();
}