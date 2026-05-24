import {
  useEffect,
  useState
} from 'react';

import { useParams } from 'react-router-dom';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const LeadDetails = () => {

  const { id } = useParams();

  const [lead, setLead] = useState(null);

  const [followUps, setFollowUps] =
    useState([]);

  const fetchData = async () => {

    try {

      const leadRes =
        await API.get('/leads');

      const foundLead =
        leadRes.data.find(
          (item) => item._id === id
        );

      setLead(foundLead);

      const followRes =
        await API.get('/followups');

      const leadFollowUps =
        followRes.data.filter(
          (item) =>
            item.lead?._id === id
        );

      setFollowUps(leadFollowUps);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!lead) return null;

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <div className="
          bg-white
          rounded-xl
          shadow
          p-6
          mb-8
        ">

          <h1 className="text-4xl font-bold mb-4">
            {lead.companyName}
          </h1>

          <p className="mb-2">
            Contact: {lead.contactPerson}
          </p>

          <p className="mb-2">
            Email: {lead.email}
          </p>

          <p className="mb-2">
            Revenue: ₹{lead.expectedRevenue}
          </p>

          <span className="
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
          ">
            {lead.status}
          </span>

        </div>

        <h2 className="text-3xl font-bold mb-6">
          Communication Timeline
        </h2>

        <div className="space-y-5">

          {
            followUps.map((item) => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-xl
                  shadow
                  p-5
                "
              >

                <div className="
                  flex
                  justify-between
                  mb-3
                ">

                  <h3 className="text-xl font-bold">
                    {item.communicationType}
                  </h3>

                  <span>
                    {
                      new Date(
                        item.followUpDate
                      ).toLocaleString()
                    }
                  </span>

                </div>

                <p className="mb-3">
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

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default LeadDetails;