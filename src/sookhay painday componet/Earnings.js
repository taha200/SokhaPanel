import React, { Component } from 'react'
import "./pure.css"
import { Link } from 'react-router-dom';
// First way to import
import { CircleLoader } from 'react-spinners';
import { Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader-spinner'

export default class Earnings  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: 0,
      users: [],
      pageNum: 1,
      userview: {},
      count: 0,
      searchVal: "",
      loading: true,
      loading1: true,
      searching: false,
      modal: false,
      modelShippingData : [],
      modelActivity: [],
      modelActivityData: [],
      customer:[],
      visible:true,
      error:false,
      renderPage:false
    }
 

    this.handleIncriment = this.handleIncriment.bind(this)
    this.handleDecriment = this.handleDecriment.bind(this)
 
    this.Check = this.Check.bind(this)
  }

  Check = (e,uid) => {
   
        confirmAlert({
          title: 'Confirm Delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
               this.handleDelete(e,uid)
              }
            },
            {
              label: 'No',
              onClick: () => console.log("nothing happend")
            }
          ]
        });
      };


 

  
  async componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/getAllEarnings"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
     console.log(dat)
     this.setState({
         customer:dat.docs,
         pages:dat.pages,
         visible:false,
         renderPage:true
     })

    }).catch(() => {
this.setState({
  visible:false,
  error:true
})     
    })
    // var user = JSON.parse(localStorage.getItem('user'));
    // let loginperson = user.Name
    // let islogin = user.login

    // if (islogin === 1) {
    //   this.setState({
    //     LoginName: loginperson
    //   })
    //   this.fetchData()
    // }
   
  }
  else {
    alert("User Must Login First")
    this.props.history.push("/")
  }
  }
  fatchData(){
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/getAllEarnings"+this.state.pageNum,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(dat => {
     console.log(dat)
     this.setState({
         customer:dat.docs
     })

    }).catch(() => {
      alert("User Not found")
     
    })
  }
  handleIncriment() {
    let Page = this.state.pageNum + 1
    if (Page <= this.state.pages) {
      this.setState({
        loading: true,
        pageNum: Page,
        count: this.state.count + 20
      }, () => {
        this.fatchData()
      })
    }

  }

  
 
  handleDecriment(e) {
    let CurrntPage = this.state.pageNum
    if (CurrntPage > 1) {
      let Page = this.state.pageNum - 1
      this.setState({
        loading: true,
        pageNum: Page,

        count: this.state.count - 8
      }, () => {
        this.fatchData()

      })
    }
  }

 


  

 



  




  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }

  blockUser(e,uid){
    const data={
      firebaseUID:uid
    }
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/blockUser",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json())
    .then(data => {
      this.fatchData()
    
    }).catch(() => {
      alert("User Not Deleted")
      this.fatchData()
    })
  }
  unblockUser(e,uid){
    const data={
      firebaseUID:uid
    }
    fetch("https://desolate-hamlet-64216.herokuapp.com/api/unblockUser",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
        }).then(res => res.json())
    .then(data => {
      this.fatchData()
    
    }).catch(() => {
      alert("User Not Deleted")
      this.fatchData()
    })
  }
  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    })
   
  }
