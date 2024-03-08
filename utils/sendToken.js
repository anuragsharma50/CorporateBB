import jwt from "jsonwebtoken";

export const sendToken = (user,res,statusCode) => {
    const token = jwt.sign({userId:user._id,admin:user.admin},process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        })
    
    const cookieOptions = {
        expires: new Date( Date.now() + 24*60*60*1000 ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token",token,cookieOptions);
    // res.render('home');
}
