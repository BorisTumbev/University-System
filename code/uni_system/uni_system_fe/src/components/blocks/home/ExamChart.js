import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSurveyLog } from "../../../actions/survey";
import {
    Descriptions,
    Badge
} from 'antd';
import {
  PieChart, Pie, Sector, Cell, Tooltip, Legend
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff4242', '#ff4242', '#000000', '#00996e'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export class ExamChart extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
        this.props.getSurveyLog(4);
    };

    renderPies(data){
        return Object.keys(data).map(function (e, index){
            return (
                <div key={index}>
                <h1>{e}</h1>
                <PieChart width={400} height={400}>
                    <Pie
                      data={data[e]}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="answ_count"
                      nameKey='answer__title'
                    >
                      {
                        data[e].map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
                </div>
            )
        });
    };

    render() {
        let title;

        if(Object.keys(this.props.survey_log).length > 0){
            title = this.props.survey_log[Object.keys(this.props.survey_log)[0]][0].survey__title
        }

        return (
            <>
                <h1>{title}</h1>
                <div style={{display:"flex"}}>
                    {this.renderPies(this.props.survey_log)}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    survey_log: state.survey.survey_log
});

function mapDispatchToProps(dispatch) {
    return {
        getSurveyLog: (id) => dispatch(getSurveyLog(id)),
  };
}
//const GrForm = Form.create()(GradeForm);
export default connect(mapStateToProps, mapDispatchToProps)(ExamChart);
//export default StudentDetails;
