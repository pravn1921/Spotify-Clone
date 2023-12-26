"use client";

import Button from "@/components/Button";
import SubscribeModal from "@/components/SubscribeModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try{
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if(error){
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }

    return(
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan.</p>
                    <Button
                    onClick={subscribeModal.onOpen}
                    className="w-[300px]"
                    >
                        Subscribe
                    </Button>
                </div>
            )}
            {subscription &&(
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are currently a <b>Spotify Premium </b>user. 
                    </p>
                    <Button
                    disabled={loading || isLoading}
                    onClick={redirectToCustomerPortal}
                    className="w-[300px]"
                    >
                        Customer portal
                    </Button>
                    <div className="px-3 py-4">
                     <p className="text-lg"><b>Subscription Features:</b></p>
                     <ul className="px-5 py-4 list-disc flex flex-col gap-y-2">
                       <li>
                        Spotify Premium user can add new songs.
                       </li>
                       <li>
                        Added songs can be enjoyed globaly. 
                       </li>
                      </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountContent;