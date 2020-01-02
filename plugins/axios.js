import {Message} from "element-ui";
export default ({$axios}) => {
    $axios.onError(res => {
      // response是原生jsError的对象的属性
      const { statusCode, message } = res.response.data
  
      if(statusCode === 400){
          Message.error(message)
      }
  
    })
}
// export default ({$axios}) => {
//     // 拦截axios的错误
//     $axios.onError(res => {
//         // erespons是js原生Error对象的属性
//         const {statusCode, message} = res.response.data;

//         if(statusCode === 400){
//             // Message相当于this.$message
//             Message.error(message)
//         }
//     })
// }


