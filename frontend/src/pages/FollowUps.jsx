import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const FollowUps = () => {

  const [followUps, setFollowUps] =
    useState([]);

  const [leads, setLeads] = useState([]);

  const [formData, setFormData] =
    useState({
      lead: '',
      followUpDate: '',
      communicationType: 'Call',
      notes: ''
    });

  const fetchData = async () => {

    try {

      const followRes =
        await API.get('/followups');

      const leadRes =
        await API.get('/leads');

      setFollowUps(followRes.data);

      setLeads(leadRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        '/followups',
        formData
      );

      fetchData();

      setFormData({
        lead: '',
        followUpDate: '',
        communicationType: 'Call',
        notes: ''
      });

    } catch (error) {
      console.log(error);
    }
  };

  const completeHandler = async (id) => {

    try {

      await API.put(`/followups/${id}`, {
        status: 'Completed'
      });

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Follow Ups
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <form
            onSubmit={submitHandler}
            className="grid gap-4"
          >

            <select
              name="lead"
              value={formData.lead}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            >

              <option value="">
                Select Lead
              </option>

              {
                leads.map((lead) => (

                  <option
                    key={lead._id}
                    value={lead._id}
                  >
                    {lead.companyName}
                  </option>

                ))
              }

            </select>

            <input
              type="datetime-local"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            />

            <select
              name="communicationType"
              value={formData.communicationType}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            >

              <option>Call</option>
              <option>Email</option>
              <option>Meeting</option>
              <option>WhatsApp</option>

            </select>

            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            />

            <button className="bg-blue-600 text-white py-3 rounded-lg">
              Create Follow Up
            </button>

          </form>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {
            followUps.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5"
              >

                <h2 className="text-2xl font-bold mb-2">
                  {item.lead?.companyName}
                </h2>

                <p className="mb-2">
                  {item.communicationType}
                </p>

                <p className="mb-2 text-gray-600">
                  {
                    new Date(
                      item.followUpDate
                    ).toLocaleString()
                  }
                </p>

                <p className="mb-4">
                  {item.notes}
                </p>

                <span className="
                  bg-orange-100
                  text-orange-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  {item.status}
                </span>

                {
                  item.status === 'Pending'
                  && (
                    <button
                      onClick={() =>
                        completeHandler(item._id)
                      }
                      className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        ml-4
                      "
                    >
                      Mark Complete
                    </button>
                  )
                }

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default FollowUps;