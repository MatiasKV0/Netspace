import jwt from 'jsonwebtoken'

const generarJWT = (user)=>{
    console.log(user)
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

export default generarJWT;