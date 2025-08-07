import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, User } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import ApplicationTable from './AppliedJobTable'
import  UpdateProfileDialog  from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isHaveResume = true;
//const skills = ["html", "Css", "Javascript", "reactjs"];

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const {User} = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24" >
                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{User?.fullname}</h1>
                            <p > {User?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className='h-4 w-4' />
                        <span>{User?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className='h-4 w-4' />
                        <span>{User?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='my-2 font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>

                        {
                            User?.profile?.skills.length !== 0 ? User?.profile?.skills?.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isHaveResume ? <a target='blank' href={User?.profile?.resume} className='w-full text-blue-500 hover:underline cursor-pointer'> {User?.profile?.resumeOriginalName} </a> : <span>NA</span>
                    }
                </div>

                {/* <UpdateProfileDialog open={open} setOpen={setOpen} /> */}
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-lg font-bold my-5'>Applied Jobs</h1>
                <ApplicationTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile