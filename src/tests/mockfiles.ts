export const stubListResponse = {
  status: "success",
  data: {
    statusCode: 201,
    message: "New List has been added successfully",
  },
};

export const stubList = {
  name: "Monday Morning",
};

export const singleList = {
  status: "success",
  data: {
    statusCode: 200,
    message: "List 2 returned",
    payload: [
      {
        id: 2,
        name: "Sunday routine",
        datecreated: "2022-04-10T23:00:00.000Z",
        datemodified: "2022-04-10T23:00:00.000Z",
      },
    ],
  },
};
