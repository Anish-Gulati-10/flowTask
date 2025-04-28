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



export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      })
      const { token, username } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("username", JSON.stringify(username))
      dispatch(login({ token, username }))
      navigate("/boards")
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Login failed. Try again.");
    }
  }


  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="lg:border-0 lg:shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-1.5">Login to Flow Task <img src={logoFilled} alt="Flow Task" className="h-6"/></CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
