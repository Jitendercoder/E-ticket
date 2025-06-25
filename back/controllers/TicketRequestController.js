import RequestFlow from "../models/RequestFlow.js";
import TicketRequest from "../models/TicketRequest.js";

const addTicketRequest = async (req, res) => {
  console.log("inside add request")
  const { journeys } = req.body;
  const userId = req.userId;
  const requestId = (await TicketRequest.countDocuments()) + 1000;

  TicketRequest.create({
    requestId,
    userId,
    journeys,
  })
    .then((value) => {
      return res.status(200).send({
        success: true,
        data: value,
        message: "Request added Successfully",
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        data: {},
        message: "Failed to add Request",
      });
    });
};

const getTicketRequests = async (req, res) => {
  const userId = req.userId;
  TicketRequest.find({ userId })
    .then((value) => {
      return res.status(200).send({
        success: true,
        data: value,
        message: "Ticket requests found",
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        data: {},
        message: "Ticket requests not found",
      });
    });
};

const getTicketRequestsById = async (req, res) => {
  const { requestId } = req.params;
  console.log("get by id " + requestId);

  TicketRequest.findOne({ requestId })
    .then((value) => {
      return res.status(200).send({
        success: true,
        data: value,
        message: "Request found",
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        data: {},
        message: "Request not found",
      });
    });
};
const deleteTicket = async (req, res) => {
  console.log("inside delete");
  const { requestId } = req.params;
  TicketRequest.deleteOne({ requestId }).then((value) => {
    console.log(value);
    if (value.deletedCount > 0) {
      return res.status(200).send({
        success: true,
      });
    } else {
      return res.status(200).send({
        success: false,
      });
    }
  });
};

const getTicketRequestByFlowPosition = async (req, res) => {
  const userId = req.userId;

  RequestFlow.findOne({ userId }).then((value) => {
    if (!value)
      return res.status(200).send({
        success: false,
        data: {},
        message: "You are not in flow",
      });

    const position = value.stepNumber;

    TicketRequest.find({ flowPosition: position })
      .then((value) => {
        return res.status(200).send({
          success: true,
          data: value,
          message: "Request  found",
        });
      })
      .catch((error) => {
        return res.status(200).send({
          success: false,
          data: {},
          message: "Request not found",
        });
      });
  });
};

const updateTicket = async(req,res) => {
  const { requestId } = req.params;
  const { flowPosition , approved} = req.body;
  
  console.log("--> "+requestId+"\n---> "+flowPosition)

  TicketRequest.updateOne({ requestId }, { $set: { flowPosition ,approved } }).then(
    (value) => {
        console.log(value)
      if (!value) {
        return res.status(200).send({
          success: false,
          data: {},
          message: "failed to approve",
        });
    }
        return res.status(200).send({
          success: true,
          data: value,
          message: "successfully appoved journey",
        });
      
    }
  );
};

export {
  addTicketRequest,
  getTicketRequestByFlowPosition,
  getTicketRequests,
  getTicketRequestsById,
  deleteTicket,
  updateTicket,
};
