

const Login=()=>{
    return(
        <div>

<main className="form-signin w-100 m-auto">

 
<form>
  <div className="form-floating">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ></input>
  <label for="floatingInput"> Email</label>
  </div>
  <div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
  <label for="floatingPassword">Password</label>
  </div>
  <button className="w-100 btn btn-lg btn-primary" type="submit" > signip</button>
</form>
</main>



        </div>
    )
}

export default Login