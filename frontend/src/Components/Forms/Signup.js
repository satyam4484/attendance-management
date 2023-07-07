import React from "react";
import "../../assests/css/signup.css"

const Signup = () => {
    return (
        <div className="container">
            <h1>Signup</h1>
            <form action="" method="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="Enter your email" className="form-control" />
                </div>
                <div className="form-group">

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" placeholder="Enter your confirm password" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="submit" name="signup" value="Signup" className="btn btn-primary" />
                </div>
            Contact number
            email validation
            dropdown
                college
                teacher
                student
            
            </form>
        </div>
    )
}

export default Signup;