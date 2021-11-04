
# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long
from app import *

#################################################################################
##       Function: signup
##       Description: Post request to register a new user, will give error if user is already
##                    registered
##       Inputs:
##           - NA
##       Outputs:
##           - message: output if user is registered successful or not
#################################################################################
@app.route("/signup", methods=['POST'])
def signup():
    user = request.form.get("fullname")
    email = request.form.get("email")
    password = request.form.get("password")
    user_found = records.find_one({"name": user})
    email_found = records.find_one({"email": email})
    if user_found or email_found:
        errorDict = {
                    "code": 409,
                    "message":"This email already is already registered.",
                    "email":email
                }
        message = json.dumps(errorDict)
        return message

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_input = {'name': user, 'email': email, 'password': hashed}
    records.insert_one(user_input)
    errorDict = {
                    "code": 200,
                    "message":"Registration Successful"
                }
    message = json.dumps(errorDict)
    return message

#################################################################################
##       Function: logged_in
##       Description: Checks if there is a session
##       Inputs:
##           - NA
##       Outputs:
##           - Sends a valid message or redirects to login url
#################################################################################
@app.route('/logged_in')
def logged_in():
    print(session)
    if "email" in session:
        email = session["email"]
        name = session["name"]
        loggedinDict = {
                    "code": 200,
                    "email":email,
                    "name":name
                }
        message = json.dumps(loggedinDict)
        return message
    else:
        return redirect(url_for("login"))

#################################################################################
##       Function: login
##       Description: Checks if user and email is in database to login
##       Inputs:
##           - NA
##       Outputs:
##           - Returns valid or invalid message if user can login
#################################################################################
@app.route("/login", methods=["POST", "GET"])
def login():
    message = 'Please login to your account'

    if request.method == "POST":
        email = request.form.get("email")
        print(email, flush=True)
        password = request.form.get("password")

        email_found = records.find_one({"email": email})
        if email_found:
            email_val = email_found['email']
            passwordcheck = email_found['password']
            name = email_found['name']

            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["email"] = email_val
                session["name"] = name
                return redirect(url_for('logged_in'))
            else:
                if "email" in session:
                    return redirect(url_for("logged_in"))
                errorDict = {
                    "code": 403,
                    "message":"Password is incorrect"
                }
                message = json.dumps(errorDict)
                return message
        else:
            errorDict = {
                "code": 403,
                "message":"We are unable to find a user with that email. Please double check you entered your email correctly"
            }
            message = json.dumps(errorDict)
            return message
    loggedinDict = {
                    "code": 200,
                    "message":"Sucessfully Logged In"
                    }
    message = json.dumps(loggedinDict)
    return message

#################################################################################
##       Function: logout
##       Description: Checks if user is in session and removes them from it
##       Inputs:
##           - NA
##       Outputs:
##           - Successful or Unsuccessful Message
#################################################################################
@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "email" in session:
        session.pop("email", None)
        return "Logout Successful"
    else:
        return "Logout Successful"
