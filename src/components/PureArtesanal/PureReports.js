import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./pure.css";
import { CircleLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class PureReports extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    // this.handleReset = this.handleReset.bind(this);
    this.fetchData = this.fetchData.bind(this);
    // this.handleModel = this.handleModel.bind(this)
    // this.toggle = this.toggle.bind(this);
    // this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleDeleteSales = this.handleDeleteSales.bind(this)
    this.Check = this.Check.bind(this)

  }
  handleLogout() {
    let user = {
      Name: "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")

  }
  Check = (id) => {
  
        confirmAlert({
          title: 'Confirm Delete',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                this.handleDeleteSales(id)
              }
            },
            {
              label: 'No',
              onClick: () => console.log("nothing happend")
            }
          ]
        });
      };
    
async  handleDeleteSales(id) {

   
    let Data = {
      id: id
    }

  
    await fetch("https://artisanbackend.herokuapp.com/api/DeleteReport", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Data)
    })
      .then(res => res.json())
      .then(data => {
       this.fetchData()
      })
      .catch(err => console.error(err));


  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login

    if (islogin === 1) {
      this.setState({
        LoginName: loginperson
      })
      this.fetchData()

    }
    else {
      alert("User Must Login First")
      this.props.history.push("/")
    }
  }
  async fetchData() {

    const response = await fetch("https://artisanbackend.herokuapp.com/api/getReports",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
    const json = await response.json();
    

    this.setState({
      Reports: json.docs,
      loading: false

    })
  }
  render() {
    const style = {
      "margin": "auto",
      "width": "50%",
    }
    return (
      <div>
        {/* navigation */}
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="container-fluid">
            <h3 style={{ "color": "white" }}><b>Admin Panel</b></h3>
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
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> My Consignment </b>  <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse"  id="new1" style={{ "listStyle": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/MyUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/MySales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/MyListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/MyCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/MyReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/MyListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
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
        <li className="nav-item">
          <a href="#new3" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Pure Artisan</b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li></a>
          <ul className="collapse" id="new3" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureUsers" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> User Details
          </li>
            </Link>


            <Link to="/PureSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Sale Details
          </li>
            </Link>
            <Link to="/PureListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listing
      </li>
            </Link>
            <Link to="/PureCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Categories
  </li>
            </Link>
            <Link to="/PureReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Reports
</li>
          </Link>
          <Link to="/PureListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listing Reports
</li>
          </Link>

          </ul>
        </li>
        <li className="nav-item">
          <a href="#new4" data-toggle="collapse">
            <li className="list-group-item bg-light "><i className="fa fa-list" aria-hidden="true"></i> <b> Puro Artesanal </b> <i style={{"float": "right"}}  className="fas fa-sort-down"></i> </li> </a>
          <ul className="collapse" id="new4" style={{ "list-style": "none" ,  "fontFamily" :"Comic Sans MS" ,"backgroundColor" : "white" , "color" : "black"  }}>
            <Link to="/PureArUsers" className="nav-item">
              <li  className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-users" aria-hidden="true"></i> Detalles de usuario
          </li>

            </Link>


            <Link to="/PureArSales" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Detalles de venta
          </li>
            </Link>
            <Link to="/PureArListings" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-list-ol" aria-hidden="true"></i> Listado
      </li>
            </Link>
            <Link to="/PureArCategory" className="nav-item">
              <li className=" bg-light">
                <div className="col-md-1"></div> <i className="fa fa-folder" aria-hidden="true"></i> Las categorías
  </li>
            </Link>
            <Link to="/PureArReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fa fa-bug" aria-hidden="true"></i> Informes
</li>
          </Link>
          <Link to="/PureArListingReports" className="nav-item">
            <li className=" bg-light">
              <div className="col-md-1"></div> <i className="fas fa-flag" aria-hidden="true"></i> Listado de Informes
</li>
          </Link>

          </ul>
        </li>

      </ul> </div>
          <br />
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header"> <b>Reports Detail </b></div>
                  <div className="card-body">
                    <div style={{ "padding": 20 }} className="row">

                      <div style={{ "textAlign": "center", "marginTop": 10 }} className="table-responsive">
                        {this.state.loading &&
                          <div className='sweet-loading'>
                            <CircleLoader
                              css={style}
                              sizeUnit={"px"}
                              size={100}
                              color={'#2fbb9f'}
                              loading={this.state.loading}
                            />
                          </div>}
                        {this.state.loading === false && <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th> Tittle </th>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th> Report Type </th>
                              <th> Actions</th>
                            </tr>
                          </thead>
                          {this.state.Reports && <tbody>

                            {this.state.loading === false && this.state.Reports && this.state.Reports.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td> <b>{index + 1} </b></td>
                                  <td>{item.title}</td>
                                  <td>{item.fName}</td>
                                  <td>{item.email}</td>
                                  <td>{item.type}</td>
                                  <td>
                                    <button className="btn btn-success" onClick={() => { this.Check(item._id) }} type="submit" style={{ "margin": 10 }}>Delete</button>

                                  </td>
                                </tr>
                              )
                            })}





                          </tbody>}
                        </table>}
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {  /*  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                      <img src={this.state.modelObj.imageLink} className="img-fluid" alt="Responsive image"></img>
                    </ModalHeader>
                    <ModalBody style={{"fontFamily": "monospace" }}>
                      <h4> Category :  {this.state.modelObj.Category} </h4>
                      <h4>  Seller Name :  {this.state.modelObj.sellerName} </h4>
                      <h4> Buyer Name :  {this.state.modelObj.buyerName}</h4>
                      <p> <b> Description :  </b> {this.state.modelObj.description}</p>
          
                    </ModalBody>
                    <ModalFooter>
          
                    </ModalFooter>
                  </Modal>*/
        }

      </div>
    )
  }
}
