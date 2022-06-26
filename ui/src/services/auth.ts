

export let getTokenGAuth = async (code) => {   
    let res =  await fetch(`${import.meta.env.VITE_API_URL}/api/oauth/callback-gauth?code=${code}`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (res.status == 200)?await res.json():null;
}