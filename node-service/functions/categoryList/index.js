const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

exports.main = async (event, context) => {

  // 先取出集合记录总数
  const category = db.collection('category');
  const countResult = await category.count();
  const total = countResult.total;

  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)

  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = category.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    console.log(acc.errMsg);
    return {
      data: acc.data.concat(cur.data) || [],
    }
  })
}