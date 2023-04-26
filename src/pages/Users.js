import {CreateUserForm} from "../components/createUserForm"
import {BasicTable} from "../components/usersTabel"
import {ApiServices} from "../api/apiService"
import {useState ,useEffect} from "react"


export const Users = () =>{
    const [users, setUsers] = useState([])


    useEffect(() => {
        if(!users.length)
        console.log("help")
         new ApiServices().getUsers().then(res => {
            setUsers(res)
         })
    }, [])

    const updatePaid = async(user) => {
        const response = await new ApiServices().createUser(user)
        const usersUpdated = [...users].map(userState => {
            if(userState.id === response.id){
                userState.paid = response.paid
            }
            return userState
        })
        console.log(usersUpdated)
        setUsers(
          [...usersUpdated]
        )
    }

    const resetUsers = async () => {
        const usersReset = users.map(userState => {
            userState.paid = false
            return userState
        })
       const response =   await new ApiServices().createUsers({users : usersReset})

        setUsers([...usersReset])
    }

 const sendSms = async (ids) => {
        const response = await new ApiServices().sendSms({phones : ids})

        
}

return (
            <>
                    <CreateUserForm setUsers = {setUsers} users = {users}/>
                    <BasicTable data = {users} setUsers = {setUsers} sendSms = {sendSms} updatePaid = {updatePaid} resetUsers = {resetUsers}/>
                    </>

        )
}