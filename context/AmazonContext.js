import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {

    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        Moralis,
        enableWeb3,
        user,
        isWeb3Enabled
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: userDataisLoading

    } = useMoralisQuery('assets')

    useEffect(() => {

        ; (async () => {

            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()

    }, [isAuthenticated, user, username])

    useEffect(() => {

        ; (async () => {

            if (isWeb3Enabled) {
                await getAssets()
            }
        })()


    }, [getAssets, isWeb3Enabled])



    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname) //adds another coloumn nickname into the users collection (DB)
                user.save()
                setNickname('')
            }
            else {
                console.log('Cant set empty nickname')
            }
        }
        else {
            console.log("No user connected")
        }
    }

    const getAssets = async () => {
        try {
            await enableWeb3()
            setAssets(assetsData);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername,
                assets
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}