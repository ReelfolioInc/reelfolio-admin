import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import {useRouter} from "next/router";


function LoginPage() {

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const emailOnChange = (e) => {
        setEmail(e.target.value);
    };

    const passwordOnChange = (e) => {
        setPassword(e.target.value);
    };

    const login = async () => {
        try{
             const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,{
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json());

            // Set access token in local storage
            localStorage.setItem("reelfolioAccessToken",loginResponse.accessToken)
            router.push("/");
        }catch (e) {
            console.error("Unable to login")
        }
    };


    return(
        <div className="login-page">
                <div className="login-content">
                    <Container maxWidth={"md"}>
                        <Typography variant={"h3"} component={"div"}><Box textAlign={"center"} fontWeight="fontWeightBold" mb={2}>ADMIN LOG IN</Box></Typography>
                        <Typography variant="body1" component="div"><Box textAlign={"center"}>Enter your email address and password</Box></Typography>

                        <form className="login-form">
                            <div className="fields-container">
                                <Input className="input-field" autoComplete="username" fullWidth type="email" required name="email" placeholder={"Email"} inputProps={{ 'aria-label': 'email' }} value={email} onChange={emailOnChange}/>
                                <Input className="input-field" autoComplete="current-password" fullWidth type="password" required name="password" placeholder={"********"} inputProps={{ 'aria-label': 'email' }} value={password} onChange={passwordOnChange}/>
                            </div>
                            <Button type="button" variant={"contained"} color={"primary"}  size={"large"} onClick={login}>Login</Button>
                            <Link color={"primary"} href="#"> <Typography variant="body1" component="div"><Box mt={2} textAlign={"center"}>Forgot password?</Box></Typography></Link>
                        </form>
                    </Container>
                </div>
                <div className="login-bottom">
                    <Container maxWidth={"md"}>
                        <Typography variant={"body1"} component={"div"}><Box textAlign={"center"}>New to Reelfolio?</Box></Typography>
                        <Link color={"primary"} href="#"> <Typography variant="body1" component="div"><Box mt={1} textAlign={"center"}>Sign up</Box></Typography></Link>
                    </Container>
                </div>
        </div>
    )
}

export default LoginPage;