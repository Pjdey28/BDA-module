import { useEffect, useState } from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

const statuses = [
  'New',
  'Contacted',
  'Qualified',
  'Negotiation',
  'Converted',
  'Lost'
];

const Pipeline = () => {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {

    try {

      const res = await API.get('/leads');

      setLeads(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const leadId = result.draggableId;

    const newStatus = result.destination.droppableId;

    try {

      await API.put(`/leads/${leadId}`, {
        status: newStatus
      });

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-8">
          Lead Pipeline
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">

            {
              statuses.map((status) => (

                <Droppable
                  droppableId={status}
                  key={status}
                >

                  {(provided) => (

                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white rounded-xl p-4 min-h-[500px] shadow"
                    >

                      <h2 className="text-xl font-bold mb-5">
                        {status}
                      </h2>

                      {
                        leads
                          .filter(
                            (lead) => lead.status === status
                          )
                          .map((lead, index) => (

                            <Draggable
                              key={lead._id}
                              draggableId={lead._id}
                              index={index}
                            >

                              {(provided) => (

                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-gray-100 rounded-lg p-4 mb-4"
                                >

                                  <h3 className="font-bold text-lg">
                                    {lead.companyName}
                                  </h3>

                                  <p className="text-sm text-gray-600">
                                    {lead.contactPerson}
                                  </p>

                                  <p className="mt-2 font-semibold">
                                    ₹{lead.expectedRevenue}
                                  </p>

                                </div>

                              )}

                            </Draggable>

                          ))
                      }

                      {provided.placeholder}

                    </div>

                  )}

                </Droppable>

              ))
            }

          </div>

        </DragDropContext>

      </div>

    </div>
  );
};

export default Pipeline;