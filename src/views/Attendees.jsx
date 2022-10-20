import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { getProfileImageURLFromProfileObject, scrollToTop } from "../common/utils";
import { SKILLS_CONST, ROLE_CONST } from '../const';
import { useLazyQuery } from '@apollo/client';
import { PROFILES_BY_HANDLES } from '../lib/apollo/queries';

const Attendees = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(8);
  const [personType, setPersonType] = useState([]);
  const [mainLanguage, setMainLanguage] = useState([]);
  const [getAttendees, { }] = useLazyQuery(PROFILES_BY_HANDLES);

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    getAttendees().then((res) => {
      // console.log(res.data.profiles.items);
      setAttendees(res.data.profiles.items);
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

  const clearValues = () => { setError(null); setPagination(8); }

  const handlePictureUrl = ({ profile }) => {
    if (!profile.picture) return '/img/unknown.png';

    if (profile?.picture.original.url.includes('ipfs://')) {
      return getProfileImageURLFromProfileObject(profile);
    }

    return profile?.picture.original.url;
  }

  const handleUserCard = (attende) => {
    return (
      <div
        className='col-6 col-md-4 p-2 grid-attendees'
        key={`${attende.id}-${attende.name}`}>
        <div onClick={() => onShowUserProfile({ profile: attende })}
          className='d-flex flex-column justify-content-center align-content-center shadow border p-4 h-100 card-attendees'>
          <div className='d-flex justify-content-center'>
            <img src={ handlePictureUrl({ profile: attende }) } alt={attende.name} height="100px" width="100px" className='border rounded-circle' />
          </div>
          <h6 className='text-center fw-bold mb-0 mt-2'>{attende.name} {attende.last}</h6>
          <p className='m-0 text-center' style={{ fontSize: "0.8rem" }}>{attende.role}</p>
        </div>
      </div>
    );
  }

  const onShowUserProfile = ({ profile }) => {
    navigate('/profile', { state: { ...profile } });
    scrollToTop(0);
  }

  return (
    <div className='container-fluid'>
      <div className="row mx-0">
        <div className="col-12 col-md-8">
          <h1 className="home-title mb-0 ps-3">Find your teammate.</h1>
          <h1 className="home-title mt-2 ps-3 fw-bold">Build your team.</h1>
        </div>

        <div className="col-12 col-md-4 pb-5 d-flex justify-content-center align-items-center">
          <img src="/img/management.png" alt="networking" width="190px" />
        </div>
      </div>

      <div className='container-attendees shadow container-sm border p-5 mb-5'>
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
      </div>

      <div className="container-attendees container-sm border p-5">
        <h4 className='m-0 fw-bold'>Attendees</h4>

        <div className='row mx-0 pt-2 d-flex justify-content-center'>
          {attendees.map((attende, index) => index < pagination && handleUserCard(attende))}
        </div>

        {attendees.length > pagination &&
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

export default Attendees;