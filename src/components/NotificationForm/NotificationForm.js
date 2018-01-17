import React from 'react'
import './NotificationForm.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import RadioMenu from '../../components/RadioMenu'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import Yup from 'yup'
import { groupBy } from 'ramda'
import capitalize from 'lodash/capitalize'

export default function NotificationForm({ recipients }) {
  return (
    <Formik
      initialValues={{
        subject: '',
        body: '',
        group: 'all',
        nationality: []
      }}
      validationSchema={Yup.object().shape({
        subject: Yup.string().required('Please enter a subject'),
        body: Yup.string().required('Please enter a message')
      })}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => {
        const arrangeByNationality = groupBy(recipient => recipient.nationality)
        const nationalities =
          recipients &&
          Object.keys(arrangeByNationality(recipients)).map(nationality => {
            return { value: nationality, label: capitalize(nationality) }
          })

        return (
          <form
            onSubmit={event => {
              event.preventDefault()
            }}
          >
            {/* RADIO BUTTONS - select all or by group */}
            <div className="d-flex">
              <p className="m-0">To: </p>
              <RadioMenu
                name="group"
                options={['All', 'Nationality', 'Role']}
                onChange={handleChange}
              />
            </div>
            {values.group === 'nationality' && (
              <ReactSelect
                name="nationality"
                placeholder="Select a nationality"
                onChange={selectedValue =>
                  setFieldValue('nationality', selectedValue)
                }
                value={values.nationality}
                multi={true}
                options={nationalities}
              />
            )}
            {values.group === 'role' && (
              <ReactSelect
                name="role"
                placeholder="Select a role"
                onChange={selectedValue => setFieldValue('role', selectedValue)}
                value={values.role}
                options={[
                  { value: 'teacher', label: 'Teacher' },
                  { value: 'student', label: 'Student' }
                ]}
              />
            )}
            {/* INPUT FOR SMS SUBJECT */}
            <Input
              name="subject"
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.subject && touched.subject && errors.subject}
            />
            {/* TEXT AREA FOR SMS BODY (restrict input to <160 chars) */}
            <TextArea
              name="body"
              id="body"
              rows="10"
              maxLength="160"
              placeholder="Type your message here..."
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.body && touched.body && errors.body}
            />
            {/* BOTTOM BUTTONS */}
            <div className="formActions">
              <Link className="formBack" to="/">
                Back
              </Link>
              {/* Char validation for textarea */}
              {/* <p id='charLength'>Characters used: ${textLength}/160</p> */}
              <Button className="sendButton" text="SEND" />
            </div>
          </form>
        )
      }}
    />
  )
}