onSearchUser(e){
  e.preventDefault()
   const data={
   name:this.state.searchVal
 }
  fetch("https://desolate-hamlet-64216.herokuapp.com/api/searchUsers",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(data)
  }).then(res => res.json())
  .then(dat => {
    if(dat.length>0){
     console.log(dat)
       this.setState({
         customer:dat,
         searchVal:''
       })
      }
      else{
        alert("User Not found")
        this.setState({
          searchVal:''
        })
}
  }).catch(() => {
    alert("User Not found")
   
  })
}

  render() {
    const { count } = this.state;
    const style = {
      "margin": "auto",
      "width": "50%",


    }
    return (
      <div>
      {this.state.visible && <div className="d-flex justify-content-center" style={{marginTop:'20%',marginLeft:'2%'}}>
      <Loader
type="Rings"
color="white"
height="100"
width="100"
/>
</div>}
{this.state.renderPage && 
  <div>
        {/* navigation */}
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="container-fluid">
          <h3 style={{"color": "white"}}><b>Admin Panel Sookhay Painday</b></h3>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">

                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                    {this.state.LoginName}
                  </a>
                  <div className="dropdown-menu">

                    <button onClick={this.handleLogout.bind(this)} className="dropdown-item" > <i className="fas fa-sign-out-alt"></i> Logout</button>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div className="container-fluid row">
        <div style={{"paddingBottom": 50}} className="col-md-3 ">
        <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> <b> Dashboard </b></li></Link>
        </li>
        <li className="nav-item">
          <a href="#new1" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b>Menu</b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse"  id="new1" style={{ "listStyle": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/TaskerList" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Tasker List
          </li>
            </Link>


           
            <Link to="/Earnings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i>Earnings
      </li>
            </Link>
            <Link to="/TaskerCity" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i>Search By City
  </li>
            </Link>
            <Link to="/CustomerList" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i>Customer List
</li>
          </Link>


          </ul>
        </li>
        {/* <li className="nav-item">
          <a href="#new2" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Mi Consignacion </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse" id="new2" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/MiUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
          </li>
            </Link>


            <Link to="/MiSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i>  Detalles de venta
          </li>
            </Link>
            <Link to="/MiListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
      </li>
            </Link>
            <Link to="/MiCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
  </li>
            </Link>
            <Link to="/MiReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
          </Link>
          <Link to="/MiListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i>  Listado de informes
      </li>
          </Link>

          </ul>
        </li>
        */}


      </ul> </div>
          <br />
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header"><b>Earning Details By Tasker</b></div>
                  <div className="card-body">
                    <div className="row">


                    <div className="card-body">
                        <form className="card">
                          <div className="input-group">
                            <input type="search"  value={this.state.searchVal} onChange={(e)=>this.handleChange(e)} className="form-control" placeholder="Search User Name" />
                            {this.state.searching === true && <div className="input-group-btn">
                              <button style={{ "margin": 5 }} className="btn btn-default"><i className="fas fa-times"></i></button>
                            </div>}
                            <div className="input-group-btn">
                              <button className="btn btn-danger" onClick={(e)=>this.onSearchUser(e)}><i className="fa fa-search"></i> Search </button>
                        
                            </div>
                          </div>
                        </form>
                      </div>
                      <br />

                      <div className="container">
                        {this.state.searching === false && <div className="row">
                          <div className="col-sm">
                            <button style={{ "float": "left", "marginRight": 20 }} onClick={this.handleDecriment} type="button" className="btn btn-primary"> <i className="fa fa-angle-double-left" aria-hidden="true">  Previous </i> </button>
                          </div>
                          <div className="col-sm">
                            <p style={{ "textAlign": "center" }}>   Page : {this.state.pageNum} / {this.state.pages} </p>
                          </div>
                          <div className="col-sm">
                            <button style={{ "float": "right" }} onClick={this.handleIncriment} type="button" className="btn btn-primary"> Next <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                          </div>





                        </div>
                        }
                      </div>


                      <div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} className="table-responsive">

                        
                      
                <div><table className="table table-hover">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Total Earnings</th>
                              <th>Last Week Earning</th>
                              <th>Paid</th>

                              <th></th>
                            </tr>
                          </thead>

                          {this.state.customer && <tbody >


                            {this.state.customer.length > 0 && this.state.customer.map((user, index) => {

                              return (
                                <tr key={index}>
                                  <td>{count + index + 1}</td>
                               
                                  <td>{user.userdata.fName}</td>
                                  <td>{user.earning.totalEarned}</td>
                                  <td>{user.earning.lastWeekEarning}</td>
                                    <td>
                                      {(user.activity.paid)?
                                      <img src="https://img.icons8.com/offices/30/000000/paid.png" />
                                      :
                                      <img src="https://img.icons8.com/cute-clipart/64/000000/delete-sign.png" style={{width:50,height:50}}></img>
                                      }
                                      </td>
                                 

                                  <td >
                                    {(user.userdata.status)?
                                                                      <button style={{ "margin": 5, "fontSize": 15 }}onClick={(e) => this.blockUser(e, user.userdata.firebaseUID)}  className="btn btn-danger" >Block</button>
:                                    <button style={{ "margin": 5, "fontSize": 15 }} onClick={(e) => this.unblockUser(e, user.userdata.firebaseUID)} className="btn btn-success" >Un Block</button>


                                  }
                                  
                                  </td>
                               
                                </tr>
                              )
                            }
                            )}

                          </tbody>}
                        </table> </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          <h2 style={{"textAlign": "center", "fontFamily": "Times"}}> <b>User Information</b></h2>
          </ModalHeader>

          <ModalBody style={{ "fontFamily": "monospace" }}>
            {this.state.loading1 &&
              <div className='sweet-loading'>
                <CircleLoader
                  css={style}
                  sizeUnit={"px"}
                  size={100}
                  color={'#2fbb9f'}
                  loading={this.state.loading1}
                />
              </div>}
            {this.state.loading1 === false && <div >
              <h2 style={{"textAlign": "center", "fontFamily": "Allerta"}}>Shipping Info</h2>
              <h3>Tittle : {this.state.modelShippingData.title}</h3>       
              <h4>Domestic Service : {this.state.modelShippingData.domesticService}</h4>       
              <h4>International Service : {this.state.modelShippingData.internationalService}</h4>       
              <p>Description : {this.state.modelShippingData.description}</p>

              <hr/>

              <h2 style={{"textAlign": "center", "fontFamily": "Allerta"}}>Activity Info</h2>    
              <h4>On Sale Items : {this.state.modelActivityData.onSale.length}</h4>       
              <h4>Total Orders : {this.state.modelActivityData.Orders.length}</h4>       
             <h4> Favorites : {this.state.modelActivityData.Favorites.length}</h4>
            </div>}
          </ModalBody>
          <ModalFooter>

          </ModalFooter>

        </Modal>

      </div>
}
{this.state.error && <p className="d-flex justify-content-center" style={{marginTop:'20%',marginLeft:'2%'}} >Reload Page Internet Connection Is Slow</p>}
</div>
    
    )
  }
}
