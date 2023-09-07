import myaxios from "@/utils/myanxios";
/* myaxios
  .get("data.json")
  .then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log("请求失败" + err);
  }); */
/*   promise1.then(resp=>{
    console.log(resp.data)
  }) */

//const BASE_URL = '/dev-apis'
//const BASE_URL = [process.env.VUE_APP_BASE_API]

export default {
  getList() {
    const promise1 = myaxios({
      method: "get",
      url: "/data.json"
    });
    return promise1;
  }
};
