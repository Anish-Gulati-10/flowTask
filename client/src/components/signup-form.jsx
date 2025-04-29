import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/store/slices/authSlice"
import { logoFilled } from "@assets"
import axiosInstance from "@/utils/axiosInstance"



export function SignupForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long")
      setLoading(false)
      return
    }
    try {
      const response = await axiosInstance.post(`/auth/register`, {
        username,
        email,
        password,
      })
      console.log(response.data)
      const { username: user, token } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("username", JSON.stringify(user))
      dispatch(login({ token, user }))
      navigate("/boards")
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    (<div className={cn("flex flex-col gap-6 w-full items-center", className)} {...props}>
      <Card className="lg:w-[600px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-1.5">Create an account on Flow Task</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="harvey@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Harvey" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} required />
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
