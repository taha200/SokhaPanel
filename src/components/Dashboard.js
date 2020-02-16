import React, { Component } from 'react'
import './admin.css'
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import firebase from "firebase"
import { ClipLoader ,CircleLoader } from 'react-spinners';
import { Table,Card,CardImg,CardBody,CardText,CardTitle,CardSubtitle,Button } from 'reactstrap';
export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading: true,
      adminName: "",
      SubEmail: "",
      subPasswrd: "",
      admins: [],
      LoginName: "",
      modal: false,
    
      users: 0,
      categories: 0,
      listings: 0,
      sales: 0,
      best:[],
      lastweekEarning:0,
      totalEarning:0 ,
      totalOrders:0,
      lastWeekOrders:0

    }


    // this.fetchAdminPass = this.fetchAdminPass.bind(this);
  }
 

  componentDidMount() {
  
   var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
      // this.fetchAdminPass()
      fetch("https://desolate-hamlet-64216.herokuapp.com/api/helloAdmin").then(res => res.json())
      .then(dat => {
        console.log(dat)
        const arr=dat.doc.best
        this.setState({
          best:arr,
          lastweekEarning:dat.doc.earning[0].weekTotal,
          totalEarning:dat.doc.earning[0].total,
          totalOrders: dat.doc.activity[0].total,
          lastWeekOrders:dat.doc.activity[0].weekTotal
        })
      }).catch((err) => {
        console.log(err)
       
      })
    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
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
 
  
  render() {
    const style = {
      "margin": "auto",
      
      "width": "50%",
    }
     
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
    return (
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
                  <a className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
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
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-warning">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em",color:'white' }}>
Rs.{this.state.lastweekEarning}
</div>
                        <div className="text-center" style={{color:'white'}}> Last Week Earning
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-success">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em" ,color:'white'}}>
           Rs.{this.state.totalEarning}
</div>
                        <div className="text-center" style={{color:'white'}}>Total Earning
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-primary">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em",color:'white' }}>
            {this.state.lastWeekOrders}
</div>
                        <div className="text-center" style={{color:'white'}}>Last Week Orders
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-info">
                    <div className="row">
  
                      <div className="col-md-12" style={{ "color": "blue",alignItems:'center' }}>
                        <div className="text-center" style={{ "fontSize": "2em" ,color:'white'}}>
           {this.state.totalOrders}
</div>
                        <div className="text-center" style={{color:'white'}}> Total Orders
                         </div>
                         
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
            <h1  style={{color:'white',borderTopColor:'white',borderTopWidth:2,paddingTop:10}}>Best Taskers</h1>
            <div className='row'>
              {this.state.best.length > 0 && this.state.best.map((item)=>{
              return   <div className='col-md-4'>
                 <Card>
           <CardImg top style={{width:'100%',height:200}} src={item.profilePic} alt="Card image cap" />
           <CardBody>
             <CardTitle>{item.fName}</CardTitle>
             <CardText>{item.city}</CardText>
             <CardText>{item.mobile}</CardText>

           </CardBody>
         </Card>
              
                 </div>
              })}
            
             
            </div>
            
        </div>
       
      </div>
      </div>
    )
  }
}
