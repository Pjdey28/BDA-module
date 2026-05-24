import { useState } from 'react';

import API from '../api/axios';

const EditLeadModal = ({
  lead,
  closeModal,
  refreshData
}) => {

  const [status, setStatus] = useState(lead.status);

  const updateLeadHandler = async () => {

    try {

      await API.put(`/leads/${lead._id}`, {
        status
      });

      refreshData();

      closeModal();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-96">

        <h1 className="text-2xl font-bold mb-5">
          Edit Lead
        </h1>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-3 rounded-lg mb-5"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Negotiation</option>
          <option>Converted</option>
          <option>Lost</option>
        </select>

        <div className="flex gap-4">

          <button
            onClick={updateLeadHandler}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

          <button
            onClick={closeModal}
            className="bg-gray-300 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditLeadModal;