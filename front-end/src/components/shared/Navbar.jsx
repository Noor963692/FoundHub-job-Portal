import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import React from 'react'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice"; // Assuming this is how you set user in redux
import { USER_API_END_POINT } from "@/utils/constant";


const Navbar = () => {
    //const User = true;
    const { User } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Found<span className='text-[#F83002]'>HUB</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            User && User.role === "recruiter" ? (
                                <>
                                    <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/"}>Home</Link></li>
                                    <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                                    <li className='hover:text-[#6A38C2] cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !User ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (


                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>

                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className="flex gap-2 space-y-2">
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{User?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{User?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 text-gray-600">
                                            {/* Profile Link */}
                                            {
                                                User && User.role === 'student' && (
                                                    <div className="flex items-center gap-2 cursor-pointer">
                                                        <span><User2 /></span>
                                                        <Button variant="link" asChild>
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }


                                            {/* Logout Button */}
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <span><LogOut /></span>
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        )
                    }


                </div>
            </div>
        </div>
    )
}
export default Navbar