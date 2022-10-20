import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { scrollToTop } from "../common/utils";
import { SKILLS_CONST, ROLE_CONST } from '../const';
import { ORG_WHITELIST } from '../const/whitelist';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { EVENTS_QUERY } from '../lib/apollo/queries';

const Events = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(8);
  const [personType, setPersonType] = useState([]);
  const [mainLanguage, setMainLanguage] = useState([]);

  const [getEvents, { }] = useLazyQuery(EVENTS_QUERY);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // get events from whitelisted organizers only
    getEvents({ variables: { profileId: ORG_WHITELIST[0] } }).then((res) => {
      const events = res.data.publications.items.map(item => {
        try {
          const _event = JSON.parse(item.metadata.content);
          return _event
        } catch (e) { console.log(e) }

      }).filter(event => event);

      setEvents(events);
    });

  }, []);


  const onSubmit = () => {
    try {
      setError(null);

      if (mainLanguage?.length === 0 && personType?.length === 0)
        return setError('You must select at least one value to do a search');

      const skills = mainLanguage.map(lang => lang.value);
      const roles = personType.map(pers => pers.value);

      const filteredAttendees = attendees.filter(attendee => {
        // get attendee's skills
        const attendeeSkills = attendee.attributes.find(attribute => attribute.key === "skills");
        if (!attendeeSkills) return; // if attendee has no skills, skip

        const attendeeSkillsArray = attendeeSkills.value.split(";");
        const attendeeSkillsArrayTrimmed = attendeeSkillsArray.map(skill => skill.trim());

        // get attendee's role
        const attendeeRole = attendee.attributes.find(attribute => attribute.key === "role");
        if (!attendeeRole) return; // if attendee has no role, skip

        const attendeeRoleArray = attendeeRole.value.split(";");
        const attendeeRoleArrayTrimmed = attendeeRoleArray.map(role => role.trim());

        // check if attendee's skills match the selected skills
        const someSkillMatch = skills.some(skill => attendeeSkillsArrayTrimmed.includes(skill));

        // check if attendee's role match the selected role
        const someRoleMatch = roles.some(role => attendeeRoleArrayTrimmed.includes(role));

        if (someSkillMatch && someRoleMatch) {
          // console.log("match", attendee);
          return attendee;
        }
        else setError('No results found');
      });

      if (filteredAttendees.length === 0) return setError('No results found');

      console.log(filteredAttendees)
    } catch (e) {
      console.log(e);
    }
  }

  const onShowEventDetails = (event) => {
    navigate('/events/details', { state: {...event}});
    scrollToTop(0);
  }

  const clearValues = () => { setError(null); setPagination(8); }

  return (
    <div className='container-fluid'>
      <div className="row mx-0">
        <div className="col-12 col-md-8">
          <h1 className="events-title ps-3">
            One event, a lot of <span className="fw-bold">experiencies.</span>
          </h1>
        </div>


        <div className="col-12 col-md-4 pb-5 d-flex justify-content-center align-items-center">
          <img src="/img/conference.png" alt="networking" width="190px" />
        </div>
      </div>

      {/* <div className='container-attendees shadow container-sm border p-5 mb-5'>
        <div className='py-2 m-0'>
          <h4 className='mx-0 mt-0 mb-1 fw-bold'>Advanced Search</h4>
          <p className="mb-1">Programming Language(s)</p>
          <Select
            isMulti
            onChange={(e) => { setError(null); setMainLanguage(e); }}
            components={makeAnimated()}
            options={SKILLS_CONST} />
        </div>

        <div className='py-2 m-0'>
          <p className="mb-1">What type of individual are you looking for?</p>
          <Select
            isMulti
            onChange={(e) => { setError(null); setPersonType(e) }}
            components={makeAnimated()}
            options={ROLE_CONST} />
        </div>

        {error && <div className='m-2 text-center text-danger'>{error}</div>}

        <div className='d-flex justify-content-center align-items-center mt-2'>
          <button type='button' onClick={onSubmit} className='btn rounded-pill btn-join-us btn-primary m-2'>Submit</button>
        </div>
      </div> */}

      <div className="container-attendees container-sm border p-5">
        <h4 className='m-0 fw-bold'>Events</h4>

        <div className='row mx-0 pt-2 d-flex justify-content-center'>
          { events === null
            ? <>Loading...</>
            : events.map((event, index) => index < pagination && <div
            className='col-6 col-md-4 p-2 grid-attendees'
            key={`${event.eventId}-${event.eventName}`}>
            <div onClick={() => onShowEventDetails(event)}
              className='d-flex flex-column justify-content-center align-content-center shadow border p-4 h-100 card-attendees'>
              <div className='d-flex justify-content-center'>
                <img src={event.imageUrl} alt={event.eventName} height="100px" width="100px" className='border rounded-circle' />
              </div>
              <h6 className='text-center fw-bold mb-0 mt-2'>{event.eventName}</h6>
              <p className='m-0 text-center' style={{ fontSize: "0.8rem" }}>{event.organizerName}</p>
            </div>
          </div>)}
        </div>

        {events.length > pagination &&
          <div onClick={() => setPagination(pagination + 8)} className='mt-2 mb-0 d-flex justify-content-end me-3 color-primary fw-bold cursor-pointer'>Show more...</div>
        }
      </div>

      <div className='container-fluid text-center'>
        <button type='button' className='btn btn-outline-primary me-3 mt-3' onClick={() => { scrollToTop(0); clearValues(); }}>Go up</button>
      </div>

      <Footer />
    </div>
  )
}

export default Events;