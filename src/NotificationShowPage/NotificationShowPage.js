import React, { Component, Fragment } from 'react'
import TabbedNav from '../components/TabbedNav'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { groupBy, reject } from 'ramda'
import capitalize from 'lodash/capitalize'
import messageParser from '../MessageParser/message-parser'
import isEmpty from 'lodash/isEmpty'
import NonResponder from '../components/NonResponder'

class NotificationShowPage extends Component {
  state = {
    currentNotification: {},
    activeTab: 0,
    ok: [],
    notOk: [],
    nonResponders: []
  }

  componentDidMount() {
    const { notifications, match } = this.props
    const currentNotification = notifications.find(notification => {
      return notification._id === match.params.id
    })

    this.setState({ currentNotification })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !!this.state.currentNotification &&
      prevState.currentNotification.responses !==
        this.state.currentNotification.responses &&
      prevState.currentNotification.recipients !==
        this.state.currentNotification.recipients
    ) {
      this.sortOkOrNot()
      this.sortNonResponders()
    }
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  sortOkOrNot = () => {
    const { currentNotification } = this.state
    const okOrNot = groupBy(response => {
      //sorts responses according to whether message body is both valid and contains 'OK'
      return messageParser.isOkMessage(response.body) === true ? 'ok' : 'notOk'
    })

    this.setState(okOrNot(currentNotification.responses))
  }

  sortNonResponders = () => {
    const { currentNotification } = this.state
    const hasResponded = recipient => {
      return !!currentNotification.responses.find(
        response => response.sender._id === recipient._id
      )
    }
    const nonResponders = reject(hasResponded, currentNotification.recipients)

    this.setState({ nonResponders })
  }

  render() {
    const {
      currentNotification,
      activeTab,
      ok,
      notOk,
      nonResponders
    } = this.state

    if (!!currentNotification) {
      const okResponses = ok.map(response => {
        return (
          <Message
            recipientId={response.sender._id}
            contactNumber={response.sender.mobile}
            recipientName={`${response.sender.firstName} ${
              response.sender.lastName
            }`}
            messageBody={response.body}
          />
        )
      })
      const notOkResponses = notOk.map(response => {
        return (
          <Message
            recipientId={response.sender._id}
            contactNumber={response.sender.mobile}
            recipientName={`${response.sender.firstName} ${
              response.sender.lastName
            }`}
            messageBody={response.body}
          />
        )
      })
      const nonRespondingRecipients = nonResponders.map(nonResponder => {
        return (
          <NonResponder
            idNo={nonResponder.idNo}
            mobile={nonResponder.mobile}
            email={nonResponder.email}
            nonResponderName={`${nonResponder.firstName} ${
              nonResponder.lastName
            }`}
          />
        )
      })
      const categories =
        currentNotification.groups &&
        groupBy(group => group.name)(currentNotification.groups)
      const groupElements =
        currentNotification.groups &&
        Object.keys(categories).map(category => (
          <p>
            {capitalize(category)}:{' '}
            {categories[category].map(group => group.selected).join(', ')}
          </p>
        ))

      return (
        <Fragment>
          <p className="text-right">
            {moment(currentNotification.createdAt).format('D MMM YYYY')}
          </p>
          {groupElements === '' ? (
            <p>Groups Sent To: {groupElements}</p>
          ) : (
            <p>Sent to All</p>
          )}

          <h2 className="text-center">{currentNotification.subject}</h2>
          <p>{currentNotification.body}</p>
          <TabbedNav
            activeTab={activeTab}
            handleChangeActiveTab={this.handleChangeActiveTab}
            tabs={[
              () => (
                <div className="text-center text-success">
                  <p className="m-0">Positive</p>
                  <p className="m-0">
                    {!!okResponses && okResponses.length}/{!!currentNotification.recipients &&
                      currentNotification.recipients.length}
                  </p>
                </div>
              ),
              () => (
                <div className="text-center text-danger">
                  <p className="m-0">Negative</p>
                  <p className="m-0">
                    {!!notOkResponses && notOkResponses.length}/{!!currentNotification.recipients &&
                      currentNotification.recipients.length}
                  </p>
                </div>
              ),
              () => (
                <div className="text-center">
                  <p className="m-0">No Response</p>
                  <p className="m-0">
                    {!!nonRespondingRecipients &&
                      nonRespondingRecipients.length}/{!!currentNotification.recipients &&
                      currentNotification.recipients.length}
                  </p>
                </div>
              )
            ]}
          />
          {activeTab === 0 && okResponses}
          {activeTab === 1 && notOkResponses}
          {activeTab === 2 && nonRespondingRecipients}
          <Link to="/">Back</Link>
        </Fragment>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default NotificationShowPage
