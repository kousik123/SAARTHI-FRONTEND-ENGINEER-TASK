import './App.css';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";

export class App extends Component {
  constructor() {
    super();
    this.state = { name: '', eId: '', dept: 'Engineering', email: '', doj: '', items: [], show: false };
  }


  setDOJ(date) {
    this.setState({ doj: date });
  }

  resetForm() {
    this.setState({ name: '', eId: '', dept: 'Engineering', email: '', doj: '' });
  }

  formSubmit(e) {
    e.preventDefault();
    if (this.state.name && this.state.email && this.state.eId && this.state.doj && this.state.dept) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
        let array = this.state.items;
        array.push({ name: this.state.name, eId: this.state.eId, dept: this.state.dept, email: this.state.email, doj: this.state.doj })
        this.setState({ items: array, show: false }, () => this.resetForm());
      }
      else {
        alert('Hello! Please Enter Valid Email Address.')
      }

    }

    else {
      alert('Hello! Plese Fill All the details');
    }
  }

  valueChange(e, type) {
    let obj = {}; obj[type] = e.target.value;
    this.setState(obj);
  }

  removeItem(i) {
    let temp = this.state.items;
    temp.splice(i, 1); this.setState({ items: temp });
  }




  render() {
    return (
      <div className="App py-5">

        <div className="container">
          {this.state.show ? <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card p-4" onSubmit={e => this.formSubmit(e)}>
                <p className="mb-4 font-weight-bold">All * Marked Fields are Mandatory.</p>
                <div className="form-group">
                  <label htmlFor="name">Name*</label>
                  <input value={this.state.name} onChange={e => this.valueChange(e, 'name')} type="text" className="form-control" placeholder="Enter name" id="name" />
                </div>

                <div className="form-group">
                  <label htmlFor="eId">Employee Id:*</label>
                  <input value={this.state.eId} onChange={e=>this.valueChange(e,'eId')} type="text" className="form-control" placeholder="Enter Employee Id" id="eId" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Id:*</label>
                  <input value={this.state.email} onChange={e => this.valueChange(e, 'email')} type="email" className="form-control" placeholder="Enter email" id="email" />
                </div>

                <div className="form-group">
                  <label htmlFor="doj">DOJ*</label>
                  <DatePicker className="form-control" closeOnScroll={e => e.target === document} selected={this.state.doj} onChange={date => this.setDOJ(date)} />
                </div>

                <div className="form-group">
                  <label htmlFor="dept">Department*</label>
                  <select value={this.state.dept} onChange={e => this.valueChange(e, 'dept')} className="form-control" name="dept" id="dept">
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="Outsourcing">Outsourcing</option>
                  </select>
                </div>

                <div>
                  <button type="button" className="btn btn-danger" onClick={() => this.resetForm()}>Clear</button>
                  <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
              </form>
            </div>
          </div> : <div className="row justify-content-end">
              <button className="btn btn-success" onClick={() => this.setState({ show: true })}>+ Add Employee</button>
            </div>}

          <div className="row ">
            <div className="col-md-12">
              {this.state.items.length > 0 ? <div className="table-holder mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name </th>
                      <th>Employee Id</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>DOJ</th>

                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map((d, i) => {
                      return <tr key={d.eId}>
                        <td><span onClick={() => this.removeItem(i)} className="font-weight-bold cross">X</span></td>
                        <td>{d.name}</td>
                        <td>{d.eId}</td>
                        <td>{d.dept}</td>
                        <td>{d.email}</td>
                        <td>{JSON.stringify(d.doj).substring(1, 11)}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div> : <h1 className="text-center mt-5">No Employee Found! Please Add.</h1>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

