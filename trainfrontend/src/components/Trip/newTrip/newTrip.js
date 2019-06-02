import React, { Component } from 'react';

const styles = {
    center: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }

class NewTrip extends Component {


    render() {
        return (
            <form className="form-horizontal text-center  " >
                <fieldset>
                    <h2  style={{ marginRight : "80%",marginTop:"2%"}} >New Trip Information</h2>

                    <div className="form-group row"  style={{ marginTop : "5%"}} >
                        <label className="col-md-4 col-form-label" for="product_id">Train ID</label>
                        <div className="col-md-3">
                            <input placeholder="e.g. 12345" className="form-control input-md" required="" type="text" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label" for="product_id">Driver ID</label>
                        <div className="col-md-3">
                            <input placeholder="e.g. 120" className="form-control input-md" required="" type="text" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 control-label" for="product_id">Source</label>
                        <div className="col-md-3">
                            <input placeholder="SOURCE" className="form-control input-md" required="" type="text" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 control-label" for="product_id">Destination</label>
                        <div className="col-md-3">
                            <input placeholder="DESTINATION" className="form-control input-md" required="" type="text" />
                        </div>
                    </div>

                    <div className="form-group " style={{display: 'flex', justifyContent: 'center' , marginLeft : "-9.5%"}}  >
                        <div className="col-sm-1 ">
                            <button  className="btn btn-danger btn-block btn-large ">Submit</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default NewTrip;