import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import organizer from '../../assets/organizer.svg'


const Organizer = () => {
  const [ open, setOpen] = useState(false)
  const { register, watch, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = data => {
    try {
      console.log(watch(data))
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = () => {
    open ? setOpen(!open) : setOpen(!open)
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center mb-5'>Get to know your event</h1>
      <img className='w-25 rounded mx-auto d-block' src={organizer} alt="" />
      <form onSubmit={ handleSubmit(onSubmit) } className='d-flex flex-column align-items-center shadow mx-5'>
        <div className='d-flex flex-column w-75 my-4 form-floating'>
            <input type="text" name="floatingInput" {...register("organizerName", { required: true })} className={ `border border-primary border-1 rounded shadow-sm form-control ${ errors.organizerName ? 'is-invalid' && 'border-danger' : 'border-success' }` } id="floatingInput" aria-label='' placeholder='Organizer Name' />
            <label htmlFor="floatingInput">Organizer Name</label>
        </div>  

        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <input type="text" name="floatingEvent" {...register("eventName", { required: true })} className={`border border-primary border-1 rounded shadow-sm form-control ${ errors.eventName ? 'is-invalid' && 'border-danger' : 'border-success' }`}  id="floatingEvent" aria-label='' placeholder='Event Name'/>
            <label htmlFor="floatingEvent">Event Name</label>
        </div>
        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <textarea type="text" name="floatingDesc" {...register("eventDescription", { required: true })} className={`text-wrap border border-primary border-1 rounded shadow-sm form-control ${ errors.eventDescription ? 'is-invalid' && 'border-danger' : 'border-success' }`} id="floatingDesc" aria-label='' placeholder='Event Description' />
            <label htmlFor="floatingDesc">Event Description</label>
        </div>
        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <input type="text" name="floatingLocation" {...register("eventLocation", { required: true })} className={`border border-primary border-1 rounded shadow-sm form-control ${ errors.eventLocation ? 'is-invalid' && 'border-danger' : 'border-success' }` } id="floatingLocation" aria-label='' placeholder='Event Location' />
            <label htmlFor="floatingLocation">Event Location</label>
        </div>
        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <input type="datetime-local" name="floatingDate&Time" {...register("eventDateAndTime", { required: true })} className={`border border-primary border-1 rounded shadow-sm form-control ${ errors.eventDateAndTime ? 'is-invalid' && 'border-danger' : 'border-success' }`} id="floatingDate&Time" aria-label='' placeholder='Event Date and Time' />
            <label htmlFor="floatingDate&Time">Event Date and time</label>
        </div>
        <div className='d-flex flex-column w-75 mb-4'>
            <label htmlFor="image">Event Cover Image</label>
            <input type="file" name="image" {...register("eventCover", { required: true })} className={`border border-primary border-1 rounded shadow-sm ${ errors.eventCover ? 'is-invalid'  && 'border-danger' : 'border-success' }`} id="floatingCoverImg" aria-label='' placeholder='Event Cover Image' />
        </div>
        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <input type="text" name="floatingType" {...register("eventType", { required: true })} className={`border border-primary border-1 rounded shadow-sm form-control ${ errors.eventType ? 'is-invalid' && 'border-danger' : 'border-success' }`} id="floatingType" aria-label='' placeholder='Event Type' />
            <label htmlFor="floatingType">Event Type</label>
        </div>
        <div className='d-flex flex-column w-75 mb-4 form-floating'>
            <input type="text" name="floatingTopic" {...register("eventTopic", { required: true })} className={`border border-primary border-1 rounded shadow-sm form-control ${ errors.eventTopic ? 'is-invalid' && 'border-danger' : 'border-success' }`} id="floatingTopic" aria-label='' placeholder='Event Topic' />
            <label htmlFor="floatingTopic">Event Topic</label>
        </div>
        <div className='w-75 mb-4'>
            <label htmlFor="">Event Options</label>
            <div>
              <div>
                <input type="checkbox" name="free" {...register("freeEvents", { required: true})} id="free" aria-label='' />
                <label htmlFor="free" className='px-2'>Free Events</label>
              </div>
            </div>
        </div>
          <div className='mb-4 w-75'>
            <label htmlFor="">Ticket Options</label>
            <div className='d-flex align-items-center'>
              <input type="checkbox" name="limited" {...register("limitedTickets", { required: true })} onClick={handleClick} id="limited" aria-label=''  />
              <label htmlFor="limited" className='px-2'>Limited Tickets</label>
              {open ? <p className='fs-5 py-10'>There are 10 tickets available</p> : <></>}
            </div>
          </div>
            <div className='w-75 mb-4'>
              <h5>Terms and conditions</h5>
              <div>
                <input type="checkbox" name="terms" {...register("termsAndConditions")} className='red' id="terms" aria-label='' />
                <label htmlFor="terms" className='px-2'>By creating and event, I agree to the policies and terms of use.</label>
              </div>
            </div>
          <div className=''>
            <button type='submit' className='btn btn-dark btn-lg border border-0 mb-5'>Create your event</button>
        </div>
      </form>
    </div>
  )
}

export default Organizer
