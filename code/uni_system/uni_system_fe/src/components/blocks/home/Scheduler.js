import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from 'moment';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { getGroups } from "../../../actions/groups";
import { getDiscSchedule } from "../../../actions/discipline";
import { getMajors } from "../../../actions/major";
import { sendEmail } from "../../../actions/email";
import { Select } from 'antd';
import EmailForm from './EmailForm';

const { Option } = Select;

class UniScheduler extends Component{
    constructor(props){
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        var schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
        console.log('schedulerData.config.schedulerWidth')
        schedulerData.config.schedulerWidth = '85%'
        console.log(schedulerData.config.schedulerWidth)
//        schedulerData.localeMoment.locale('bg');
        this.state = {
            viewModel: schedulerData,
//            resources: resources,
            showEmailForm: false,
            group_id: undefined
        }
    }

    componentDidMount(){
        this.props.getGroups();
        this.props.getDiscSchedule();
        this.props.getMajors();
    }

    onMajorChange(value){
        this.props.getDiscSchedule(value);
        this.props.getGroups(value);
    }


    renderMajorSelect(){
        let majors = [];
        this.props.majors.map(function(m, index){
            majors.push(<Option key={m.id} value={m.id}>{m.name}</Option>)
        });
        return(
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a major"
                optionFilterProp="children"
                onChange={this.onMajorChange.bind(this)}
                defaultValue={1}
                //        onFocus={onFocus}
                //        onBlur={onBlur}
                //        onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {majors}
            </Select>
        )
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleOk(e) {
        const { form } = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.sendEmail(this.state.group_id, values);
                this.setState({
                    showEmailForm: false,
                });
            }
        });
    };

    handleCancel(e) {
        this.setState({
            showEmailForm: false,
        });
    };


    render(){

        const {viewModel} = this.state;

        if(this.props.groups.length > 0){
            this.state.viewModel.setResources(this.props.groups);
        }

        if(this.props.discipline_schedule.length > 0){
            this.state.viewModel.setEvents(this.props.discipline_schedule);
        }


        return (
            <div>
                <div>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="send email to students"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
//                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               onScrollLeft={this.onScrollLeft}
                               onScrollRight={this.onScrollRight}
                               onScrollTop={this.onScrollTop}
                               onScrollBottom={this.onScrollBottom}
                               toggleExpandFunc={this.toggleExpandFunc}
                               leftCustomHeader={this.renderMajorSelect()}
                    />
                </div>
                <EmailForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.showEmailForm}
                  onOk={(e) => {this.handleOk(e)}}
                  onCancel={(e) => {this.handleCancel(e)}}
                />
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.props.discipline_schedule);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.props.discipline_schedule);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.props.discipline_schedule);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.props.discipline_schedule);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
//        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
        this.setState({
            showEmailForm: true,
            group_id: event.resourceId
        });
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(this.props.discipline_schedule);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(this.props.discipline_schedule);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null,
    groups: state.groups.groups,
    discipline_schedule: state.discipline_schedule.discipline_schedule,
    majors: state.major.majors,
});

function mapDispatchToProps(dispatch) {
    return {
        getGroups: (id) => dispatch(getGroups(id)),
        getDiscSchedule: (major_id) => dispatch(getDiscSchedule(major_id)),
        getMajors: () => dispatch(getMajors()),
        sendEmail: (group_id, email) => dispatch(sendEmail(group_id, email)),
  };
}
UniScheduler = DragDropContext(HTML5Backend)(UniScheduler);

export default connect(mapStateToProps, mapDispatchToProps)(UniScheduler);