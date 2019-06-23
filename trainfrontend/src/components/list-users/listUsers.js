import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

import axios from "axios"

class ListUsers extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        axios.get("http://localhost:5000/user")
            .then((res) => {
                // console.log(res);
                this.setState({
                    users: res.data
                })
            })

    }

    render() {
        if (this.state.users) {
            console.log(this.state.users);
            return (
                this.state.users.map((user) =>

                    <span style={{ marginLeft: "60%" }} key={user._id}>
                        {/* <img src={user.userImg} /> */}
                        <p>{user.userName} </p>
                        <p>{user.nationalId} </p>

                        <img src={this.state.userImg} />

                    </span>
                )
            )
        }
        else {
            return <div>no data</div>
        }
    }
}
/* if (this.state.users) {
     console.log(this.state.users);
     return (
         this.state.users.map((user) =>
             <MDBCol style={{ marginLeft: "30%" }}>
                 <MDBCard key={user._id}> style={{ width: "22rem" }}>
             <MDBCardImage className="img-fluid" src={user.userImg} waves />
                     <MDBCardBody>
                         <MDBCardTitle>{user.userName} </MDBCardTitle>
                         <MDBCardText>
                             the user national ID is : {user.nationalId}
                         </MDBCardText>
                         <MDBBtn href="#">MDBBtn</MDBBtn>
                     </MDBCardBody>
                 </MDBCard>
             </MDBCol>
         )
     )
 }
}
}
// render() {

//         if (this.state.users) {
//             console.log(this.state.users);
//             return (
//                 <div style={{ marginLeft: "30%" }} >
//                     {
//                         this.state.users.map((user) =>
//                             <span key={user._id} className="card" style="width: 18rem;">
//                                 <img className="card-img-top" src={user.userImg} alt="Card image cap" />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{user.userName}</h5>
//                                     <p className="card-text">{user.nationalId}</p>
//                                     <a href="#" className="btn btn-primary">Go to his profile</a>
//                                 </div>
//                             </span>)
//                         /* <span key={user._id}> 

//                         <img src = {user.userImg}/> 
//                         <p>{user.userName} </p>
//                         <p>{user.nationalId} </p>      

//                           <img src={this.state.userImg}/>

//                         </span>
//                         ) */
//                     }
//                 </div>
//             )
//         }
//         else {
//             return <div>no data</div>
//         }
//     }
// }

export default ListUsers;