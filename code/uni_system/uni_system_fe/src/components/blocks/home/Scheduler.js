import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from 'moment';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from 'react-big-scheduler';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";


class UniScheduler extends Component{
    constructor(props){
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
        schedulerData.localeMoment.locale('en');
        let resources = [
                    {
                       id: '41',
                       name: '41',
//                       groupOnly: true
                    },
                    {
                       id: '41a',
                       name: '41a'
                    },
                    {
                       id: '42',
                       name: '42',
//                       parentId: 'r0'
                    },
                    {
                       id: '42a',
                       name: '42a',
//                       parentId: 'r4'
                    },
                    {
                       id: '43',
                       name: '43',
//                       parentId: 'r2'
                    },
                ];
        schedulerData.setResources(resources);
        let events = [
                {
                     id: 1,
                     start: '2019-10-10 09:30:00',
                     end: '2019-10-10 11:30:00',
                     resourceId: '41',
                     title: 'BM',
                     bgColor: '#D9D9D9',
                     resizable: false,
                     movable: false

                 },
                 {
                     id: 2,
                     start: '2019-10-10 12:30:00',
                     end: '2019-10-10 14:00:00',
                     resourceId: '41a',
                     title: 'Mreji',
                     resizable: false,
                     movable: false

                 },
                 {
                     id: 3,
                     start: '2019-10-10 11:00:00',
                     end: '2019-10-10 13:00:00',
                     resourceId: '42',
                     title: 'ASLS',
                     resizable: false,
                     movable: false
                 },
                 {
                     id: 4,
                     start: '2019-10-10 14:30:00',
                     end: '2019-10-10 15:00:00',
                     resourceId: '42a',
                     title: 'Himiq',
                     resizable: false,
                     movable: false
                 },
                 {
                     id: 5,
                     start: '2019-10-10 15:30:00',
                     end: '2019-10-10 16:30:00',
                     resourceId: '43',
                     title: 'PPE',
                     rrule: 'FREQ=WEEKLY;DTSTART=20191003T153000Z;BYDAY=TH',
                     bgColor: '#f759ab',
                     resizable: false,
                     movable: false
                 }
             ];
        schedulerData.setEvents(events);
        this.state = {
            viewModel: schedulerData,
            resources: resources,
            events: events
        }
    }

    render(){
        const {viewModel} = this.state;
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
                               viewEventText="Ops 1"
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
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
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
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(DemoData.events);
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
//    isAuthenticated: state.auth.token != null
});

function mapDispatchToProps(dispatch) {
    return {
//        login: (email, password) => dispatch(authLogin(email, password)),
  };
}
UniScheduler = DragDropContext(HTML5Backend)(UniScheduler);

export default connect(mapStateToProps, mapDispatchToProps)(UniScheduler);