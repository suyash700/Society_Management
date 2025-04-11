import React, { useEffect,useState } from 'react'


const Residents = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    // const {authorizationToken}=useAuth();
    const [users, setUsers] = useState([])
    const getAllUsersData =async () => {

       
     try {
        const response = await fetch("http://localhost:4000/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
        }); 
        const data = await response.json();
        console.log(`users :${data}`);
        setUsers(data)
     } catch (error) {
        console.log(error);
        
     }
    };
//delete user
    const deleteUser = async (id) =>
    {
        try {
            const response = await fetch(`http://localhost:4000/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                
        });
        const data = await response.json();
        console.log(`users AFTER DELETE :${data}`);

        //no refresh needed
        if(response.ok){
            getAllUsersData();
        }

        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect(() =>{
        getAllUsersData();

    },[]) 

  return (
    //<h2 key={index}>{currUser.name}</h2>
    <div>
        <section className='admin-users-section'>
            <div className='container'>
                <header>Admin : ALL USER DATA</header>
                </div> 
        <div className='container admin-users'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Update </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((currUser,index) => {
                      
           return   <tr key={index}>
                      <td>{currUser.name}</td>
                      <td>{currUser.email}</td>
                      <td>
                        {/* <Link to ={`/admin/users/${currUser._id}/edit`}>Edit</Link> */}
                      </td>
                      <td><button onClick={()=> deleteUser(currUser._id)}>Delete</button></td>
                      {/* <td>currUser.name</td> */}
                    </tr>
                    })}
                </tbody>
            </table>
       
        </div>
        </section>

    </div>
  )
}

export default Residents