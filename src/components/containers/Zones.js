import React, { Component } from 'react';
import Zone from '../presentation/Zone';
import CreateZone from '../presentation/CreateZone';
import Api from '../../utils/ApiManager';


class Zones extends Component {

	constructor() {
		super()
		this.state = {
			selected: 0,
			list: []
		}
	}


	componentDidMount(){
		console.log('componentDidMount: ');
		

		Api.get('/api/zone', null, (err, response) => {
			if (err) { 
				alert("Error: " + err); 
				return;
			}
			
			console.log('RESULTS: ' + JSON.stringify(response.message));
			
			this.setState({
					list: response.message
				});
		});
	
	
	
	}
	

	
	addZone(newZone){
		console.log('add zone: ' + JSON.stringify(newZone));
		let updatedZone = Object.assign({}, newZone);
		
		
		Api.post('/api/zone', updatedZone, (err, response) => {
			if (err) { alert("Error: (api/post) in Zones... " + JSON.stringify(err)); return;}
			
			console.log('Creating a ZONE...' + response);
			let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.message);
            
            this.setState({
                list: updatedList
            })
            
		})


	}
	
	onSelectTitle(index) {
		console.log("Selected Zone status");
		this.setState({ selected :  index});
	}
	
	render() {


		const listItems = this.state.list.map((zone, i) =>  {
			let selected = (i == this.state.selected)
			return (
				<li key={i}>
					<Zone index={i} select={this.onSelectTitle.bind(this)}
						isSelected={selected} currentZone={zone} /> 
				</li>
			)
	
	
		});
		return (
			<div>
				<ol>
				   {listItems}
				</ol>
				
				<CreateZone onCreate={this.addZone.bind(this)} />
			</div>
	)}
	
 
}

export default Zones;