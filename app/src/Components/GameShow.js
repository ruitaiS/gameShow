import React from "react";
import axios from "axios";
function GameShow() {
  var ac_token = "";

  // Cloud API KEY : 1508d696-11e4-4eb3-85ca-b8072cc2d402

  // curl https://api.wrnch.ai/v1/login \
  // -H "Content-Type: application/json" \
  // -d '{"api_key": "< api_key >"}' \
  // -X POST

  // Send a POST request

  axios
    .post("https://api.wrnch.ai/v1/login", {
      ContentType: "application/json",
      api_key: "1508d696-11e4-4eb3-85ca-b8072cc2d402",
    })
    .then(function (response) {
      //   console.log();
      ac_token = response["data"]["access_token"];
      console.log(ac_token);

      console.log(`Bearer ${ac_token}`);

      //   axios.post("https://api.wrnch.ai/v1/jobs", {
      //       headers: {
      //         // Authorization: `Bearer ${ac_token}`,
      //         Authorization: "Bearer "+ac_token
      //       },
      //         params:{
      //             work_type:"json",
      //             heads:'true',
      //             media:"https://image.freepik.com/free-photo/happy-young-man-with-arm-crossed-isolated-white-background_256588-1092.jpg"
      //         },
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });

    //   axios
    //     .post("https://api.wrnch.ai/v1/jobs", {
    //       headers: { Authorization: `Bearer ${ac_token}` },
    //       work_type: "json",
    //       heads: "true",
    //       media:
    //         "https://image.freepik.com/free-photo/happy-young-man-with-arm-crossed-isolated-white-background_256588-1092.jpg",
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    })
    .catch(function (error) {
      console.log(error);
    });

  //     curl https://api.wrnch.ai/v1/jobs
  //   -H "Authorization: Bearer <your_access_token>"
  //   -F "work_type=annotated_media"
  //   -F "hands=true"
  //   -F "heads=true"
  //   -F "main_person=true"
  //   -F "media=<your_media_path>"
  //   -X POST
  return <div> testing this is where wrench will be used </div>;
}
export default GameShow;
