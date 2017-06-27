import React, { Component } from 'react';
import Comment from './Comment';
import Api from '../../utils/ApiManager';



class CreateComment extends Component {
    constructor(){
        super()
            this.state = {
                list: []
        };
    }
    
    updateComment(event){

        console.log("Updating comment");
        let updatedComment = Object.assign({}, this.state.comment);
        updatedComment[event.target.id] = event.target.value;

        this.setState({
            comment: updatedComment
        });
    }
    

    submitComment(event){
        console.log("Submitting comment (CreateComment): " + JSON.stringify(this.state.comment));
        this.props.onCreate(this.state.comment);
    }
    
    render(){	
        return (
			<div>
              Add a comment:<br/>
                    <input onChange={this.updateComment.bind(this)} id="username" className="form-control" type="text" placeholder="Username"/>
                    <br/>
                    <input onChange={this.updateComment.bind(this)} id="body" className="form-control" type="text" placeholder="Comment"/>
                    <br/>
                 
                    <br/>
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info" >Send</button>
            </div>
	    )
    }
    
}

export default CreateComment

