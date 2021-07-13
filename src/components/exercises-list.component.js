import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise=props=>(
    <tr>
        <td>{props.excercises.username}</td>
        <td>{props.excercises.description}</td>
        <td>{props.excercises.duration}</td>
        <td>{props.excercises.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.excercises._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteExercise(props.excercises._id)}}>delete</a>
        </td>
    </tr>
)
export default class ExercisesList extends Component{
    constructor(props){
        super(props)

        this.deleteExercise=this.deleteExercise.bind(this);
        this.state={excercises:[]};
    }

    componentDidMount(){
        axios.get("http://localhost:5000/excercises/")
        .then(response=>{
            this.setState({excercises:response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/excercises/'+id)
        .then(res=>console.log(res.data));

        this.setState({
            excercises:this.state.excercises.filter(el=>el._id!==id)
        })
    }
    exerciseList(){
        return this.state.excercises.map(currentexercise=>{
            return <Exercise excercises={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>UserName</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }

}