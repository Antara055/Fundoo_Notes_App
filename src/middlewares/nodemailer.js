import dotenv from 'dotenv';

dotenv.config("./.env");
import nodemailer from "nodemailer";
const Password=process.env.password_email

export const mailSend=(token)=>{
const transport=nodemailer.createTransport(
    {
        service: "gmail",
        auth:{
            user:"yashichow.sweet500.dgp14@gmail.com",
            pass:Password
        }
    }
)
const mailOption={
    from:"yashichow.sweet500.dgp14@gmail.com",
    to:"antara.chowdhury500@gmail.com",
    subject:"BridgeLabz:Pasword Reset",
    text: "Hello world?",
    html:`<h2 style="color:red">Reset your password by that link!</h2>
    <h5>Link :<a href="http://localhost:5000/resetPassword">click</a></h5>${token}`
}
return new Promise((resolve, reject) => {
    transport.sendMail(mailOption, (err, result) => {
        if (err) {
            return reject(err)
        }
        return resolve({token});
    });
});
}

/* transport.sendMail(mailOption)
    }
    catch(error){
        next(error)
    }
} */