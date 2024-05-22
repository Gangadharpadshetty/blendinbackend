// Exporting home function as a named export
export const home = async (req, res) => {
    try {
      res
        .status(200)
        .send(
          "Welcome to world best mern series by thapa technical using router "
        );
    } catch (error) {
      console.log(error);
    }
  };
  