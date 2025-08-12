import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchedQuery } = useSelector(store => store.job);
    const { User } = useSelector(store => store.auth); // ✅ Check login

    useEffect(() => {
        // ✅ If user is not logged in, redirect to login
        if (!User) {
            navigate("/login");
            return;
        }

        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, User, dispatch, navigate]);
};

export default useGetAllJobs;
